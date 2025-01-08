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

export type Career = {
  _id: string;
  _type: "career";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  hidden: boolean;
  type:
    | "Contract"
    | "Self-Employed"
    | "Part-time"
    | "Full-time"
    | "Internship"
    | "Apprenticeship"
    | "Freelance";
  title: string;
  description: Array<
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
          | "muted"
          | "blockquote"
          | "blockquote-info"
          | "blockquote-success"
          | "blockquote-warning"
          | "blockquote-danger";
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
        alt: string;
        _type: "image";
        _key: string;
      }
    | ({
        _key: string;
      } & Code)
  >;
  tags: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  location: {
    type: "On-site" | "Hybrid" | "Remote";
    address: string;
  };
  company: {
    name: string;
    url: string;
    logo: {
      asset: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "image";
    };
  };
  date: {
    start: string;
    end?: string;
  };
  links: Array<
    {
      _key: string;
    } & EnhancedURL
  >;
};

export type EnhancedURL = {
  _type: "enhancedURL";
  display: string;
  url: string;
  hidden: boolean;
};

export type Project = {
  _id: string;
  _type: "project";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  hidden: boolean;
  archived: boolean;
  slug: Slug;
  title: string;
  status: "completed" | "ongoing" | "abandoned";
  role: string;
  images: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
    _key: string;
  }>;
  tags: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
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
          | "muted"
          | "blockquote"
          | "blockquote-info"
          | "blockquote-success"
          | "blockquote-warning"
          | "blockquote-danger";
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
        alt: string;
        _type: "image";
        _key: string;
      }
    | ({
        _key: string;
      } & Code)
  >;
  links: Array<
    {
      _key: string;
    } & EnhancedURL
  >;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  hidden: boolean;
  archived: boolean;
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
  images: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
    _key: string;
  }>;
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
          | "muted"
          | "blockquote"
          | "blockquote-info"
          | "blockquote-success"
          | "blockquote-warning"
          | "blockquote-danger";
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
        alt: string;
        _type: "image";
        _key: string;
      }
    | ({
        _key: string;
      } & Code)
  >;
};

