import { GetBlogPostResponse } from "@/lib/types/wordpress";
import { fetchAPI } from "@/lib/api/wordpress";

export async function getBlogPost(postSlug: string) {
  const data = (await fetchAPI(
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
  )) as GetBlogPostResponse;
  return data?.post;
}
