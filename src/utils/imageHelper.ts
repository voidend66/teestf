import { ProcedureArticle, ServiceItem } from '../types';

/**
 * Default fallback image if an article or service has no image or fails to load
 */
export const DEFAULT_MEDICAL_FALLBACK =
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80';

/**
 * Returns the base API URL configured in environment variables or window object
 */
export function getApiBaseUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    return String(import.meta.env.VITE_API_BASE_URL).replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && (window as any).__API_BASE_URL__) {
    return String((window as any).__API_BASE_URL__).replace(/\/$/, '');
  }
  return '';
}

/**
 * Resolves any image URL (absolute or relative) to a fully qualified URL
 * Supports:
 * - Absolute URLs (https://..., http://..., data:..., blob:...)
 * - Relative URLs (/media/drshahidi/..., media/...) with optional API_BASE_URL
 */
export function resolveMediaUrl(rawPathOrUrl?: string, customBaseUrl?: string): string {
  if (!rawPathOrUrl || typeof rawPathOrUrl !== 'string') {
    return '';
  }

  const trimmed = rawPathOrUrl.trim();
  if (!trimmed) return '';

  // Already an absolute URL or data/blob URI
  if (/^(https?:|\/\/|data:|blob:)/i.test(trimmed)) {
    return trimmed;
  }

  const baseUrl = (customBaseUrl || getApiBaseUrl()).replace(/\/$/, '');

  // Relative path with a defined API_BASE_URL
  if (baseUrl) {
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${baseUrl}${cleanPath}`;
  }

  // Relative path on same origin or proxied domain
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

/**
 * Resolves the image for an article supporting direct public URLs and field aliases:
 * Priority: article.imageUrl || article.featuredImage || article.heroImage || article.image
 */
export function getArticleImageUrl(
  article?: Partial<ProcedureArticle> | Record<string, any> | null,
  fallback: string = DEFAULT_MEDICAL_FALLBACK
): string {
  if (!article) return fallback;

  const raw =
    article.imageUrl ||
    article.featuredImage ||
    article.heroImage ||
    article.image ||
    article.relativeImageUrl;

  const resolved = resolveMediaUrl(raw);
  return resolved || fallback;
}

/**
 * Resolves the service image supporting direct public URLs and field aliases:
 * Priority: service.imageUrl || service.image || service.featuredImage
 */
export function getServiceImageUrl(
  service?: Partial<ServiceItem> | Record<string, any> | null,
  fallback: string = DEFAULT_MEDICAL_FALLBACK
): string {
  if (!service) return fallback;

  const raw =
    service.imageUrl ||
    service.image ||
    service.featuredImage ||
    service.relativeImageUrl;

  const resolved = resolveMediaUrl(raw);
  return resolved || fallback;
}

/**
 * Resolves the gallery / case study image supporting direct public URLs:
 * Priority: item.imageUrl || item.image || item.featuredImage || item.afterUrl
 */
export function getGalleryImageUrl(
  item?: any,
  fallback: string = DEFAULT_MEDICAL_FALLBACK
): string {
  if (!item) return fallback;

  const raw =
    item.imageUrl ||
    item.image ||
    item.featuredImage ||
    item.afterUrl ||
    item.beforeUrl;

  const resolved = resolveMediaUrl(raw);
  return resolved || fallback;
}

/**
 * Normalizes an article object from API so all image fields are in sync
 */
export function normalizeArticle(article: any): ProcedureArticle {
  const resolvedUrl = getArticleImageUrl(article, '');
  const relativeUrl =
    article.relativeImageUrl ||
    (typeof article.featuredImage === 'string' && article.featuredImage.startsWith('/')
      ? article.featuredImage
      : typeof article.heroImage === 'string' && article.heroImage.startsWith('/')
      ? article.heroImage
      : undefined);

  return {
    ...article,
    heroImage: resolvedUrl || article.heroImage || DEFAULT_MEDICAL_FALLBACK,
    featuredImage: resolvedUrl || article.featuredImage || DEFAULT_MEDICAL_FALLBACK,
    imageUrl: resolvedUrl || article.imageUrl || DEFAULT_MEDICAL_FALLBACK,
    image: resolvedUrl || article.image || DEFAULT_MEDICAL_FALLBACK,
    relativeImageUrl: relativeUrl,
    sections: Array.isArray(article.sections) ? article.sections : []
  };
}

/**
 * Normalizes a service object from API so all image fields are in sync
 */
export function normalizeService(service: any): ServiceItem {
  const resolvedUrl = getServiceImageUrl(service, '');
  const relativeUrl =
    service.relativeImageUrl ||
    (typeof service.imageUrl === 'string' && service.imageUrl.startsWith('/')
      ? service.imageUrl
      : typeof service.image === 'string' && service.image.startsWith('/')
      ? service.image
      : undefined);

  return {
    ...service,
    image: resolvedUrl || service.image || DEFAULT_MEDICAL_FALLBACK,
    imageUrl: resolvedUrl || service.imageUrl || DEFAULT_MEDICAL_FALLBACK,
    featuredImage: resolvedUrl || service.featuredImage || DEFAULT_MEDICAL_FALLBACK,
    relativeImageUrl: relativeUrl,
    highlights: Array.isArray(service.highlights) ? service.highlights : []
  };
}

/**
 * Normalizes a gallery item from API so image URLs are in sync
 */
export function normalizeGallery(item: any): any {
  const resolvedUrl = getGalleryImageUrl(item, '');
  return {
    ...item,
    imageUrl: resolvedUrl || item.imageUrl || item.afterUrl || DEFAULT_MEDICAL_FALLBACK,
    beforeUrl: resolveMediaUrl(item.beforeUrl) || item.beforeUrl,
    afterUrl: resolveMediaUrl(item.afterUrl) || item.afterUrl
  };
}

