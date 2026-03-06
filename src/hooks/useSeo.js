import { useEffect } from 'react';

const upsertMetaTag = (selector, attributes) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    tag.setAttribute(key, value);
  });
};

const upsertCanonical = (href) => {
  if (!href) return;

  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

const buildCanonicalUrl = (canonicalPath) => {
  if (!canonicalPath) return null;

  const base = (import.meta.env.VITE_SITE_URL || window.location.origin || '').replace(/\/$/, '');
  const path = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  return `${base}${path}`;
};

const buildAbsoluteImageUrl = (imagePath, canonicalUrl) => {
  if (!imagePath) return null;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  const base = canonicalUrl
    ? new URL(canonicalUrl).origin
    : (import.meta.env.VITE_SITE_URL || window.location.origin || '').replace(/\/$/, '');
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${base}${normalizedPath}`;
};

export const useSeo = ({
  title,
  description,
  canonicalPath,
  noindex = false,
  imagePath = '/logo.png',
  type = 'website',
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      upsertMetaTag('meta[name="description"]', {
        name: 'description',
        content: description,
      });
    }

    upsertMetaTag('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex,follow' : 'index,follow',
    });

    const canonical = buildCanonicalUrl(canonicalPath);
    upsertCanonical(canonical);

    const ogImage = buildAbsoluteImageUrl(imagePath, canonical);

    upsertMetaTag('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    });

    if (title) {
      upsertMetaTag('meta[property="og:title"]', {
        property: 'og:title',
        content: title,
      });

      upsertMetaTag('meta[name="twitter:title"]', {
        name: 'twitter:title',
        content: title,
      });
    }

    if (description) {
      upsertMetaTag('meta[property="og:description"]', {
        property: 'og:description',
        content: description,
      });

      upsertMetaTag('meta[name="twitter:description"]', {
        name: 'twitter:description',
        content: description,
      });
    }

    if (canonical) {
      upsertMetaTag('meta[property="og:url"]', {
        property: 'og:url',
        content: canonical,
      });
    }

    if (ogImage) {
      upsertMetaTag('meta[property="og:image"]', {
        property: 'og:image',
        content: ogImage,
      });

      upsertMetaTag('meta[name="twitter:image"]', {
        name: 'twitter:image',
        content: ogImage,
      });
    }

    upsertMetaTag('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
  }, [title, description, canonicalPath, noindex, imagePath, type]);
};
