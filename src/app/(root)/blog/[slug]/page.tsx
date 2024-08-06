import { Text } from '@mantine/core';
import { sanityFetch } from '~/lib/sanity/client';
import { POST_QUERY } from '~/lib/sanity/queries';
import type { POST_QUERYResult } from '~/t/sanity';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page(props: PageProps) {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params: {
      slug: props.params.slug,
    },
  });

  if (!post) {
    return <>Post Not Found</>;
  }

  return (
    <>
      <Text>{post.title}</Text>
    </>
  );
}
