import type { internalGroqTypeReferenceTo, SanityImageAsset } from "~/t/sanity";

interface SanityImageRef {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
  [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
}

// Fix typing
// export type SanityImageValue = InferImageValue<SanityQueries[keyof SanityQueries]>;
export type SanityImageValue = SanityImageAsset | SanityImageRef;
