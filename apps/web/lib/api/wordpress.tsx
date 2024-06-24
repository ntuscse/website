import {
  GetAllBlogPostsResponse,
  GetBlogPostResponse,
} from "../types/wordpress";

const API_URL = process.env.WORDPRESS_API_URL ?? "";

export async function fetchAPI<T>(
  query = "",
  { variables }: Record<string, unknown> = {}
) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers[
  //     'Authorization'
  //     ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  // }

  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = (await res.json()) as {
    errors: string[],
    data: T,
  };
  if (json.errors) {
    console.error(json.errors);
    throw new Error(`Failed to fetch API\n${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

export async function getAllBlogPosts() {
  const data = await fetchAPI<GetAllBlogPostsResponse>(`
    query AllBlogPosts {
      posts(first: 1000) {
        edges {
          node {
            id
            title
            date
            uri
            slug
            excerpt
            author {
              node {
                id
                name
              }
            }
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllBlogPostsSlugs() {
  const data = await fetchAPI<GetAllBlogPostsResponse>(`
    query AllBlogPostsSlugs {
      posts(first: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getBlogPost(postSlug: string) {
  const data = await fetchAPI<GetBlogPostResponse>(
    `
    query BlogPost($postSlug: ID!)
      {
        post(id: $postSlug, idType: SLUG) {
          id
          title
          status
          uri
          slug
          date
          author {
            node {
              id
              name
            }
          }
          featuredImage {
            node {
              link
            }
          }
          content
      }
    }
  `,
    {
      variables: {
        postSlug,
      },
    }
  );
  return data?.post;
}
