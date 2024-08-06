import { Anchor, List, ListItem } from '@mantine/core';
import Link from 'next/link';
import { sanityFetch } from '~/lib/sanity/client';
import { PAGINATED_POSTS_QUERY } from '~/lib/sanity/queries';
import type { PAGINATED_POSTS_QUERYResult } from '~/t/sanity';

export default async function Page() {
  const posts = await sanityFetch<PAGINATED_POSTS_QUERYResult>({
    query: PAGINATED_POSTS_QUERY,
  });

  return (
    <List>
      {posts.data.map((post) => (
        <ListItem key={post._id}>
          <Anchor href={`/blog/${post.slug.current}`} component={Link}>
            {post.title} - [{post.slug.current}]
          </Anchor>
        </ListItem>
      ))}
    </List>
  );
}
