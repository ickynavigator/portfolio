import * as z from "zod";

export const metaSchema = z
  .object({
    title: z
      .string()
      .describe(
        "The title of the page, typically displayed in the browser tab and search results.",
      ),
    description: z
      .string()
      .describe(
        "A brief summary of the page's content, often shown in search engine results.",
      ),
    creator: z.string().describe("TODO"),
    author: z
      .string()
      .describe("The name of the content creator or website author."),
    keywords: z
      .array(z.string())
      .transform((keywords) => keywords.filter((k) => k !== ""))
      .transform((keywords) => keywords.join(", "))
      .describe(
        "Keywords related to the page's content, used for SEO (though less relevant today).",
      ),
    license: z
      .string()
      .describe(
        "The copyright or usage license applicable to the page content.",
      ),
    application_name: z
      .string()
      .describe("The name of the web application, used for branding purposes."),
    og: z
      .object({
        title: z
          .string()
          .describe(
            "The title of the page for Open Graph (used for rich previews on social media).",
          ),
        description: z
          .string()
          .describe(
            "A description of the page content for Open Graph metadata.",
          ),
        image: z
          .string()
          .describe(
            "The main image used for social media previews via Open Graph.",
          ),
        url: z
          .union([z.string(), z.instanceof(URL)])
          .describe("The URL of the page as specified in Open Graph metadata."),
        site_name: z
          .string()
          .describe("The name of the website as recognized by Open Graph."),
        locale: z
          .string()
          .describe(
            "The Open Graph object type (e.g., website, article, video).",
          ),
        type: z
          .string()
          .describe(
            "The language and region settings for Open Graph metadata (e.g., en_US).",
          ),
        article: z.optional(
          z
            .object({
              author: z
                .string()
                .describe(
                  "The author(s) of the article as specified in Open Graph metadata.",
                ),
              published_time: z
                .string()
                .describe(
                  "The publication date of the article (for Open Graph article type).",
                ),
              modified_time: z
                .string()
                .describe("The last modification date of the article."),
              expiration_time: z
                .string()
                .describe(
                  "The expiration date of the article (if applicable).",
                ),
              section: z
                .string()
                .describe("The section or category of the article."),
              tag: z
                .array(z.string())
                .transform((tags) => tags.filter((tag) => tag !== ""))
                .transform((tags) => tags.join(", "))
                .describe(
                  "Tags associated with the article, used for categorization.",
                ),
            })
            .partial(),
        ),
      })
      .partial(),
    twitter: z
      .object({
        title: z
          .string()
          .describe("The title of the page for Twitter Card metadata."),
        description: z
          .string()
          .describe(
            "A short description of the page content for Twitter previews.",
          ),
        image: z.string().describe("The image used in Twitter Card previews."),
        image_alt: z
          .string()
          .describe(
            "Alternative text for the Twitter Card image, improving accessibility.",
          ),
        site: z
          .union([z.string(), z.instanceof(URL)])
          .describe("The Twitter username of the website or publisher."),
        site_id: z.string(),
        creator: z
          .union([z.string(), z.instanceof(URL)])
          .describe("The Twitter username of the content creator."),
        creatorid: z.string(),
      })
      .partial()
      .and(
        z.union([
          z
            .object({
              card: z.literal("summary"),
            })
            .partial(),
          z
            .object({
              card: z.literal("summary_large_image"),
            })
            .partial(),
          z
            .object({
              card: z.literal("player"),
              player: z
                .object({
                  index: z
                    .string()
                    .describe("A URL to an embeddable media player."),
                  width: z
                    .string()
                    .describe("The width of the Twitter Card player."),
                  height: z
                    .string()
                    .describe("The height of the Twitter Card player."),
                  stream: z
                    .string()
                    .describe(
                      "A direct URL to the media stream used in the player.",
                    ),
                })
                .partial(),
            })
            .partial(),
          z.object({
            card: z.literal("app"),
            app: z.object({
              country: z.string().describe("The country code for the app."),
              name: z
                .object({
                  iphone: z.string().describe("The name of the iPhone app."),
                  ipad: z.string().describe("The name of the iPad app."),
                  googleplay: z
                    .string()
                    .describe(
                      "The name of the Android app associated with the content.",
                    ),
                })
                .partial(),
              id: z
                .object({
                  iphone: z
                    .string()
                    .describe("The App Store ID for the iPhone app."),
                  ipad: z
                    .string()
                    .describe("The App Store ID for the iPad app."),
                  googleplay: z
                    .string()
                    .describe("The Google Play Store ID for the Android app."),
                })
                .partial(),
              url: z
                .object({
                  iphone: z
                    .string()
                    .describe("The URL to the iPhone app in the App Store."),
                  ipad: z
                    .string()
                    .describe("The URL to the iPad app in the App Store."),
                  googleplay: z
                    .string()
                    .describe(
                      "The URL to the Android app in the Google Play Store.",
                    ),
                })
                .partial(),
            }),
          }),
        ]),
      ),
  })
  .partial();

export type Meta = z.infer<typeof metaSchema>;
export type MetaInput = z.input<typeof metaSchema>;

export type MetaBase = (ctx: { appUrl: URL }) => MetaInput | Promise<MetaInput>;
