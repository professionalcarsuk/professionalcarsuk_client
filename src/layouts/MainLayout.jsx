import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CookieConsentBanner, FixedBannerBottom, Navbar } from '../components';
import Footer from '../components/Footer/Footer';
import { useSeo } from '../hooks/useSeo';

const SEO_DEFAULT = {
  title: 'Professional Cars | Quality Used Cars in Aylesbury',
  description:
    'Discover quality used cars at Professional Cars. Competitive finance, part exchange, delivery options, and trusted service in Aylesbury.',
};

const getSeoForPath = (pathname) => {
  if (pathname === '/') {
    return {
      title: 'Professional Cars | Quality Used Cars in Aylesbury',
      description:
        'Browse quality used cars with flexible finance and part exchange options at Professional Cars in Aylesbury.',
      noindex: false,
    };
  }

  if (pathname === '/about') {
    return {
      title: 'About Us | Professional Cars',
      description: 'Learn about Professional Cars, our approach, and how we help customers find the right used vehicle.',
      noindex: false,
    };
  }

  if (pathname === '/contact') {
    return {
      title: 'Contact Us | Professional Cars',
      description: 'Get in touch with Professional Cars for vehicle enquiries, valuations, and dealership support.',
      noindex: false,
    };
  }

  if (pathname === '/finance') {
    return {
      title: 'Car Finance | Professional Cars',
      description: 'Explore car finance options at Professional Cars with flexible packages to suit your budget.',
      noindex: false,
    };
  }

  if (pathname === '/part-exchange') {
    return {
      title: 'Part Exchange | Professional Cars',
      description: 'Part exchange your current car with Professional Cars and upgrade to your next vehicle with ease.',
      noindex: false,
    };
  }

  if (pathname === '/sellcar') {
    return {
      title: 'Sell Your Car | Professional Cars',
      description: 'Sell your car to Professional Cars quickly with a fair and transparent valuation process.',
      noindex: false,
    };
  }

  if (pathname === '/search') {
    return {
      title: 'Search Used Cars | Professional Cars',
      description: 'Search our latest used car stock by make, model, budget, and finance options.',
      noindex: true,
    };
  }

  if (pathname.startsWith('/showroom') || pathname.startsWith('/used-cars') || pathname.startsWith('/used-vans') || pathname.startsWith('/used/')) {
    return {
      title: 'Used Car Showroom | Professional Cars',
      description: 'View available used cars and vans in our showroom with detailed specs and finance options.',
      noindex: false,
    };
  }

  if (pathname.startsWith('/vehicle/')) {
    // Vehicle detail page SEO is set in VehicleDetailStatic with exact model-specific data.
    return { title: null, description: null, noindex: false };
  }

  return {
    title: SEO_DEFAULT.title,
    description: SEO_DEFAULT.description,
    noindex: false,
  };
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const seo = getSeoForPath(location.pathname);

  useSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: location.pathname,
    noindex: seo.noindex,
  });

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