export type BlockContent = Array<
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
        | "muted"
        | "blockquote"
        | "blockquote-info"
        | "blockquote-success"
        | "blockquote-warning"
        | "blockquote-danger";
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
      alt: string;
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
  tagline: string;
  shortBio: string;
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
    asset: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
  bio: BlockContent;
  socialLinks?: Array<string>;
  skillTags?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  selectedPosts?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "post";
  }>;
  selectedProjects?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "project";
  }>;
  uses: BlockContent;
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
  | Career
  | EnhancedURL
  | Project
  | Post
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
// Query: {        "data":     *[_type == "post" && defined(slug.current) && hidden != true && archived != true] | order(postedAt desc) {        _id,        title,        slug,        postedAt,         "image": images[0],        "wordCount": length(pt::text(body))    },    }
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
      alt: string;
      _type: "image";
      _key: string;
    } | null;
    wordCount: number;
  }>;
};
// Variable: POST_SLUGS_QUERY
// Query: *[_type == "post" && defined(slug.current) && hidden != true] {        "slug": slug.current    }
export type POST_SLUGS_QUERYResult = Array<{
  slug: string;
}>;
// Variable: POST_QUERY
// Query: *[_type == "post" && slug.current == $slug && hidden != true][0] {        ...,        "wordCount": length(pt::text(body)),        "derefTag": coalesce(tags[]->, []),    }
export type POST_QUERYResult = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  hidden: boolean;
  archived: boolean;
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
  images: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
    _key: string;
  }>;
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
          | "blockquote-danger"
          | "blockquote-info"
          | "blockquote-success"
          | "blockquote-warning"
          | "blockquote"
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6"
          | "muted"
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
        alt: string;
        _type: "image";
        _key: string;
      }
  >;
  wordCount: number;
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
// Variable: CV_REF_QUERY
// Query: *[_type == "personalInfo" && _id == "personalInfo"] [0].CV.file.asset->
export type CV_REF_QUERYResult = {
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
} | null;
// Variable: HOME_PAGE_QUERY
// Query: *[_type == "personalInfo" && _id == "personalInfo"] [0] {        name,        title,        tagline,        shortBio,        "selectedPosts": coalesce(            selectedPosts[]-> {                title,                description,                "slug": slug.current            },        []),        "selectedProjects": coalesce(            selectedProjects[]-> {                "slug": slug.current,                title,                "tags": tags[]-> {                    "slug": slug.current,                    "name": title,                },            },        []),    }
export type HOME_PAGE_QUERYResult = {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  selectedPosts:
    | Array<{
        title: string;
        description: string;
        slug: string;
      }>
    | Array<never>;
  selectedProjects:
    | Array<{
        slug: string;
        title: string;
        tags: Array<{
          slug: string;
          name: string;
        }>;
      }>
    | Array<never>;
} | null;
// Variable: PAGINATED_PROJECTS_QUERY
// Query: {        "data":     *[_type == "project" && defined(slug.current) && hidden != true && archived != true] | order(_createdAt desc) {        _id,        _createdAt,        title,        slug,         "image": images[0]    },    }
export type PAGINATED_PROJECTS_QUERYResult = {
  data: Array<{
    _id: string;
    _createdAt: string;
    title: string;
    slug: Slug;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "image";
      _key: string;
    } | null;
  }>;
};
// Variable: PROJECT_SLUGS_QUERY
// Query: *[_type == "project" && defined(slug.current) && hidden != true] {        "slug": slug.current    }
export type PROJECT_SLUGS_QUERYResult = Array<{
  slug: string;
}>;
// Variable: PROJECT_QUERY
// Query: *[_type == "project" && slug.current == $slug && hidden != true][0] {        ...,        "visibleLinks": links[@.hidden != true],        "derefTag": coalesce(tags[]->, []),    }
export type PROJECT_QUERYResult = {
  _id: string;
  _type: "project";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  hidden: boolean;
  archived: boolean;
  slug: Slug;
  title: string;
  status: "abandoned" | "completed" | "ongoing";
  role: string;
  images: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
    _key: string;
  }>;
  tags: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
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
          | "blockquote-danger"
          | "blockquote-info"
          | "blockquote-success"
          | "blockquote-warning"
          | "blockquote"
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6"
          | "muted"
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
        alt: string;
        _type: "image";
        _key: string;
      }
  >;
  links: Array<
    {
      _key: string;
    } & EnhancedURL
  >;
  visibleLinks: Array<
    {
      _key: string;
    } & EnhancedURL
  >;
  derefTag: Array<{
    _id: string;
    _type: "category";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title: string;
    slug: Slug;
  }>;
} | null;
// Variable: CAREERS_QUERY
// Query: {        "careers":  *[_type == "career" && hidden != true] {            ...,            "visibleLinks": coalesce(links[@.hidden != true], []),            "derefTag": coalesce(tags[]->, []),        },        "cvUpdatedAt": *[_type == "personalInfo" && _id == "personalInfo"][0].CV.file.asset->_updatedAt    }
export type CAREERS_QUERYResult = {
  careers: Array<{
    _id: string;
    _type: "career";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    hidden: boolean;
    type:
      | "Apprenticeship"
      | "Contract"
      | "Freelance"
      | "Full-time"
      | "Internship"
      | "Part-time"
      | "Self-Employed";
    title: string;
    description: Array<
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
            | "blockquote-danger"
            | "blockquote-info"
            | "blockquote-success"
            | "blockquote-warning"
            | "blockquote"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "muted"
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
          alt: string;
          _type: "image";
          _key: string;
        }
    >;
    tags: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "category";
    }>;
    location: {
      type: "Hybrid" | "On-site" | "Remote";
      address: string;
    };
    company: {
      name: string;
      url: string;
      logo: {
        asset: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "image";
      };
    };
    date: {
      start: string;
      end?: string;
    };
    links: Array<
      {
        _key: string;
      } & EnhancedURL
    >;
    visibleLinks: Array<
      {
        _key: string;
      } & EnhancedURL
    >;
    derefTag: Array<{
      _id: string;
      _type: "category";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      title: string;
      slug: Slug;
    }>;
  }>;
  cvUpdatedAt: string | null;
};
// Variable: PROFILE_IMAGE_QUERY
// Query: *[_type == "personalInfo" && _id == "personalInfo"] [0].image.asset->
export type PROFILE_IMAGE_QUERYResult = {
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
} | null;
// Variable: SEARCH_QUERY
// Query: *[_type in $type && ( title match $title || body[].children[].text match $title || description match $title || tags[]->slug.current match $title ) && hidden != true] {        _type,        title,        slug,        "tags": coalesce(tags[]->, []),    }
export type SEARCH_QUERYResult = Array<
  | {
      _type: "career";
      title: string;
      slug: null;
      tags: Array<{
        _id: string;
        _type: "category";
        _createdAt: string;
        _updatedAt: string;
        _rev: string;
        title: string;
        slug: Slug;
      }>;
    }
  | {
      _type: "category";
      title: string;
      slug: Slug;
      tags: Array<never>;
    }
  | {
      _type: "configuration";
      title: null;
      slug: null;
      tags: Array<never>;
    }
  | {
      _type: "personalInfo";
      title: string;
      slug: null;
      tags: Array<never>;
    }
  | {
      _type: "post";
      title: string;
      slug: Slug;
      tags:
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
    }
  | {
      _type: "project";
      title: string;
      slug: Slug;
      tags: Array<{
        _id: string;
        _type: "category";
        _createdAt: string;
        _updatedAt: string;
        _rev: string;
        title: string;
        slug: Slug;
      }>;
    }
  | {
      _type: "sanity.fileAsset";
      title: string | null;
      slug: null;
      tags: Array<never>;
    }
  | {
      _type: "sanity.imageAsset";
      title: string | null;
      slug: null;
      tags: Array<never>;
    }
