import csv
import itertools
import requests


def load_csv(filename):
    """load a csv file into a list of dictionaries"""
    with open(filename, newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        return [row for row in reader]


data = load_csv("blog-export.csv")


def make_post(base, json_data):
    url = f"http://localhost:4000/api/{base}"
    headers = {"Content-Type": "application/json"}

    response = requests.post(
        url,
        headers=headers,
        json=json_data,
    )
    print(response.status_code)

    return response


def load_blogs(authors):
    for row in data:
        author_array = [author.strip() for author in row["name"].split(", ")]
        author_ids = [authors[auth] for auth in author_array]

        json_data = {
            "title": row["title"],
            "slug": row["slug"],
            "_status": "published",
            "author": author_ids,
            "publishDate": row["publish_date"],
        }

        make_post("blog", json_data)


def load_authors():
    author_strings = [row["name"] for row in data]
    split_comma_strings = [string.split(",") for string in author_strings]
    authors = [
        string.strip() for string in itertools.chain.from_iterable(split_comma_strings)
    ]

    match_list = {
        "Apar Gupta": "Apar",
        "Akash Kumar Singh": "Akash Singh",
        "SOP Volunteers": "SaveOurPrivacy Volunteers",
        "Joanne DCunha": "Joanne D'Cunha",
    }

    unique_authors = list(set(authors))
    author_ids = {}

    for author in unique_authors:
        if author not in match_list.values():
            response = make_post("authors", {"name": author})
            author_id = response.json().get("doc", {}).get("id")
            author_ids[author] = author_id
            if author in match_list.keys():
                author_ids[match_list[author]] = author_id

    return author_ids


authors = load_authors()
load_blogs(authors)
