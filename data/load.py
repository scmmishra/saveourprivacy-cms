import csv
import requests


def load_csv(filename):
    """load a csv file into a list of dictionaries"""
    with open(filename, newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        return [row for row in reader]


def make_post(base, json_data):
    url = f"http://localhost:4000/api/{base}"
    headers = {"Content-Type": "application/json"}

    response = requests.post(
        url,
        headers=headers,
        json=json_data,
    )
    print(response.status_code)
    print(response.content)


def load_blogs():
    data = load_csv("blog-export.csv")
    for row in data:
        json_data = {
            "title": row["title"],
            "slug": row["slug"],
            "_status": "published",
            "authorString": row["name"],
            "publishDate": row["publish_date"],
        }

        make_post("blog", json_data)


load_blogs()
