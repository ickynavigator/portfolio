// Query TypeMap
import "@sanity/client";

/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  hidden: boolean;
  title: string;
  slug: Slug;
  postedAt: string;
  tags?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  description: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  body: Array<
    | {
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?:
          | "normal"
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6"
          | "blockquote";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }
    | {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
        _key: string;
      }
    | ({
        _key: string;
      } & Code)
  >;
};

export type SocialLink = {
  _type: "socialLink";
  name: string;
  link: string;
};

export type BlockContent = Array<
  | {
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }
  | {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
      _key: string;
    }
  | ({
      _key: string;
    } & Code)
>;

export type Category = {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: Slug;
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type PersonalInfo = {
  _id: string;
  _type: "personalInfo";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  title: string;
  jobStatus?: {
    show: boolean;
    status: "open" | "inbetween" | "close";
  };
  CV?: {
    file?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
      };
      _type: "file";
    };
    lastupdatedAt?: string;
  };
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  bio: BlockContent;
  socialLinks?: Array<
    {
      _key: string;
    } & SocialLink
  >;
  skillTags?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type Configuration = {
  _id: string;
  _type: "configuration";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  showOriginalSourceLink: boolean;
};

export type Code = {
  _type: "code";
  language?: string;
  filename?: string;
  code?: string;
  highlightedLines?: Array<number>;
};

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | Geopoint
  | Post
  | SocialLink
  | BlockContent
  | Category
  | Slug
  | PersonalInfo
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityImageMetadata
  | SanityFileAsset
  | SanityAssetSourceData
  | Configuration
  | Code;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/lib/sanity/queries.ts
// Variable: PAGINATED_POSTS_QUERY
// Query: {        "data":     *[_type == "post" && defined(slug.current) && hidden != true] | order(postedAt desc) {        _id,        title,        slug,        postedAt,         image,        "wordCount": length(pt::text(body))    },    }
export type PAGINATED_POSTS_QUERYResult = {
  data: Array<{
    _id: string;
    title: string;
    slug: Slug;
    postedAt: string;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    wordCount: number;
  }>;
};
// Variable: POST_SLUGS_QUERY
// Query: *[_type == "post" && defined(slug.current) && hidden != true] {        "slug": slug.current    }
export type POST_SLUGS_QUERYResult = Array<{
  slug: string;
}>;
// Variable: POST_QUERY
// Query: *[_type == "post" && slug.current == $slug && hidden != true][0] {    ...,    "derefTag": coalesce(tags[]->, []),  }
export type POST_QUERYResult = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  hidden: boolean;
  title: string;
  slug: Slug;
  postedAt: string;
  tags?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  description: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  body: Array<
    | ({
        _key: string;
      } & Code)
    | {
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?:
          | "blockquote"
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6"
          | "normal";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }
    | {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
        _key: string;
      }
  >;
  derefTag:
    | Array<{
        _id: string;
        _type: "category";
        _createdAt: string;
        _updatedAt: string;
        _rev: string;
        title: string;
        slug: Slug;
      }>
    | Array<never>;
} | null;

declare module "@sanity/client" {
  interface SanityQueries {
    '\n    {\n        "data": \n    *[_type == "post" && defined(slug.current) && hidden != true] | order(postedAt desc) {\n        _id,\n        title,\n        slug,\n        postedAt, \n        image,\n        "wordCount": length(pt::text(body))\n    }\n,\n    }\n': PAGINATED_POSTS_QUERYResult;
    '\n    *[_type == "post" && defined(slug.current) && hidden != true] {\n        "slug": slug.current\n    }\n': POST_SLUGS_QUERYResult;
    '\n  *[_type == "post" && slug.current == $slug && hidden != true][0] {\n    ...,\n    "derefTag": coalesce(tags[]->, []),\n  }\n': POST_QUERYResult;
  }
}
