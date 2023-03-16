import { GetAllBlogPostsResponse } from "@/lib/types/wordpress";
import { fetchAPI } from "@/lib/api/wordpress";
import { BlogFilterEnum } from "@/features/blogs";

interface IBlogFilter {
  key: string;
  category: BlogFilterEnum;
}

export async function getAllBlogPosts(filter?: IBlogFilter) {
  const data = (await fetchAPI(`
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
  `)) as GetAllBlogPostsResponse;

  // Format Response
  let posts = data?.posts.edges.map((edge) => ({
    ...edge,
    node: {
      ...edge.node,
      excerpt: edge.node.excerpt
        .replace(/<[^>]+>/g, "")
        .replace(/\n/g, " ")
        .replace(/;&nbsp;/g, '"')
        .substring(0, 120),
    },
  }))

  // Filter posts (if any)
  if (filter) {
    switch (filter.category) {
      case BlogFilterEnum.AUTHOR:
        posts = posts.filter((edge) => {
          if (edge.node.author) {
            return edge.node.author.node.name === filter.key;
          } else {
            // no author
            return !edge.node.author && filter.key === 'no-author';
          }
        })
    }
  }

  return posts;
}
