/**
 * Pure routing & navigation utilities with UTM preservation
 */

export type RouteId =
  | 'home'
  | 'therapy'
  | 'course'
  | 'allergy'
  | 'dermatitis'
  | 'asthma';

export const ROUTE_PATHS: Record<RouteId, string> = {
  home: '/',
  therapy: '/therapy',
  course: '/course',
  allergy: '/allergy',
  dermatitis: '/dermatitis',
  asthma: '/asthma',
};

/**
 * Normalizes pathname to a recognized RouteId
 */
export function parseRoute(pathname: string): RouteId {
  const cleanPath = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  if (cleanPath === '/therapy') return 'therapy';
  if (cleanPath === '/course') return 'course';
  if (cleanPath === '/allergy' || cleanPath === '/requests/allergy') return 'allergy';
  if (cleanPath === '/dermatitis' || cleanPath === '/requests/dermatitis') return 'dermatitis';
  if (cleanPath === '/asthma' || cleanPath === '/requests/asthma') return 'asthma';
  return 'home';
}

/**
 * Preserves query params (such as UTM parameters) across internal navigation
 */
export function buildUrlWithParams(
  targetPath: string,
  searchString: string,
  hash?: string
): string {
  const base = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  const search = searchString
    ? searchString.startsWith('?')
      ? searchString
      : `?${searchString}`
    : '';
  const anchor = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  return `${base}${search}${anchor}`;
}

/**
 * Formats contact message based on topic
 */
export function getContactMessage(
  topic: 'self' | 'child',
  templates: { self: string; child: string }
): string {
  return topic === 'child' ? templates.child : templates.self;
}

/**
 * Checks if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:');
}
