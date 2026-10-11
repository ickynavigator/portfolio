import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

import {
  contentListLabel,
  contentListUrl,
  contentUrl,
  type RoutedContentType,
} from "~/lib/content-routes";

type Locations = NonNullable<
  NonNullable<PresentationPluginOptions["resolve"]>["locations"]
>;

const routedLocations = (type: RoutedContentType) =>
  defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title || "Untitled", href: contentUrl(type, doc?.slug) },
        { title: contentListLabel(type), href: contentListUrl(type) },
      ],
    }),
  });

const resolver: Locations = {
  post: routedLocations("post"),
  project: routedLocations("project"),
  career: defineLocations({
    select: {},
    resolve: () => ({
      locations: [{ title: "Career", href: "/career" }],
    }),
  }),
};

export default resolver;
