import createImageUrlBuilder from '@sanity/image-url';
import env from '~/env';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
});

type Source = Parameters<(typeof builder)['image']>[0];
export function urlFor(source?: Source) {
  if (!source) return;

  return builder.image(source);
}
