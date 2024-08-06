import { groq } from 'next-sanity';

// @sanity-typegen-ignore
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`;

export const PAGINATED_POSTS_QUERY = groq`{
    "data": ${POSTS_QUERY},
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
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
