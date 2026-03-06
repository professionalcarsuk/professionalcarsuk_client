import { useEffect, useState } from 'react';
import { useSeo } from './useSeo';

const toTitleCase = (value) =>
  String(value || '')
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const htmlToText = (html) =>
  String(html || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const trimDescription = (text, limit = 160) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 3).trim()}...`;
};

export const useCmsPage = (slug, options = {}) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const fallbackPageTitle = toTitleCase(slug);
  const pageTitle = content?.seo?.title || content?.title || fallbackPageTitle || 'Page';
  const seoTitle = `${pageTitle} | Professional Cars`;
  const seoDescription =
    content?.seo?.description ||
    trimDescription(
      htmlToText(content?.contentHtml) || `Read ${fallbackPageTitle || 'our page'} at Professional Cars.`
    );

  useSeo({
    title: slug ? seoTitle : null,
    description: slug ? seoDescription : null,
    canonicalPath: slug ? options.canonicalPath || `/${slug}` : null,
    noindex: false,
    imagePath: content?.seo?.ogImage || '/logo.png',
    type: 'article',
  });

  useEffect(() => {
    if (!slug) return;
    const fetchPage = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/client/cms-pages/${slug}`);
        if (!res.ok) {
          setContent(null);
          return;
        }
        const json = await res.json();
        setContent(json.data || null);
      } catch {
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return { content, loading };
};
