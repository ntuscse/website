import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IgnoreDirectory() {
  const router = useRouter();

  // temporary redirect until image cdn is back up

  useEffect(() => {
    // Redirect to the desired page or perform other actions.
    void (router.push('/')); // Redirect to the root page, for example.
  }, []);

  return null;
}