>;
// Variable: USES_QUERY
// Query: *[_type == "personalInfo" && _id == "personalInfo"] [0].uses
export type USES_QUERYResult = BlockContent | null;
// Variable: RSS_FEED_QUERY
// Query: {        "title": coalesce(*[_type == "configuration" && _id == "configuration"] [0].name, ''),        "description": coalesce(*[_type == "personalInfo" && _id == "personalInfo"] [0].shortBio, ""),        "items": coalesce(*[_type == "post" && defined(slug.current) && hidden != true] | order(postedAt desc) {                    title,                    "pubDate": postedAt,                    description,                    "link": '/blog/' + slug.current,                    "categories": coalesce(tags[]->slug.current, []),                }, []),    }
export type RSS_FEED_QUERYResult = {
  title: string | "";
  description: string | "";
  items: Array<{
    title: string;
    pubDate: string;
    description: string;
    link: string;
    categories: Array<string> | Array<never>;
  }>;
};
// Variable: SOCIAL_LINKS_QUERY
// Query: coalesce(*[_type == "personalInfo" && _id == "personalInfo"] [0].socialLinks, [])
export type SOCIAL_LINKS_QUERYResult = Array<string> | Array<never>;

declare module "@sanity/client" {
  interface SanityQueries {
    '\n    {\n        "data": \n    *[_type == "post" && defined(slug.current) && hidden != true && archived != true] | order(postedAt desc) {\n        _id,\n        title,\n        slug,\n        postedAt, \n        "image": images[0],\n        "wordCount": length(pt::text(body))\n    }\n,\n    }\n': PAGINATED_POSTS_QUERYResult;
    '\n    *[_type == "post" && defined(slug.current) && hidden != true] {\n        "slug": slug.current\n    }\n': POST_SLUGS_QUERYResult;
    '\n    *[_type == "post" && slug.current == $slug && hidden != true][0] {\n        ...,\n        "wordCount": length(pt::text(body)),\n        "derefTag": coalesce(tags[]->, []),\n    }\n': POST_QUERYResult;
    '\n    *[_type == "personalInfo" && _id == "personalInfo"] [0].CV.file.asset->\n': CV_REF_QUERYResult;
    '\n    *[_type == "personalInfo" && _id == "personalInfo"] [0] {\n        name,\n        title,\n        tagline,\n        shortBio,\n        "selectedPosts": coalesce(\n            selectedPosts[]-> {\n                title,\n                description,\n                "slug": slug.current\n            },\n        []),\n        "selectedProjects": coalesce(\n            selectedProjects[]-> {\n                "slug": slug.current,\n                title,\n                "tags": tags[]-> {\n                    "slug": slug.current,\n                    "name": title,\n                },\n            },\n        []),\n    }\n': HOME_PAGE_QUERYResult;
    '\n    {\n        "data": \n    *[_type == "project" && defined(slug.current) && hidden != true && archived != true] | order(_createdAt desc) {\n        _id,\n        _createdAt,\n        title,\n        slug, \n        "image": images[0]\n    }\n,\n    }\n': PAGINATED_PROJECTS_QUERYResult;
    '\n    *[_type == "project" && defined(slug.current) && hidden != true] {\n        "slug": slug.current\n    }\n': PROJECT_SLUGS_QUERYResult;
    '\n    *[_type == "project" && slug.current == $slug && hidden != true][0] {\n        ...,\n        "visibleLinks": links[@.hidden != true],\n        "derefTag": coalesce(tags[]->, []),\n    }\n': PROJECT_QUERYResult;
    '\n    {\n        "careers":  *[_type == "career" && hidden != true] {\n            ...,\n            "visibleLinks": coalesce(links[@.hidden != true], []),\n            "derefTag": coalesce(tags[]->, []),\n        },\n        "cvUpdatedAt": *[_type == "personalInfo" && _id == "personalInfo"][0].CV.file.asset->_updatedAt\n    }\n': CAREERS_QUERYResult;
    '\n    *[_type == "personalInfo" && _id == "personalInfo"] [0].image.asset->\n': PROFILE_IMAGE_QUERYResult;
    '\n    *[_type in $type && ( title match $title || body[].children[].text match $title || description match $title || tags[]->slug.current match $title ) && hidden != true] {\n        _type,\n        title,\n        slug,\n        "tags": coalesce(tags[]->, []),\n    }\n': SEARCH_QUERYResult;
    '\n    *[_type == "personalInfo" && _id == "personalInfo"] [0].uses\n': USES_QUERYResult;
    '\n    {\n        "title": coalesce(*[_type == "configuration" && _id == "configuration"] [0].name, \'\'),\n        "description": coalesce(*[_type == "personalInfo" && _id == "personalInfo"] [0].shortBio, ""),\n        "items": coalesce(*[_type == "post" && defined(slug.current) && hidden != true] | order(postedAt desc) {\n                    title,\n                    "pubDate": postedAt,\n                    description,\n                    "link": \'/blog/\' + slug.current,\n                    "categories": coalesce(tags[]->slug.current, []),\n                }, []),\n    }\n': RSS_FEED_QUERYResult;
    '\n    coalesce(*[_type == "personalInfo" && _id == "personalInfo"] [0].socialLinks, [])\n': SOCIAL_LINKS_QUERYResult;
  }
}
