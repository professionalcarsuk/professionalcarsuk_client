import React, { createContext, useContext, useEffect, useState } from 'react';

const SiteSettingsContext = createContext({
  settings: null,
  loading: false,
});

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/client/site-settings');
        if (!res.ok) throw new Error('Failed to load site settings');
        const json = await res.json();
        setSettings(json.data || null);
      } catch {
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
