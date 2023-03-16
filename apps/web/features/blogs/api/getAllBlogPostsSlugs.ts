import { GetAllBlogPostsResponse } from "@/lib/types/wordpress";
import { fetchAPI } from "@/lib/api/wordpress";

export async function getAllBlogPostsSlugs() {
  const data = (await fetchAPI(`
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
  `)) as GetAllBlogPostsResponse;
  return data?.posts;
}
