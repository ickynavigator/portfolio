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
        "selectedProjects": coalesce(
            selectedProjects[]-> {
                "slug": slug.current,
                "title": name,
                "tags": tags[]-> {
                    "slug": slug.current,
                    "name": title,
                },
            },
        []),
    }
`);

// @sanity-typegen-ignore
export const PROJECTS_QUERY = defineQuery(`
    *[_type == "project" && defined(slug.current) && hidden != true && archived != true] | order(_createdAt desc) {
        _id,
        _createdAt,
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

export const PROJECT_SLUGS_QUERY = defineQuery(`
    *[_type == "project" && defined(slug.current) && hidden != true] {
        "slug": slug.current
    }
`);

export const PROJECT_QUERY = defineQuery(`
    *[_type == "project" && slug.current == $slug && hidden != true][0] {
        ...,
        "visibleLinks": links[@.hidden != true],
        "derefTag": coalesce(tags[]->, []),
    }
`);

export const CAREERS_QUERY = defineQuery(`
    {
        "careers":  *[_type == "career" && hidden != true] {
            ...,
            "visibleLinks": coalesce(links[@.hidden != true], []),
            "derefTag": coalesce(tags[]->, []),
        },
        "cvUpdatedAt": *[_type == "personalInfo" && _id == "personalInfo"][0].CV.file.asset->_updatedAt
    }
`);

export const PROFILE_IMAGE_QUERY = defineQuery(`
    *[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0].image.asset->
`);
