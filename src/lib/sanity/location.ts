import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

type Locations = NonNullable<
  NonNullable<PresentationPluginOptions["resolve"]>["locations"]
>;

const resolver: Locations = {
  post: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title || "Untitled", href: `/blog/${doc?.slug}` },
        { title: "Posts", href: "/blog" },
      ],
    }),
  }),
  project: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title || "Untitled", href: `/project/${doc?.slug}` },
        { title: "Projects", href: "/project" },
      ],
    }),
  }),
  career: defineLocations({
    select: {},
    resolve: () => ({
      locations: [{ title: "Career", href: "/career" }],
    }),
  }),
};

export default resolver;
