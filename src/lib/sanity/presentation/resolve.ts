import { type PresentationPluginOptions, defineLocations } from 'sanity/presentation';

type Resolve = PresentationPluginOptions['resolve'];
export const resolve: Resolve = {
  locations: {
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/posts/${doc?.slug}`,
          },
          { title: 'Home', href: `/` },
        ],
      }),
    }),
  },
};
