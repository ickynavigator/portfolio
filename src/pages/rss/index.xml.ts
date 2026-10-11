import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { contentUrl } from "~/lib/content-routes";
import { loadQuery } from "~/lib/sanity/load-query";
import { RSS_FEED_QUERY } from "~/lib/sanity/queries";

export const GET: APIRoute = async (context) => {
  const { result } = await loadQuery({ query: RSS_FEED_QUERY });

  return rss({
    title: `${result.title}'s Blog`,
    description: result.description,
    site: context.site!,
    items: result.items.map(({ slug, ...item }) => ({
      ...item,
      link: contentUrl("post", slug),
      pubDate: new Date(item.pubDate),
    })),
  });
};
