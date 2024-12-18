import { defineQuery } from "groq";

import { PERSONAL_INFO_CONFIG_ID } from "../constants";

// @sanity-typegen-ignore
export const POSTS_QUERY = defineQuery(`
    *[_type == "post" && defined(slug.current) && hidden != true] | order(postedAt desc) {
        _id,
        title,
        slug,
        postedAt, 
        image,
        "wordCount": length(pt::text(body))
    }
`);

export const PAGINATED_POSTS_QUERY = defineQuery(`
    {
        "data": ${POSTS_QUERY},
    }
`);
// TODO: Implement pagination
// "pagination": {
//     "page": select(
//         $offset >= count(${POSTS_QUERY}) => -1,
//         round($offset / $limit) + 1
//     ),
//     "per_page": round($limit),
//     "page_count": count(${POSTS_QUERY}),
//     "total_count": count(${POSTS_QUERY}),
// }

export const POST_SLUGS_QUERY = defineQuery(`
    *[_type == "post" && defined(slug.current) && hidden != true] {
        "slug": slug.current
    }
`);

export const POST_QUERY = defineQuery(`
    *[_type == "post" && slug.current == $slug && hidden != true][0] {
        ...,
        "wordCount": length(pt::text(body)),
        "derefTag": coalesce(tags[]->, []),
    }
`);

export const CVReference = defineQuery(`
    *[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0].CV.file.asset->
`);
