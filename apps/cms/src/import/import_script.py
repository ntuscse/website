import requests
import json
import json
import re

# reading the blog posts from blogs.json
with open('blogs.json') as json_file:
    blogs = json.load(json_file)


# importing the blogs onto payload
url = "http://localhost:3000/api/posts"
print(len(blogs))
for blog in blogs:

    content = blogs[blog]["content"]
    # remove html tags
    content = re.sub("<(“[^”]*”|'[^’]*’|[^'”>])*>", "", content)
    content = content.replace("\n", " \n")
    payload = json.dumps({
        "title": blogs[blog]["title"],
        "author": "63e3b05e8ee6591800181b19",
        "publishedDate": blogs[blog]["date"],
        "tags": [],
        "content": [{"children": [{
            "text": content
        }]},
            {"children": [{
                "text": ""
            }]},
            {
            "children": [{
                "type": "link",
                "linkType": "custom",
                "url": blogs[blog]["link"],
                "children": [
                    {
                        "text": blogs[blog]["link"]
                    }
                ]
            }]
        }
        ],
        "status": "draft",
        "createdAt": blogs[blog]["date"],
        "updatedAt": blogs[blog]["date"]
    }, indent=4)
    headers = {
        'Content-Type': 'application/json',
        # need to reload cookie if it doesn't work
        'Cookie': 'payload-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleXlld0BnbWFpbC5jb20iLCJpZCI6IjYzZTNiMDVlOGVlNjU5MTgwMDE4MWIxOSIsImNvbGxlY3Rpb24iOiJ1c2VycyIsImlhdCI6MTY3NjIwNzc0MSwiZXhwIjoxNjc2MjE0OTQxfQ.t2zvMPnZIm7QqmTEefyIpX21FwxLI0oq0Ege5u6hPP4'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
