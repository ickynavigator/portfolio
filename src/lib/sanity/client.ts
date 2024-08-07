import type { QueryOptions, QueryParams } from 'next-sanity';
import { createClient } from 'next-sanity';
import { draftMode } from 'next/headers';
import env from '~/env';
import { TAGS } from '~/lib/constants';

export function getClient() {
  const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: env.VERCEL_ENV !== 'production',
    stega: {
      enabled: env.VERCEL_ENV === 'preview',
      studioUrl: '/studio',
    },
  });

  return client;
}
export const client = getClient();

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
};
export async function sanityFetch<QueryResponse>(opts: SanityFetchOptions) {
  const { query, params = {}, revalidate = 60, tags = [] } = opts;

  const isDraftMode = draftMode().isEnabled;

  const getDynamicRevalidate = () => {
    // Do not cache in Draft Mode
    if (isDraftMode) return 0;

    // Cache indefinitely if tags supplied, purge with revalidateTag()
    if (tags.length) return false;

    return revalidate;
  };

  const getDynamicTags = () => {
    if (isDraftMode) return [];

    return [TAGS.ALL, ...tags];
  };

  const getDraftModeOptions = () => {
    if (!isDraftMode) return {};

    return {
      token: env.SANITY_API_READ_TOKEN,
      perspective: 'previewDrafts',
      stega: true,
    } satisfies QueryOptions;
  };

  return client.fetch<QueryResponse>(query, params, {
    ...getDraftModeOptions(),
    next: {
      revalidate: getDynamicRevalidate(),
      tags: getDynamicTags(),
    },
  });
}
