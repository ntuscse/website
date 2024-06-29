// fetchPosts.ts
import { useQuery } from '@tanstack/react-query';
import {log} from "next/dist/server/typescript/utils";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const API_URL = "http://localhost:3003/api";

async function fetchPosts() {
  const response = await fetch(`http://localhost:3003/api/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export function usePostsQuery() {
  return useQuery(['posts'], fetchPosts);
}
