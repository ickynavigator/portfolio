const CONTENT_ROUTES = {
  post: { base: "/blog", label: "Blog" },
  project: { base: "/projects", label: "Projects" },
} as const;

export type RoutedContentType = keyof typeof CONTENT_ROUTES;

export function isRoutedContentType(type: string): type is RoutedContentType {
  return Object.hasOwn(CONTENT_ROUTES, type);
}

export function contentListUrl(type: RoutedContentType) {
  return CONTENT_ROUTES[type].base;
}

export function contentListLabel(type: RoutedContentType) {
  return CONTENT_ROUTES[type].label;
}

export function contentUrl(type: RoutedContentType, slug: string) {
  return `${CONTENT_ROUTES[type].base}/${slug}`;
}
