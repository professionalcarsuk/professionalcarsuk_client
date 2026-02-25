import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CookieConsentBanner, FixedBannerBottom, Navbar } from '../components';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change, but respect hash anchors
  useEffect(() => {
    if (location.hash) {
      const scrollToHash = () => {
        const hashSelector = decodeURIComponent(location.hash);
        const target = document.querySelector(hashSelector);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      requestAnimationFrame(scrollToHash);
      const timeoutId = setTimeout(scrollToHash, 250);

      return () => clearTimeout(timeoutId);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [location.pathname, location.hash]);

  // Hide banner on showroom and search pages
  const hideBanner =
    location.pathname.startsWith('/showroom') ||
    location.pathname === '/search' ||
    location.pathname.startsWith('/used-cars') ||
    location.pathname.startsWith('/used-vans') ||
    location.pathname.startsWith('/used/');

  // Remove footer margin on showroom and search pages
  const noFooterMargin =
    location.pathname.startsWith('/showroom') ||
    location.pathname === '/search' ||
    location.pathname.startsWith('/used-cars') ||
    location.pathname.startsWith('/used-vans') ||
    location.pathname.startsWith('/used/');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Force remount of page content on route change to avoid stale views (e.g., staying on Search) */}
      <main key={location.pathname} className="flex-grow">
        {children}
      </main>
      {!hideBanner && <FixedBannerBottom />}
      <Footer noMargin={noFooterMargin} />
      <CookieConsentBanner />
    </div>
  );
};

export default MainLayout;
