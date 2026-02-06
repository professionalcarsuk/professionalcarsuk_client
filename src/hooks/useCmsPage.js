import { useEffect, useState } from 'react';

export const useCmsPage = (slug) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

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
