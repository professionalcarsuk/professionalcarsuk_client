import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { fetchRecentVehicles, loadFavorites, selectFavoritesCount } from '../../store/vehicleSlice';
import './Navbar.css';

const Navbar = () => {
  const [showroomBrands, setShowroomBrands] = useState([]);
  const [vanBrands, setVanBrands] = useState([]);
  const [loadingShowroomBrands, setLoadingShowroomBrands] = useState(true);
  const [loadingVanBrands, setLoadingVanBrands] = useState(true);

  // Mobile menu and search states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile search states
  const [mobileSearchForm, setMobileSearchForm] = useState({
    vehtype: '',
    make: '',
    model: '',
  });
  const [mobileBrands, setMobileBrands] = useState([]);
  const [mobileModels, setMobileModels] = useState([]);
  const [loadingMobileBrands, setLoadingMobileBrands] = useState(true);
  const [loadingMobileModels, setLoadingMobileModels] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const favoritesCount = useSelector(selectFavoritesCount);

  useEffect(() => {
    // Fetch recent vehicles once on mount to build brand lists
    dispatch(fetchRecentVehicles());
    // Load favorites from localStorage
    dispatch(loadFavorites());
  }, [dispatch]);

  // Fetch showroom brands (cars)
  useEffect(() => {
    const fetchShowroomBrands = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/client/brands?type=cars`
        );
        const result = await response.json();
        if (result.success) {
          setShowroomBrands(result.data.map((brand) => brand.name));
        }
      } catch (error) {
        console.error('Error fetching showroom brands:', error);
      } finally {
        setLoadingShowroomBrands(false);
      }
    };

    fetchShowroomBrands();
  }, []);

  // Fetch van brands
  useEffect(() => {
    const fetchVanBrands = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/client/brands?type=vans`
        );
        const result = await response.json();
        if (result.success) {
          setVanBrands(result.data.map((brand) => brand.name));
        }
      } catch (error) {
        console.error('Error fetching van brands:', error);
      } finally {
        setLoadingVanBrands(false);
      }
    };

    fetchVanBrands();
  }, []);

  // Fetch brands for mobile search on component mount
  useEffect(() => {
    const fetchMobileBrands = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/client/brands`
        );
        const result = await response.json();
        if (result.success) {
          setMobileBrands(result.data);
        }
      } catch (error) {
        console.error('Error fetching mobile brands:', error);
      } finally {
        setLoadingMobileBrands(false);
      }
    };

    fetchMobileBrands();
  }, []);

  // Fetch models when mobile make changes
  useEffect(() => {
    const fetchMobileModels = async () => {
      if (!mobileSearchForm.make) {
        setMobileModels([]);
        return;
      }

      setLoadingMobileModels(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/client/models?brand=${
            mobileSearchForm.make
          }`
        );
        const result = await response.json();
        if (result.success) {
          setMobileModels(result.data);
        }
      } catch (error) {
        console.error('Error fetching mobile models:', error);
      } finally {
        setLoadingMobileModels(false);
      }
    };

    fetchMobileModels();
  }, [mobileSearchForm.make]);

  // Prevent body scroll when mobile menu or search is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen, isSearchOpen]);

  // Determine if parent menus should be marked active based on current path
  const isShowroomActive = pathname.startsWith('/used-cars') || pathname.startsWith('/used/cars');
  const isVansActive = pathname.startsWith('/used-vans') || pathname.startsWith('/used/vans');
  const isServicesActive = ['/sellcar', '/part-exchange', '/customization', '/complaints'].some(
    (p) => pathname.startsWith(p)
  );
  const isAboutActive = ['/about', '/about-us'].some((p) => pathname.startsWith(p));

  // Dropdowns will stay open during navigation to child routes naturally
  // No need for useEffect to manage this

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  };

  // Handle mobile search form input changes
  const handleMobileSearchChange = (e) => {
    const { name, value } = e.target;
    setMobileSearchForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Reset model when make changes
      if (name === 'make') {
        updated.model = '';
      }

      return updated;
    });
  };

  // Handle mobile search form submission
  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();

    // Build search parameters
    const params = new URLSearchParams();

    // Only add vehicle type if explicitly selected
    if (mobileSearchForm.vehtype === 'vans') {
      params.append('type', 'van');
    } else if (mobileSearchForm.vehtype === 'cars') {
      params.append('type', 'cars');
    }
    // If vehtype is empty, don't add type parameter - search all vehicles

    // Add make if selected
    if (mobileSearchForm.make) {
      params.append('make', mobileSearchForm.make);
    }

    // Add model if selected
    if (mobileSearchForm.model) {
      params.append('model', mobileSearchForm.model);
    }

    // Navigate to search page with parameters
    navigate(`/search?${params.toString()}`);

    // Close the search dropdown
    setIsSearchOpen(false);
  };

  return (
    <>
      <header id="header">
        <div className="wrapper wrapper_navbar">
          <div className="container">
            {/* Mobile Nav Row: Only visible at <=1024px */}
            <div className="mobile-nav-row px-[5px]">
              <a
                className="toggle"
                id="megamenu__trigger"
                data-menu-toggle="main"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(!isMenuOpen);
                  setIsSearchOpen(false); // Close search if open
                  setActiveDropdown(null); // Close any dropdowns
                }}
              >
                <i className="fa fa-bars"></i> Menu
              </a>
              <div className="mobile-logo">
                <a
                  href="https://professionalcarsuk-client.vercel.app"
                  title="Professional Cars Limited"
                  className="hdr-logo"
                >
                  <img src="/logo.png" alt="Professional Cars Limited" className="responsive-img" />
                </a>
              </div>
              <a
                className="toggle"
                id="usedcars__trigger"
                data-menu-toggle="dropdown-search"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSearchOpen(!isSearchOpen);
                  setIsMenuOpen(false); // Close main menu if open
                  setActiveDropdown(null); // Close any dropdowns
                }}
              >
                <i className="fa fa-search"></i> Browse
              </a>
            </div>
            {/* Desktop Nav: Hidden at <=1024px */}
            <div className="header">
              <div className="header__logo">
                <a
                  href="https://professionalcarsuk-client.vercel.app"
                  title="Professional Cars Limited"
                  className="hdr-logo"
                >
                  <img src="/logo.png" alt="Professional Cars Limited" className="responsive-img" />
                </a>
              </div>
              <div className="header__nav">
                <div className="contact-details">
                  <ul>
                    <li>
                      <a href="/contact">
                        <i className="ci ci-map-marker-alt"></i> Rear Yard 2, Aston Clinton, Aylesbury, Buckinghamshire
                      </a>
                    </li>
                    <li className="mobile-hidden">
                      <span aria-hidden="true" className="icon icon-phone-2"></span>{' '}
                      <a href="tel:07788929755">07788929755</a>
                    </li>
                    <li className="desktop-hidden">
                      <span aria-hidden="true" className="icon icon-phone-2"></span>{' '}
                      <a href="tel:07788929755">07788929755</a>
                    </li>
                    <li>
                      <span aria-hidden="true" className="icon icon-mail"></span>{' '}
                      <a href="mailto:info@professionalcars.co.uk" title="Email Us">
                        Email Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="ci ci-instagram header-social"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="ci ci-facebook-f header-social"></i>
                      </a>
                    </li>
                    <li>
                      <div className="header__favourites">
                        <div className="favourites-badge">
                          <div className="app">
                            <em>
                              <Link to="/compare">
                                <i
                                  className={favoritesCount > 0 ? 'fas fa-heart' : 'far fa-heart'}
                                ></i>
                                <span className="favourites-count">{favoritesCount}</span>
                              </Link>
                            </em>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <nav id="primary-navigation">
                  <div className="wrapper">
                    <div className="container">
                      <div className="toggles">
                        <a
                          className="toggle"
                          id="megamenu__trigger"
                          data-menu-toggle="main"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMenuOpen(!isMenuOpen);
                          }}
                        >
                          <i className="fa fa-bars"></i> Menu{' '}
                        </a>
                        <a
                          className="toggle"
                          id="usedcars__trigger"
                          data-menu-toggle="dropdown-search"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fa fa-search"></i> Browse{' '}
                        </a>
                      </div>
                      <ul
                        className="megamenu"
                        data-menu="main"
                        role="menu"
                        itemScope=""
                        itemType="http://www.schema.org/SiteNavigationElement"
                      >
                        <li
                          className="megamenu__listitem"
                          id="listitem__home--parent"
                          itemProp="name"
                        >
                          <NavLink
                            to="/"
                            end
                            itemProp="url"
                            className={({ isActive }) =>
                              isActive
                                ? 'megamenu__listitem__link active'
                                : 'megamenu__listitem__link'
                            }
                            title="Home"
                            role="menuitem"
                          >
                            {' '}
                            Home
                          </NavLink>
                        </li>
                        <li
                          className={
                            'megamenu__listitem sub' +
                            (isShowroomActive ? ' active' : '') +
                            (activeDropdown === 'showroom' ? ' open' : '')
                          }
                          id="listitem__used-cars--parent"
                          itemProp="name"
                          data-menu-dropdown="cars"
                        >
                          <a
                            href="#"
                            itemProp="url"
                            className="megamenu__listitem__link megamenu__listitem__link--parent"
                            title="Showroom"
                            role="menuitem"
                            data-menu-close=""
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDropdown('showroom');
                            }}
                          >
                            {' '}
                            Showroom <i className="ci ci-angle-down-l"></i>
                          </a>
                          <div
                            className={
                              activeDropdown === 'showroom' ? 'megasubmenu open' : 'megasubmenu'
                            }
                            itemScope=""
                            itemType="http://www.schema.org/SiteNavigationElement"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="l-megamenu">
                              <div className="wrapper">
                                <div className="container">
                                  <div className="o-megamenu">
                                    <div className="column-1">
                                      <div className="megamenu-group megamenu-group--used-cars">
                                        <div className="megamenu-group__title">Showroom</div>
                                        <ul className="megamenu-group__list">
                                          <li>
                                            <NavLink
                                              to="/used-cars"
                                              title="View all cars"
                                              className={
                                                pathname === '/used-cars'
                                                  ? 'megasubmenu__listitem__link active'
                                                  : 'megasubmenu__listitem__link'
                                              }
                                            >
                                              View all cars
                                            </NavLink>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="column-2">
                                      <div className="megamenu-group megamenu-group--finance">
                                        <div className="megamenu-group__title">Finance</div>
                                        <ul className="megamenu-group__list">
                                          <li>
                                            <a
                                              href="/search?type=cars&budgetswitch=1&budgetmax=150"
                                              title=""
                                              rel="nofollow"
                                            >
                                              Upto £150 p/m
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="/search?type=cars&budgetswitch=1&budgetmax=250"
                                              title=""
                                              rel="nofollow"
                                            >
                                              Upto £250 p/m
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="/search?type=cars&budgetswitch=1&budgetmin=250"
                                              title=""
                                              rel="nofollow"
                                            >
                                              £250 p/m &amp; Over
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="column-3">
                                      <div className="megamenu-group megamenu-group--brands">
                                        <div className="megamenu-group__title">Brands</div>
                                        <ul className="megamenu-group__list">
                                          {(showroomBrands && showroomBrands.length > 0
                                            ? showroomBrands
                                            : [
                                                'Audi',
                                                'BMW',
                                                'Cupra',
                                                'Ford',
                                                'Mercedes-Benz',
                                                'Nissan',
                                                'Porsche',
                                                'Skoda',
                                                'Toyota',
                                                'Volkswagen',
                                                'Volvo',
                                              ]
                                          ).map((brand) => {
                                            const slug = brand
                                              .toLowerCase()
                                              .replace(/\s+/g, '-')
                                              .replace(/--+/g, '-');
                                            return (
                                              <li key={brand}>
                                                <NavLink
                                                  to={`/used/cars/${slug}`}
                                                  className={
                                                    pathname === `/used/cars/${slug}`
                                                      ? 'megasubmenu__listitem__link active'
                                                      : 'megasubmenu__listitem__link'
                                                  }
                                                >
                                                  <span>{brand}</span>
                                                </NavLink>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li
                          className={
                            'megamenu__listitem sub' +
                            (isVansActive ? ' active' : '') +
                            (activeDropdown === 'vans' ? ' open' : '')
                          }
                          id="listitem__used-vans--parent"
                          itemProp="name"
                          data-menu-dropdown="vans"
                        >
                          <a
                            href="#"
                            itemProp="url"
                            className="megamenu__listitem__link megamenu__listitem__link--parent"
                            title="Used Vans"
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDropdown('vans');
                            }}
                          >
                            {' '}
                            Used Vans <i className="ci ci-angle-down-l"></i>
                          </a>
                          <div
                            className={
                              activeDropdown === 'vans' ? 'megasubmenu open' : 'megasubmenu'
                            }
                            itemScope=""
                            itemType="http://www.schema.org/SiteNavigationElement"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="l-megamenu">
                              <div className="wrapper">
                                <div className="container">
                                  <div className="o-megamenu">
                                    <div className="column-1">
                                      <div className="megamenu-group megamenu-group--used-vans">
                                        <div className="megamenu-group__title">Used Vans</div>
                                        <ul className="megamenu-group__list">
                                          <li>
                                            <NavLink
                                              to="/used-vans"
                                              title="View all vans"
                                              className={
                                                pathname === '/used-vans'
                                                  ? 'megasubmenu__listitem__link active'
                                                  : 'megasubmenu__listitem__link'
                                              }
                                            >
                                              View all vans
                                            </NavLink>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="column-2">
                                      <div className="megamenu-group megamenu-group--finance">
                                        <div className="megamenu-group__title">Finance</div>
                                        <ul className="megamenu-group__list">
                                          <li>
                                            <a
                                              href="/search?type=vans&budgetswitch=1&budgetmax=150"
                                              rel="nofollow"
                                            >
                                              Upto £150 p/m
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="/search?type=vans&budgetswitch=1&budgetmax=250"
                                              rel="nofollow"
                                            >
                                              Upto £250 p/m
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="/search?type=vans&budgetswitch=1&budgetmin=250"
                                              rel="nofollow"
                                            >
                                              £250 p/m &amp; Over
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="column-3">
                                      <div className="megamenu-group megamenu-group--brands">
                                        <div className="megamenu-group__title">Brands</div>
                                        <ul className="megamenu-group__list">
                                          {(vanBrands || []).map((brand) => {
                                            const slug = brand
                                              .toLowerCase()
                                              .replace(/\s+/g, '-')
                                              .replace(/--+/g, '-');
                                            return (
                                              <li key={brand}>
                                                <Link to={`/used/vans/${slug}`}>
                                                  <span>{brand}</span>
                                                </Link>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li
                          className={
                            'megamenu__listitem sub' +
                            (isServicesActive ? ' active' : '') +
                            (activeDropdown === 'services' ? ' open' : '')
                          }
                          id="listitem__services--parent"
                          itemProp="name"
                          data-menu-dropdown="services"
                        >
                          <a
                            href="#"
                            itemProp="url"
                            className="megamenu__listitem__link megamenu__listitem__link--parent"
                            title="Services"
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDropdown('services');
                            }}
                          >
                            {' '}
                            Services <i className="ci ci-angle-down-l"></i>
                          </a>
                          <div
                            className={
                              activeDropdown === 'services' ? 'megasubmenu open' : 'megasubmenu'
                            }
                            itemScope=""
                            itemType="http://www.schema.org/SiteNavigationElement"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="container">
                              <ul className="megasubmenu__list">
                                <li className="megasubmenu__listitem" id="listitem__sell-your-car">
                                  <NavLink
                                    to="/sellcar"
                                    className={
                                      pathname === '/sellcar'
                                        ? 'megasubmenu__listitem__link active'
                                        : 'megasubmenu__listitem__link'
                                    }
                                  >
                                    {' '}
                                    Sell Your Car{' '}
                                  </NavLink>
                                </li>
                                <li className="megasubmenu__listitem" id="listitem__part-exchange">
                                  <NavLink
                                    to="/part-exchange"
                                    className={
                                      pathname === '/part-exchange'
                                        ? 'megasubmenu__listitem__link active'
                                        : 'megasubmenu__listitem__link'
                                    }
                                  >
                                    {' '}
                                    Part Exchange{' '}
                                  </NavLink>
                                </li>
                                <li className="megasubmenu__listitem" id="listitem__customisation">
                                  <NavLink
                                    to="/customization"
                                    className={
                                      pathname === '/customization'
                                        ? 'megasubmenu__listitem__link active'
                                        : 'megasubmenu__listitem__link'
                                    }
                                  >
                                    {' '}
                                    Customisation{' '}
                                  </NavLink>
                                </li>
                                <li className="megasubmenu__listitem" id="listitem__complaints">
                                  <NavLink
                                    to="/complaints"
                                    className={
                                      pathname === '/complaints'
                                        ? 'megasubmenu__listitem__link active'
                                        : 'megasubmenu__listitem__link'
                                    }
                                  >
                                    {' '}
                                    Complaints{' '}
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li
                          className="megamenu__listitem"
                          id="listitem__warranty--parent"
                          itemProp="name"
                        >
                          <NavLink
                            to="/warranty"
                            itemProp="url"
                            className={({ isActive }) =>
                              isActive
                                ? 'megamenu__listitem__link active'
                                : 'megamenu__listitem__link'
                            }
                            title="Warranty"
                            role="menuitem"
                          >
                            {' '}
                            Warranty
                          </NavLink>
                        </li>
                        <li
                          className="megamenu__listitem"
                          id="listitem__about--parent"
                          itemProp="name"
                        >
                          <NavLink
                            to="/about"
                            itemProp="url"
                            className={({ isActive }) =>
                              isActive
                                ? 'megamenu__listitem__link active'
                                : 'megamenu__listitem__link'
                            }
                            title="About"
                            role="menuitem"
                          >
                            {' '}
                            About
                          </NavLink>
                        </li>
                        <li
                          className="megamenu__listitem"
                          id="listitem__contact--parent"
                          itemProp="name"
                        >
                          <NavLink
                            to="/contact"
                            itemProp="url"
                            className={({ isActive }) =>
                              isActive
                                ? 'megamenu__listitem__link active'
                                : 'megamenu__listitem__link'
                            }
                            title="Contact"
                            role="menuitem"
                          >
                            {' '}
                            Contact
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Overlay for dropdowns */}
        {activeDropdown && (
          <div
            className="megamenu-overlay dropdown-overlay"
            onClick={() => setActiveDropdown(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 5,
            }}
          ></div>
        )}

        {/* Mobile Megamenu Overlay */}
        {isMenuOpen && (
          <div className="megamenu-overlay">
            <ul className={`megamenu toggled`} data-menu="main" role="menu">
              {/* Home */}
              <li className="megamenu__listitem" id="listitem__home--parent">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'megamenu__listitem__link megamenu__listitem__link--current'
                      : 'megamenu__listitem__link'
                  }
                  title="Home"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>

              {/* Showroom with Dropdown */}
              <li
                className={`megamenu__listitem sub ${isShowroomActive ? 'active' : ''} ${
                  activeDropdown === 'showroom' ? 'open' : ''
                }`}
                id="listitem__used-cars--parent"
                data-menu-dropdown="cars"
              >
                <a
                  href="#"
                  className="megamenu__listitem__link megamenu__listitem__link--parent"
                  title="Showroom"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('showroom');
                  }}
                >
                  Showroom
                  <i className="ci ci-angle-down-l"></i>
                </a>
                {activeDropdown === 'showroom' && (
                  <div className="megasubmenu">
                    <div className="l-megamenu">
                      <div className="wrapper">
                        <div className="container">
                          <div className="o-megamenu">
                            <div className="column-1">
                              <div className="megamenu-group megamenu-group--brands">
                                <div className="megamenu-group__title">Brands</div>
                                <ul className="megamenu-group__list">
                                  {(showroomBrands && showroomBrands.length > 0
                                    ? showroomBrands
                                    : [
                                        'Audi',
                                        'BMW',
                                        'Cupra',
                                        'Ford',
                                        'Mercedes-Benz',
                                        'Nissan',
                                        'Porsche',
                                        'Skoda',
                                        'Toyota',
                                        'Volkswagen',
                                        'Volvo',
                                      ]
                                  ).map((brand) => {
                                    const slug = brand
                                      .toLowerCase()
                                      .replace(/\s+/g, '-')
                                      .replace(/--+/g, '-');
                                    return (
                                      <li key={brand}>
                                        <NavLink
                                          to={`/used/cars/${slug}`}
                                          className={
                                            pathname === `/used/cars/${slug}`
                                              ? 'megasubmenu__listitem__link active'
                                              : 'megasubmenu__listitem__link'
                                          }
                                          onClick={closeMenu}
                                        >
                                          <span>{brand}</span>
                                        </NavLink>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <div className="megamenu-group__view-all">
                                  <NavLink
                                    to="/used-cars"
                                    title="View all cars"
                                    className={
                                      pathname === '/used-cars'
                                        ? 'megasubmenu__listitem__link active'
                                        : 'megasubmenu__listitem__link'
                                    }
                                    onClick={closeMenu}
                                  >
                                    View all cars
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Used Vans with Dropdown */}
              <li
                className={`megamenu__listitem sub ${isVansActive ? 'active' : ''} ${
                  activeDropdown === 'vans' ? 'open' : ''
                }`}
                id="listitem__used-vans--parent"
                data-menu-dropdown="vans"
              >
                <a
                  href="#"
                  className="megamenu__listitem__link megamenu__listitem__link--parent"
                  title="Used Vans"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('vans');
                  }}
                >
                  Used Vans
                  <i className="ci ci-angle-down-l"></i>
                </a>
                {activeDropdown === 'vans' && (
                  <div className="megasubmenu">
                    <div className="l-megamenu">
                      <div className="wrapper">
                        <div className="container">
                          <div className="o-megamenu">
                            <div className="column-1">
                              <div className="megamenu-group megamenu-group--brands">
                                <div className="megamenu-group__title">Brands</div>
                                <ul className="megamenu-group__list">
                                  {(vanBrands || []).map((brand) => {
                                    const slug = brand
                                      .toLowerCase()
                                      .replace(/\s+/g, '-')
                                      .replace(/--+/g, '-');
                                    return (
                                      <li key={brand}>
                                        <Link to={`/used/vans/${slug}`} onClick={closeMenu}>
                                          <span>{brand}</span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <div className="megamenu-group__view-all">
                                  <NavLink
                                    to="/used-vans"
                                    title="View all vans"
                                    className={
                                      pathname === '/used-vans'
                                        ? 'megasubmenu__listitem__link active'
                                        : 'megasubmenu__listitem__link'
                                    }
                                    onClick={closeMenu}
                                  >
                                    View all vans
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Services with Simple Dropdown */}
              <li
                className={`megamenu__listitem sub ${isServicesActive ? 'active' : ''} ${
                  activeDropdown === 'services' ? 'open' : ''
                }`}
                id="listitem__services--parent"
                data-menu-dropdown="services"
              >
                <a
                  href="#"
                  className="megamenu__listitem__link megamenu__listitem__link--parent"
                  title="Services"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('services');
                  }}
                >
                  Services
                  <i className="ci ci-angle-down-l"></i>
                </a>
                {activeDropdown === 'services' && (
                  <div className="megasubmenu mobile-simple-submenu">
                    <div className="container">
                      <ul className="megasubmenu__list">
                        <li className="megasubmenu__listitem">
                          <NavLink
                            to="/sellcar"
                            className={
                              pathname === '/sellcar'
                                ? 'megasubmenu__listitem__link active'
                                : 'megasubmenu__listitem__link'
                            }
                            onClick={closeMenu}
                          >
                            Sell Your Car
                          </NavLink>
                        </li>
                        <li className="megasubmenu__listitem">
                          <NavLink
                            to="/part-exchange"
                            className={
                              pathname === '/part-exchange'
                                ? 'megasubmenu__listitem__link active'
                                : 'megasubmenu__listitem__link'
                            }
                            onClick={closeMenu}
                          >
                            Part Exchange
                          </NavLink>
                        </li>
                        <li className="megasubmenu__listitem">
                          <NavLink
                            to="/customization"
                            className={
                              pathname === '/customization'
                                ? 'megasubmenu__listitem__link active'
                                : 'megasubmenu__listitem__link'
                            }
                            onClick={closeMenu}
                          >
                            Customisation
                          </NavLink>
                        </li>
                        <li className="megasubmenu__listitem">
                          <NavLink
                            to="/complaints"
                            className={
                              pathname === '/complaints'
                                ? 'megasubmenu__listitem__link active'
                                : 'megasubmenu__listitem__link'
                            }
                            onClick={closeMenu}
                          >
                            Complaints
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              {/* Warranty */}
              <li className="megamenu__listitem" id="listitem__warranty--parent">
                <NavLink
                  to="/warranty"
                  className={({ isActive }) =>
                    isActive ? 'megamenu__listitem__link active' : 'megamenu__listitem__link'
                  }
                  title="Warranty"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  Warranty
                </NavLink>
              </li>

              {/* About */}
              <li className="megamenu__listitem" id="listitem__about--parent">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? 'megamenu__listitem__link active' : 'megamenu__listitem__link'
                  }
                  title="About"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  About
                </NavLink>
              </li>

              {/* Contact */}
              <li className="megamenu__listitem" id="listitem__contact--parent">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? 'megamenu__listitem__link active' : 'megamenu__listitem__link'
                  }
                  title="Contact"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div id="dropdown-search" className="dropdown-search toggled" data-menu="dropdown-search">
            <div className="search-wrapper">
              <em className="dropdown-search__title">Search for a vehicle</em>
              <form
                id="mobile-search"
                className="dropdown-search__form vans"
                data-search="main"
                onSubmit={handleMobileSearchSubmit}
              >
                <input type="hidden" name="landing_pages_enabled" value="1" />
                <input type="hidden" name="website_type" value="car" />
                <div className="dropdown-search__vehtype">
                  <input
                    type="radio"
                    className="dropdown-search__radio"
                    name="vehtype"
                    id="dropdown-search__vehtype--cars"
                    value="cars"
                    checked={mobileSearchForm.vehtype === 'cars'}
                    onChange={handleMobileSearchChange}
                    required
                    data-search-toggle="dropdown-search__select--make"
                  />
                  <label
                    className="dropdown-search__label--radio"
                    htmlFor="dropdown-search__vehtype--cars"
                  >
                    Cars
                  </label>
                  <input
                    type="radio"
                    className="dropdown-search__radio"
                    name="vehtype"
                    id="dropdown-search__vehtype--vans"
                    value="vans"
                    checked={mobileSearchForm.vehtype === 'vans'}
                    onChange={handleMobileSearchChange}
                    required
                    data-search-toggle="dropdown-search__select--make"
                  />
                  <label
                    className="dropdown-search__label--radio"
                    htmlFor="dropdown-search__vehtype--vans"
                  >
                    Vans
                  </label>
                </div>

                <div className="formgroup">
                  <label className="dropdown-search__label">Choose a make:</label>
                  <select
                    name="make"
                    id="dropdown-search__select--make"
                    value={mobileSearchForm.make}
                    onChange={handleMobileSearchChange}
                    disabled={loadingMobileBrands}
                    data-search-make="dropdown-search__select--model"
                  >
                    <option value="">{loadingMobileBrands ? 'Loading...' : 'Any make'}</option>
                    {mobileBrands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formgroup last">
                  <label className="dropdown-search__label">Choose a model:</label>
                  <select
                    name="model"
                    id="dropdown-search__select--model"
                    value={mobileSearchForm.model}
                    onChange={handleMobileSearchChange}
                    disabled={!mobileSearchForm.make || loadingMobileModels}
                    data-search-model=""
                  >
                    <option value="">{loadingMobileModels ? 'Loading...' : 'Any model'}</option>
                    {mobileModels.map((model) => (
                      <option key={model._id} value={model._id}>
                        {model.model}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="dropdown-search__button button"
                  value="Search"
                  aria-hidden="true"
                  data-search-submit=""
                >
                  <i className="fa fa-search"></i> Search
                </button>
              </form>
            </div>
            {/* Overlay to close search dropdown */}
            <div
              className="search-overlay"
              onClick={() => setIsSearchOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              }}
            ></div>
          </div>
        )}
      </header>
      <div className="mobile-favourites-fixed">
        <div className="favourites-badge">
          <div className="app">
            <em>
              <Link to="/compare">
                <i className={favoritesCount > 0 ? 'fas fa-heart' : 'far fa-heart'}></i>
                <span className="favourites-count">{favoritesCount}</span>
              </Link>
            </em>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
