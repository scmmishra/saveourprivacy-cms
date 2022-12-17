import csv from 'csvtojson';
import { ofetch } from 'ofetch';
import { htmlToSlate } from 'slate-serializers';

async function loadCsv(filename) {
  const csvData = await csv().fromFile(filename);
  return csvData;
}

const data = await loadCsv('./data/blog-export.csv');

async function makePost(base, jsonData) {
  const url = `http://localhost:4000/api/${base}`;
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

async function loadBlogs(authors) {
  for (const row of data) {
    const authorArray = row['name'].split(', ').map(author => author.trim());
    console.log(authorArray, authors);
    const authorIds = authorArray.map(auth => authors[auth]);

    console.log(authorIds);

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
  const authorStrings = data.map(row => row['name']);
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
loadBlogs(authorIds);

export {};
