import { defineQuery } from "groq";

import { CONFIGURATION_CONFIG_ID, PERSONAL_INFO_CONFIG_ID } from "../constants";

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

export const POST_SLUGS_QUERY = defineQuery(`
    *[_type == "post" && defined(slug.current) && hidden != true] {
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
                title,
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
        title,
        slug,
        role,
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

export const SEARCH_QUERY = defineQuery(`
    *[_type in $type && ( title match $title || body[].children[].text match $title || description match $title || tags[]->slug.current match $title ) && hidden != true] {
        _type,
        title,
        slug,
        "tags": coalesce(tags[]->, []),
    }
`);

export const USES_QUERY = defineQuery(`
    *[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0].uses
`);

export const RSS_FEED_QUERY = defineQuery(`
    {
        "title": coalesce(*[_type == "configuration" && _id == "${CONFIGURATION_CONFIG_ID}"] [0].name, ''),
        "description": coalesce(*[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0].shortBio, ""),
        "items": coalesce(*[_type == "post" && defined(slug.current) && hidden != true] | order(postedAt desc) {
                    title,
                    "pubDate": postedAt,
                    description,
                    "link": '/blog/' + slug.current,
                    "categories": coalesce(tags[]->slug.current, []),
                }, []),
    }
`);

export const SOCIAL_LINKS_QUERY = defineQuery(`
    coalesce(*[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0].socialLinks, [])
`);

export const ABOUT_QUERY = defineQuery(`
    *[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0] {
        bio,
    }
`);

export const BIRTHDAY_QUERY = defineQuery(`
    *[_type == "personalInfo" && _id == "${PERSONAL_INFO_CONFIG_ID}"] [0].birthday
`);

export const SHOW_SIMPLE_CODE_QUERY = defineQuery(`
    coalesce(*[_type == "configuration" && _id == "${CONFIGURATION_CONFIG_ID}"] [0].showSimpleCodePreview, false)
`);

export const LINK_REFERENCE_QUERY = defineQuery(`
    $ref -> {
        "type": _type,
        "name": title,
        "updatedAt": _updatedAt,
        "slug": slug.current,
        "shouldShow": array::intersects(["post", "project"], [_type]) && hidden == true
    }
`);

export const TAGS_QUERY = defineQuery(`
    *[_type == "category" && hidden != true] {
        "slug": slug.current,
        "name": title,
    }
`);
