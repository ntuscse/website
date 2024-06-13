import requests
import json
import re
import os
from dotenv import load_dotenv

load_dotenv()

# reading the blog posts from blogs.json
with open('blogs.json') as json_file:
    blogs = json.load(json_file)


# importing the blogs onto payload
# variable
url = os.getenv('Blog_URL')
blog_author = os.getenv('author')
token_auth = os.getenv('token_auth')
print(len(blogs))
for blog in blogs:

    content = blogs[blog]["content"]
    # remove html tags
    content = re.sub("<(“[^”]*”|'[^’]*’|[^'”>])*>", "", content)
    content = content.replace("\n", " \n")
    payload = json.dumps({
        "title": blogs[blog]["title"],
        "author": blog_author,
        "publishedDate": blogs[blog]["date"],
        "layout": [
            {
                "columns": [
                    {
                        "width": "full",
                        "alignment": "center",
                        "richText": [
                            {
                                "children": [
                                    {
                                        "text": content
                                    },
                                    {
                                        "text": "\n"},
                                    {
                                        "type": "link",
                                        "linkType": "custom",
                                        "url": blogs[blog]["link"],
                                        "children": [
                                                {
                                                    "text": "Link: " + blogs[blog]["link"]
                                                }
                                        ]
                                    }

                                ]
                            }
                        ]

                    }
                ],
                "blockType": "content"
            }
        ],
        "slug": blogs[blog]["title"],
        "status": "draft",
        "_status": "published",
        "createdAt": blogs[blog]["date"],
        "updatedAt": blogs[blog]["date"]
    }, indent=4)
    headers = {
        'Content-Type': 'application/json',
        'Cookie': token_auth
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
