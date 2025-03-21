/* eslint-disable @typescript-eslint/consistent-type-definitions */

// #region Helpers
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type DeepPartial<T> = Prettify<{
  [P in keyof T]?: T[P] extends Record<PropertyKey, unknown>
    ? DeepPartial<T[P]>
    : DeepPartial<T[P]>;
}>;
type DeepResolved<T> = Prettify<{
  [P in keyof T]: Strip<T[P]> extends Record<PropertyKey, unknown>
    ? DeepResolved<Strip<T[P]>>
    : DeepResolved<Strip<T[P]>>;
}>;
type Strip<T> = T extends (infer _T)[]
  ? _T
  : T extends ResolvingTemplate<infer _T>
    ? _T
    : T;
type ResolvingTemplate<N> = {
  template: N;
  default: N;
  absolute: N;
};
// #endregion Helpers

export type ResolvingString = string | ResolvingTemplate<string>;

type OGBase = {
  /** The title of the page for Open Graph (used for rich previews on social media). */
  title: string;
  /** A description of the page content for Open Graph metadata. */
  description: string;
  /** The main image used for social media previews via Open Graph. */
  image: string;
  /** The URL of the page as specified in Open Graph metadata. */
  url: string | URL;
  /** The name of the website as recognized by Open Graph. */
  site_name: string;
  /** The language and region settings for Open Graph metadata (e.g., en_US). */
  locale: string;
  /** The Open Graph object type (e.g., website, article, video). */
  type: string;
  article?: OGArticle;
};
type OGArticle = {
  /** The author(s) of the article as specified in Open Graph metadata. */
  author: string;
  /** The publication date of the article (for Open Graph article type). */
  published_time: string;
  /** The last modification date of the article. */
  modified_time: string;
  /** The expiration date of the article (if applicable). */
  expiration_time: string;
  /** The section or category of the article. */
  section: string;
  /** Tags associated with the article, used for categorization. */
  tag: string[];
};
type TwitterBase = {
  /** The title of the page for Twitter Card metadata. */
  title: string;
  /** A short description of the page content for Twitter previews. */
  description: string;
  /** The image used in Twitter Card previews. */
  image: string;
  /** Alternative text for the Twitter Card image, improving accessibility. */
  image_alt?: string;
  /** The Twitter username of the website or publisher. */
  site: string | URL;
  /** The Twitter user ID of the website or publisher. */
  site_id?: string;
  /** The Twitter username of the content creator. */
  creator: string;
  /** The Twitter user ID of the content creator. */
  creatorid?: string;
};
type TwitterSummary = {
  /** The type of Twitter Card (summary, summary_large_image, player, or app). */
  card: "summary";
};
type TwitterSummaryLargeImage = {
  /** The type of Twitter Card (summary, summary_large_image, player, or app). */
  card: "summary_large_image";
};
type TwitterPlayer = {
  /** The type of Twitter Card (summary, summary_large_image, player, or app). */
  card: "player";
  player: {
    /** A URL to an embeddable media player for rich Twitter Card previews. */
    index: string;
    /** The width of the Twitter Card player. */
    width: string;
    /** The height of the Twitter Card player. */
    height: string;
    /** A direct URL to the media stream used in the Twitter player. */
    stream: string;
  };
};
type TwitterApp = {
  /** The type of Twitter Card (summary, summary_large_image, player, or app). */
  card: "app";
  app: {
    /** The country code where the Twitter app is available. */
    country: string;

    name: {
      /** The name of the iPhone app. */
      iphone: string;
      /** The name of the iPad app. */
      ipad: string;
      /** The name of the Android app associated with the content. */
      googleplay: string;
    };

    id: {
      /** The App Store ID for the iPhone app. */
      iphone: string;
      /** The App Store ID for the iPad app. */
      ipad: string;
      /** The Google Play Store ID for the Android app. */
      googleplay: string;
    };

    url: {
      /** The URL to the iPhone app in the App Store. */
      iphone: string;
      /** The URL to the iPad app in the App Store. */
      ipad: string;
      /** The URL to the Android app in the Google Play Store. */
      googleplay: string;
    };
  };
};

export type Meta = {
  /** The title of the page, typically displayed in the browser tab and search results. */
  title: string;
  /** A brief summary of the page's content, often shown in search engine results. */
  description: string;
  /** TODO */
  creator: string;
  /** The name of the content creator or website author. */
  author: string;
  /** Keywords related to the page's content, used for SEO (though less relevant today). */
  keywords: string[];
  /** The copyright or usage license applicable to the page content. */
  license?: string;
  /** The name of the web application, used for branding purposes. */
  application_name: string;

  og: OGBase;

  twitter: TwitterBase &
    (TwitterSummary | TwitterSummaryLargeImage | TwitterApp | TwitterPlayer);
};
export type ResolvedMeta = DeepResolved<Meta>;
export type PartialMeta = DeepPartial<Meta>;

export function flattenMeta(metaList: [Meta, ...PartialMeta[]]): ResolvedMeta {
  const [base, ...rest] = metaList;

  const merged = rest.reduce<Meta>((pre, cur) => {
    return {
      ...pre,
      ...cur,
      keywords: [
        ...new Set([...(pre?.keywords ?? []), ...(cur?.keywords ?? [])]),
      ],
      og: {
        ...pre.og,
        ...cur.og,
        article: {
          ...pre.og.article,
          ...cur.og?.article,
          tag: [
            ...new Set([
              ...(pre.og.article?.tag ?? []),
              ...(cur.og?.article?.tag ?? []),
            ]),
          ],
        },
      },
    };
  }, base);

  return {
    ...merged,
    keywords: (merged.keywords ?? [])?.filter((k) => k !== "").join(", "),
    og: {
      ...merged.og,
      article: {
        ...merged.og?.article,
        tag: (merged.og?.article?.tag ?? [])
          ?.filter((t) => t !== "")
          .join(", "),
      },
    },
  };
}
