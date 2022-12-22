import csv from 'csvtojson';
import { ofetch } from 'ofetch';
import { htmlToSlate } from 'slate-serializers';

async function loadCsv(filename) {
  const csvData = await csv().fromFile(filename);
  return csvData;
}

const blogData = await loadCsv('./data/blog-export.csv');
const coverageData = await loadCsv('./data/coverage-export.csv');
const orgData = await loadCsv('./data/orgs-export.csv');
const individualData = await loadCsv('./data/individuals-export.csv');

async function makePost(base, jsonData) {
  const url = `https://sop-admin.shivam.dev/api/${base}`; // prod
  // const url = `http://localhost:4000/api/${base}`; // local

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await ofetch(url, {
    method: 'POST',
    headers,
    body: jsonData,
    parseResponse: JSON.parse,
  });

  return response;
}

async function loadOrgs() {
  for (const row of orgData) {
    await makePost('organisation', { ...row, enabled: row['enabled'] === 'Yes' });
  }
}

async function loadIndividuals() {
  let count = 0;
  for (const row of individualData) {
    if (count % 30 === 0) {
      console.log(`Created: ${count} individuals`);
    }
    await makePost('individual', { ...row, enabled: row['enabled'] === 'Yes' });
    count++;
  }
}

async function loadCoverage() {
  for (const row of coverageData) {
    const jsonData = {
      title: row['title'],
      link: row['link'],
      _status: row['status'] === 'live' && row['enabled'] ? 'published' : 'draft',
      source: row['name'],
      dateOfPublication: row['date'],
      publishDate: row['date'],
    };

    await makePost('coverage', jsonData);
  }
}

async function loadBlogs(authors) {
  for (const row of blogData) {
    const authorArray = row['name'].split(', ').map(author => author.trim());
    const authorIds = authorArray.map(auth => authors[auth]);

    const jsonData = {
      title: row['title'],
      slug: row['slug'],
      _status: 'published',
      author: authorIds,
      content: htmlToSlate(row['content']),
      publishDate: row['publish_date'],
    };

    await makePost('blog', jsonData);
  }
}

async function loadAuthors() {
  const authorStrings = blogData.map(row => row['name']);
  const splitCommaStrings = authorStrings.map(string => string.split(','));
  const authors = splitCommaStrings.flat().map(string => string.trim());

  const matchList = {
    'Apar Gupta': 'Apar',
    'Akash Kumar Singh': 'Akash Singh',
    'SOP Volunteers': 'SaveOurPrivacy Volunteers',
    'Joanne DCunha': "Joanne D'Cunha",
  };

  const uniqueAuthors = Array.from(new Set(authors));
  const authorIds = {};

  for (const author of uniqueAuthors) {
    if (!Object.values(matchList).includes(author)) {
      const response = await makePost('authors', { name: author });
      const authorId = response.doc.id;
      console.log(authorId);
      authorIds[author] = authorId;
      if (Object.keys(matchList).includes(author)) {
        authorIds[matchList[author]] = authorId;
      }
    }
  }

  return authorIds;
}

const authorIds = await loadAuthors();
await loadBlogs(authorIds);
await loadCoverage();
await loadOrgs();
await loadIndividuals();

export {};
