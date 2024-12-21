import { defineQuery } from "groq";

import { PERSONAL_INFO_CONFIG_ID } from "../constants";

// @sanity-typegen-ignore
export const POSTS_QUERY = defineQuery(`
    *[_type == "post" && defined(slug.current) && hidden != true && archived != true] | order(postedAt desc) {
        _id,
        title,
        slug,
        postedAt, 
        "image": images[0],
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

export const CV_REF_QUERY = defineQuery(`
    *[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0].CV.file.asset->
`);

export const HOME_PAGE_QUERY = defineQuery(`
    *[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0] {
        name,
        title,
        tagline,
        shortBio,
        "selectedPosts": coalesce(
            selectedPosts[]-> {
                title,
                description,
                "slug": slug.current
            },
        []),
        "selectedProjects": [{"slug":"dummy", "title":"Project Name", "tags":[{"slug":"typescript", "name":"Typescript"},{"slug":"nextjs", "name":"Next Js"},{"slug":"nextjs", "name":"Next Js"}]},{"slug":"dummy", "title":"Project Name", "tags":[{"slug":"typescript", "name":"Typescript"},{"slug":"nextjs", "name":"Next Js"},{"slug":"nextjs", "name":"Next Js"}]},{"slug":"dummy", "title":"Project Name", "tags":[{"slug":"typescript", "name":"Typescript"},{"slug":"nextjs", "name":"Next Js"},{"slug":"nextjs", "name":"Next Js"}]}],
    }
`);

// @sanity-typegen-ignore
export const PROJECTS_QUERY = defineQuery(`
    *[_type == "project" && defined(slug.current) && hidden != true && archived != true] | order(_postedAt desc) {
        _id,
        _postedAt,
        name,
        slug, 
        "image": images[0]
    }
`);

export const PAGINATED_PROJECTS_QUERY = defineQuery(`
    {
        "data": ${PROJECTS_QUERY},
    }
`);
