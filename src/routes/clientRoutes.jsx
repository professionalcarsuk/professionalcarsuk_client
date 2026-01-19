import { MainLayout } from '../layouts';
import {
  About,
  Compare,
  Complaints,
  Contact,
  CookiePolicy,
  Customization,
  Enquiry,
  Home,
  NotFound,
  PartExchange,
  PrivacyPolicy,
  Search,
  // Careers,
  SellCar,
  Showroom,
  Sitemap,
  TermsOfUse,
  VehicleDetailStatic,
  VehicleListings,
  Warranty,
} from '../pages';

export const clientRoutes = [
  // Public Routes
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: '/about',
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
  {
    path: '/warranty',
    element: (
      <MainLayout>
        <Warranty />
      </MainLayout>
    ),
  },
  {
    path: '/contact',
    element: (
      <MainLayout>
        <Contact />
      </MainLayout>
    ),
  },
  {
    path: '/enquiry',
    element: (
      <MainLayout>
        <Enquiry />
      </MainLayout>
    ),
  },
  // {
  //   path: "/careers",
  //   element: (
  //     <MainLayout>
  //       <Careers />
  //     </MainLayout>
  //   ),
  // },
  {
    path: '/sellcar',
    element: (
      <MainLayout>
        <SellCar />
      </MainLayout>
    ),
  },
  {
    path: '/part-exchange',
    element: (
      <MainLayout>
        <PartExchange />
      </MainLayout>
    ),
  },
  {
    path: '/customization',
    element: (
      <MainLayout>
        <Customization />
      </MainLayout>
    ),
  },
  {
    path: '/complaints',
    element: (
      <MainLayout>
        <Complaints />
      </MainLayout>
    ),
  },
  {
    path: '/sitemap',
    element: (
      <MainLayout>
        <Sitemap />
      </MainLayout>
    ),
  },
  {
    path: '/terms-of-use',
    element: (
      <MainLayout>
        <TermsOfUse />
      </MainLayout>
    ),
  },
  {
    path: '/privacy-policy',
    element: (
      <MainLayout>
        <PrivacyPolicy />
      </MainLayout>
    ),
  },
  {
    path: '/cookie-policy',
    element: (
      <MainLayout>
        <CookiePolicy />
      </MainLayout>
    ),
  },

  // Dynamic Vehicle Routes
  {
    path: '/vehicles/:type',
    element: (
      <MainLayout>
        <VehicleListings />
      </MainLayout>
    ),
  },
  {
    path: '/vehicles/:type/:brand',
    element: (
      <MainLayout>
        <VehicleListings />
      </MainLayout>
    ),
  },
  {
    path: '/search',
    element: (
      <MainLayout>
        <Search />
      </MainLayout>
    ),
  },

  // Legacy Routes (redirect to new dynamic routes)
  {
    path: '/used-cars',
    element: (
      <MainLayout>
        <Showroom />
      </MainLayout>
    ),
  },
  {
    path: '/used-vans',
    element: (
      <MainLayout>
        <Showroom />
      </MainLayout>
    ),
  },
  {
    path: '/used/cars/:brand',
    element: (
      <MainLayout>
        <Showroom />
      </MainLayout>
    ),
  },
  {
    path: '/used/vans/:brand',
    element: (
      <MainLayout>
        <Showroom />
      </MainLayout>
    ),
  },

  // Vehicle Detail Route
  {
    path: '/vehicle/:brand/:vehicleId',
    element: (
      <MainLayout>
        <VehicleDetailStatic />
      </MainLayout>
    ),
  },

  // Compare Route
  {
    path: '/compare',
    element: (
      <MainLayout>
        <Compare />
      </MainLayout>
    ),
  },

  // Services Routes
  {
    path: '/sellcar',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Sell Your Car</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },
  {
    path: '/partex',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Part Exchange</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },
  {
    path: '/customization',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Customisation</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },
  {
    path: '/complaints',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Complaints</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },
  {
    path: '/warranty',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Warranty</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },

  // Dynamic Showroom Routes
  {
    path: '/showroom',
    element: (
      <MainLayout>
        <Showroom />
      </MainLayout>
    ),
  },
  {
    path: '/showroom/:brand',
    element: (
      <MainLayout>
        <Showroom />
      </MainLayout>
    ),
  },

  // About Routes
  {
    path: '/about',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },

  // Other Routes
  {
    path: '/finance',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Finance</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },
  {
    path: '/insurance',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Insurance</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },
  {
    path: '/news',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">News</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },
  {
    path: '/reviews',
    element: (
      <MainLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p>Coming soon...</p>
        </div>
      </MainLayout>
    ),
  },

  // 404 Catch-all Route - Must be last
  {
    path: '*',
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  },
];
