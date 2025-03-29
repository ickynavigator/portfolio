import type { APIRoute } from "astro";

export const GET: APIRoute = (ctx) => {
  const sitemapURL = new URL("sitemap-index.xml", ctx.site);

  return new Response(`
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`);
};
