import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import RefineSearchDrawer from '../../components/RefineSearchDrawer';
import './Showroom.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [sortOption, setSortOption] = useState('h');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [modelName, setModelName] = useState(null);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const VEHICLES_PER_PAGE = 12;

  const sortOptions = [
    { value: 'h', label: 'Price (high to low)' },
    { value: 'l', label: 'Price (low to high)' },
    { value: 'm', label: 'Make/model' },
    { value: 'nis', label: 'Latest Arrivals' },
    { value: 'rr', label: 'Recently Reduced' },
  ];

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCustomSortChange = (value) => {
    setSortOption(value);
    setIsSortDropdownOpen(false);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === sortOption);
    return option ? option.label : 'Price (high to low)';
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch filtered vehicles from API
  const fetchFilteredVehicles = useCallback(
    async (page = 1, params = {}) => {
      try {
        const queryParams = new URLSearchParams();

        // Add search parameters to query
        for (const [key, value] of searchParams.entries()) {
          if (value && value.trim() !== '') {
            queryParams.append(key, value);
          }
        }

        // Add any additional params
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            queryParams.append(key, value);
          }
        });

        // Add pagination
        queryParams.append('page', page);
        queryParams.append('pageSize', VEHICLES_PER_PAGE);

        const fullUrl = `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/client/vehicles/filter?${queryParams.toString()}`;
        console.log('DEBUG: Fetching vehicles from:', fullUrl);

        const response = await fetch(fullUrl);

        const data = await response.json();
        console.log('DEBUG: API response:', data.data?.length, 'vehicles');
        if (data.success) {
          return data.data;
        } else {
          throw new Error(data.message || 'Failed to fetch vehicles');
        }
      } catch (error) {
        console.error('Error fetching filtered vehicles:', error);
        throw error;
      }
    },
    [searchParams, VEHICLES_PER_PAGE]
  );

  // Fetch total count of vehicles matching filters
  const fetchVehicleCount = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();

      // Add search parameters to query
      for (const [key, value] of searchParams.entries()) {
        if (value && value.trim() !== '') {
          queryParams.append(key, value);
        }
      }

      queryParams.append('count_only', 'true');

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/client/vehicles/filter?${queryParams.toString()}`
      );

      const data = await response.json();
      if (data.success) {
        return data.count || 0;
      } else {
        throw new Error(data.message || 'Failed to fetch vehicle count');
      }
    } catch (error) {
      console.error('Error fetching vehicle count:', error);
      return 0;
    }
  }, [searchParams]);

  // Fetch brands data
  const fetchBrands = useCallback(async (retryCount = 0) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/client/brands`
      );

      // Handle rate limiting (429)
      if (response.status === 429) {
        if (retryCount < 3) {
          const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
          console.warn(
            `Brands API rate limited. Retrying in ${retryDelay}ms... (attempt ${retryCount + 1}/3)`
          );
          setTimeout(() => fetchBrands(retryCount + 1), retryDelay);
          return;
        } else {
          console.error(
            'Brands API rate limit exceeded after 3 attempts. Using empty brands list.'
          );
          setBrands([]);
          return;
        }
      }

      // Handle other error status codes
      if (!response.ok) {
        console.error(`Brands API error: ${response.status} ${response.statusText}`);
        setBrands([]);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setBrands(data.data);
      } else {
        console.error('Brands API returned success=false:', data);
        setBrands([]);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrands([]);
    }
  }, []);

  // Fetch models for a specific brand
  const fetchModels = async (brandId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/client/models?brand=${brandId}`
      );
      const data = await response.json();
      if (data.success) {
        setModels(data.data);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  // Get brand name by ID
  const getBrandName = useCallback(
    (brandId) => {
      const brand = brands.find((b) => b._id === brandId);
      return brand ? brand.name : null;
    },
    [brands]
  );

  // Get model name by ID
  const getModelName = useCallback(
    (modelId) => {
      const model = models.find((m) => m._id === modelId);
      return model ? model.model : null;
    },
    [models]
  );

  // (removed unused sortVehicles helper; using useMemo-based sorting instead)

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        setCurrentPage(1); // Reset to first page when search params change

        // Fetch total count first
        const count = await fetchVehicleCount();
        setTotalCount(count);
        console.log('DEBUG: totalCount from API =', count);

        // Then fetch first page of vehicles
        let vehicles = await fetchFilteredVehicles(1);
        console.log(
          'DEBUG: Page 1 vehicles from API:',
          vehicles.length,
          vehicles.map((v) => `${v.brand} ${v.model}`)
        );

        setFilteredVehicles(vehicles);
      } catch (err) {
        setError('Failed to load vehicles. Please try again.');
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, [location.key, searchParams, fetchFilteredVehicles, fetchVehicleCount]);

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSortDropdownOpen && !event.target.closest('.custom-select-wrapper')) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortDropdownOpen]);

  // Handle page changes - fetch next page of vehicles
  useEffect(() => {
    if (currentPage > 1) {
      const loadNextPage = async () => {
        try {
          setLoading(true);
          let vehicles = await fetchFilteredVehicles(currentPage);

          setFilteredVehicles(vehicles);
        } catch (err) {
          setError('Failed to load vehicles. Please try again.');
          console.error('Error fetching vehicles:', err);
        } finally {
          setLoading(false);
        }
      };

      loadNextPage();
    }
  }, [currentPage, fetchFilteredVehicles, searchParams]);

  // Handle changes to 'make': fetch models and update brand name
  useEffect(() => {
    const make = searchParams.get('make');
    if (make) {
      if (!isNaN(make)) {
        // treat as ID
        fetchModels(make);
        setBrandName(getBrandName(make));
      } else {
        // treat as name
        const brand = brands.find((b) => b.name.toLowerCase() === make.toLowerCase());
        if (brand) {
          fetchModels(brand._id);
          setBrandName(brand.name);
        }
      }
    } else {
      setBrandName(null);
      setModels([]);
    }
  }, [searchParams, brands, getBrandName]);

  // Handle changes to 'model': update model name when models list or URL param changes
  useEffect(() => {
    const model = searchParams.get('model');
    if (model && !isNaN(model)) {
      setModelName(getModelName(model));
    } else if (model) {
      const modelObj = models.find((m) => m.model.toLowerCase() === model.toLowerCase());
      setModelName(modelObj ? modelObj.model : model);
    } else {
      setModelName(null);
    }
  }, [searchParams, models, getModelName]);

  // Use useMemo for sorted vehicles to avoid useEffect issues
  const sortedVehicles = useMemo(() => {
    let sorted = [...filteredVehicles];

    // Apply sorting based on sortOption
    switch (sortOption) {
      case 'h': // Price high to low
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'l': // Price low to high
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'm': // Make/model
        sorted.sort((a, b) => {
          const aName = `${a.brand || ''} ${a.model || ''}`.toLowerCase();
          const bName = `${b.brand || ''} ${b.model || ''}`.toLowerCase();
          return aName.localeCompare(bName);
        });
        break;
      case 'nis': // Latest Arrivals (newest first)
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rr': // Recently Reduced (by price change, would need backend support)
        // For now, default to latest arrivals
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredVehicles, sortOption]);

  // Calculate pagination using total count from backend
  const totalPages = Math.ceil(totalCount / VEHICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * VEHICLES_PER_PAGE + 1;
  // Use actual sortedVehicles length to show what's actually displayed
  const endIndex = startIndex + sortedVehicles.length - 1;
  const currentVehicles = sortedVehicles;

  console.log('DEBUG pagination:', {
    currentPage,
    startIndex,
    endIndex,
    totalCount,
    sortedVehiclesLength: sortedVehicles.length,
    VEHICLES_PER_PAGE,
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams, sortOption]); // If route moved away from /search, render nothing (but keep hooks order intact)
  if (location.pathname !== '/search') {
    return null;
  }

  const formatPrice = (price) => {
    if (price === 0 || !price) return 'Contact for price';
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : price;
    return `£${numPrice.toLocaleString()}`;
  };

  const formatFinance = (financeMonthly) => {
    if (!financeMonthly || financeMonthly === 0) return null;
    const numFinance =
      typeof financeMonthly === 'string'
        ? parseFloat(financeMonthly.replace(/,/g, ''))
        : financeMonthly;
    return `£${numFinance.toLocaleString()}`;
  };

  const getVehicleTitle = (vehicle) => {
    return vehicle.title || `${vehicle.brand} ${vehicle.model || 'Unknown Model'}`;
  };

  const getVehicleVariant = (vehicle) => {
    const parts = [];
    if (vehicle.year) parts.push(vehicle.year);
    if (vehicle.fuelType) parts.push(vehicle.fuelType);
    if (vehicle.transmission) parts.push(vehicle.transmission);
    if (vehicle.engineSize) parts.push(vehicle.engineSize);
    return parts.join(', ') || 'Details available on request';
  };

  const getSearchTitle = () => {
    const budgetSwitch = searchParams.get('budgetswitch');
    if (budgetSwitch === '1') {
      const min = searchParams.get('budgetmin');
      const max = searchParams.get('budgetmax');
      if (min && !max) return `Vehicles from £${min} per month`;
      if (!min && max) return `Vehicles within £${max} per month`;
      if (min && max) return `Vehicles £${min}–£${max} per month`;
    } else {
      const minPrice = searchParams.get('min_price');
      const maxPrice = searchParams.get('max_price');
      if (minPrice && !maxPrice) return `Vehicles from £${Number(minPrice).toLocaleString()}`;
      if (!minPrice && maxPrice) return `Vehicles up to £${Number(maxPrice).toLocaleString()}`;
      if (minPrice && maxPrice)
        return `Vehicles £${Number(minPrice).toLocaleString()}–£${Number(
          maxPrice
        ).toLocaleString()}`;
    }

    // If we have brand and model names, use them for the title
    if (brandName && modelName) {
      return `${brandName} ${modelName}`;
    } else if (brandName) {
      return `${brandName} Vehicles`;
    }

    return 'Search Results';
  };

  const getSearchSubtitle = () => {
    const budgetSwitch = searchParams.get('budgetswitch');
    if (budgetSwitch === '1') {
      const min = searchParams.get('budgetmin');
      const max = searchParams.get('budgetmax');
      if (min && !max) return `Vehicles available with monthly payments from £${min}`;
      if (!min && max) return `Vehicles available with monthly payments up to £${max}`;
      if (min && max) return `Vehicles available with monthly payments £${min}–£${max}`;
    } else {
      const minPrice = searchParams.get('min_price');
      const maxPrice = searchParams.get('max_price');
      if (minPrice && !maxPrice)
        return `Vehicles available with prices from £${Number(minPrice).toLocaleString()}`;
      if (!minPrice && maxPrice)
        return `Vehicles available with prices up to £${Number(maxPrice).toLocaleString()}`;
      if (minPrice && maxPrice)
        return `Vehicles available priced £${Number(minPrice).toLocaleString()}–£${Number(
          maxPrice
        ).toLocaleString()}`;
    }

    if (brandName && modelName) {
      return `Browse our selection of ${brandName} ${modelName} vehicles`;
    } else if (brandName) {
      return `Browse our selection of ${brandName} vehicles`;
    }

    return 'Vehicles matching your search criteria';
  };

  // Generate breadcrumb items based on search parameters
  const getBreadcrumbItems = () => {
    const items = [{ name: 'Home', href: '/', position: 1 }];

    // Always add "Showroom" as the second level
    items.push({ name: 'Showroom', href: '/used-cars', position: 2 });

    // Add brand if available
    if (brandName) {
      items.push({
        name: brandName,
        href: `/used-cars?make=${searchParams.get('make')}`,
        position: 3,
      });

      // Add model if available
      if (modelName) {
        items.push({
          name: `${brandName} ${modelName}`,
          href: `/search?${searchParams.toString()}`,
          position: 4,
        });
      }
    } else {
      // If no brand/model, add search results
      items.push({
        name: getSearchTitle(),
        href: null,
        position: 3,
      });
    }

    return items;
  };

  if (loading) {
    return (
      <div className="results-layout__listings snipcss-opdrK">
        <div className="mobile-filter-header">
          <div className="wrapper">
            <div className="container">
              <div className="mobile-filter-header__wrapper">
                <div className="mobile-filters">
                  <div className="mobile-filters__search">
                    <a id="mobile-open" className="btn" onClick={() => setIsDrawerOpen(true)}>
                      Refine Search
                    </a>
                  </div>
                </div>
                <div className="res-filt__sortform">
                  <select id="sort" className="select" value={sortOption} onChange={handleSortChange}>
                    <div className="custom-select ">
                      <span className="custom-select__value">Price (high to low)</span>
                      <span className="custom-select__arrow"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="breadcrumb clear-fix">
          <div className="wrapper">
            <div className="container">
              <ol
                className="breadcrumb__list"
                itemScope=""
                itemType="http://schema.org/BreadcrumbList"
              >
                {getBreadcrumbItems().map((item, index) => (
                  <li
                    key={index}
                    className="breadcrumb__listitem"
                    itemProp="itemListElement"
                    itemScope=""
                    itemType="http://schema.org/ListItem"
                  >
                    {item.href ? (
                      <a itemType="http://schema.org/Thing" itemProp="item" href={item.href}>
                        <span itemProp="name">{item.name}</span>
                      </a>
                    ) : (
                      <span itemProp="name">{item.name}</span>
                    )}
                    <meta itemProp="position" content={item.position} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div id="header-trigger"></div>
        <div className="res-filt res-filt--top">
          <div className="wrapper">
            <div className="container">
              <div className="res-filt__wrapper">
                <div className="res-filt__mobile-filters">
                  <div className="mobile-filters">
                    <div className="mobile-filters__search">
                      <a id="mobile-open" className="btn" onClick={() => setIsDrawerOpen(true)}>
                        Refine Search
                      </a>
                    </div>
                  </div>
                </div>
                <div className="res-filt__showing">
                  <em>Loading vehicles...</em>
                </div>
                <div className="res-filt__sortform">
                  <select id="sort" className="select" value={sortOption} onChange={handleSortChange}>
                    <div className="custom-select ">
                      <span className="custom-select__value">Price (high to low)</span>
                      <span className="custom-select__arrow"></span>
                    </div>
                  </div>
                </div>
                <div className="res-filt__layout-toggle mobile-hidden"></div>
              </div>
            </div>
          </div>
        </div>
        <div id="results">
          <div className="wrapper">
            <div className="container">
              <input type="hidden" id="button_class_hidden" value="button green full" />
              <div className="vehicle-results-list">
                <div className="results-vehicleresults grid-view">
                  {/* Loading placeholders */}
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="listing veh-loc--42 veh--7261668 lazy-background visible"
                    >
                      <div className="listing__wrapper">
                        <div className="listing__image">
                          <a href="#" title="Loading...">
                            <div className="maintain-ratio">
                              <div className="ratio-content">
                                <img
                                  data-src=""
                                  src="/images/placeholder.svg"
                                  alt="Loading..."
                                  className="vehicle-img--1 responsive-img"
                                />
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="listing-vehicle-spec">
                          <ul className="vehicle-spec">
                            <li>
                              <span className="vehicle-spec__icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18.175"
                                  height="18.175"
                                  viewBox="0 0 18.175 18.175"
                                >
                                  <g opacity="0.498">
                                    <path
                                      d="M16.045,1.42h-.852V0h-1.42V1.42H4.4V0H2.982V1.42H2.13A2.132,2.132,0,0,0,0,3.55v12.5a2.132,2.132,0,0,0,2.13,2.13H16.045a2.132,2.132,0,0,0,2.13-2.13V3.55A2.132,2.132,0,0,0,16.045,1.42Zm.71,14.625a.711.711,0,0,1-.71.71H2.13a.711.711,0,0,1-.71-.71V6.673H16.755Zm0-10.791H1.42V3.55a.711.711,0,0,1,.71-.71h.852V4.26H4.4V2.84h9.371V4.26h1.42V2.84h.852a.711.711,0,0,1,.71.71Z"
                                      fill="#2c2c2c"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">Loading...</span>
                            </li>
                            <li>
                              <span className="vehicle-spec__icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20.625"
                                  height="18.175"
                                  viewBox="0 0 20.625 18.175"
                                >
                                  <path
                                    d="M11.868,40.315a1.611,1.611,0,1,1-1.139-1.139L14.7,35.207l1.139,1.139ZM17.6,33.44A10.313,10.313,0,0,0,3.02,48.024l.57.57,3.418-3.418-.57-.57a5.482,5.482,0,0,1,5.643-9.062l1.237-1.237A7.093,7.093,0,0,0,4.762,45.143L3.616,46.289a8.7,8.7,0,1,1,13.393,0l-1.145-1.145a7.109,7.109,0,0,0,.872-7.416L15.5,38.962a5.492,5.492,0,0,1-1.314,5.643l-.57.57,3.418,3.418.57-.57a10.313,10.313,0,0,0,0-14.584Z"
                                    transform="translate(0 -30.419)"
                                    fill="#2c2c2c"
                                    opacity="0.496"
                                  ></path>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">Loading...</span>
                            </li>
                            <li>
                              <span className="vehicle-spec__icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18.175"
                                  height="18.175"
                                  viewBox="0 0 18.175 18.175"
                                >
                                  <g opacity="0.5">
                                    <path d="M15.512,0a2.662,2.662,0,0,0-.532,5.271V8.022a.533.533,0,0,1-.532.532H9.62V5.271a2.662,2.662,0,1,0-1.065,0V8.555H3.195V5.271a2.662,2.662,0,1,0-1.065,0V12.9a2.662,2.662,0,1,0,1.065,0V9.62h5.36V12.9a2.662,2.662,0,1,0,1.065,0V9.62h4.828a1.6,1.6,0,0,0,1.6-1.6V5.271A2.662,2.662,0,0,0,15.512,0ZM4.26,15.512a1.6,1.6,0,1,1-1.6-1.6A1.6,1.6,0,0,1,4.26,15.512ZM2.662,4.26a1.6,1.6,0,1,1,1.6-1.6A1.6,1.6,0,0,1,2.662,4.26Zm8.022,11.253a1.6,1.6,0,1,1-1.6-1.6A1.6,1.6,0,0,1,10.685,15.512ZM9.087,4.26a1.6,1.6,0,1,1,1.6-1.6A1.6,1.6,0,0,1,9.087,4.26Zm6.425,0a1.6,1.6,0,1,1,1.6-1.6A1.6,1.6,0,0,1,15.512,4.26Z"></path>
                                  </g>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">Loading...</span>
                            </li>
                            <li>
                              <span className="vehicle-spec__icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="21.339"
                                  height="15.972"
                                  viewBox="0 0 21.339 15.972"
                                >
                                  <path
                                    d="M21.28,36.235,20.247,33.9a.693.693,0,0,0-.634-.413H17.9a.693.693,0,0,0-.693.693v1.092h-.532v-.9a.693.693,0,0,0-.693-.693H14.139V31.787a.693.693,0,0,0-.693-.693H10.038v-.66h3.409a.693.693,0,0,0,0-1.386h-8.2a.693.693,0,0,0,0,1.386H8.652v.66H5.244a.693.693,0,0,0-.693.693v.576H3.031a.693.693,0,0,0-.693.693v3.718H1.386V33.055a.693.693,0,1,0-1.386,0v8.823a.693.693,0,0,0,1.386,0V38.159h.952v3.718a.693.693,0,0,0,.693.693H5.723l2.735,2.288a.693.693,0,0,0,.445.161h7.082a.693.693,0,0,0,.693-.693V42.438h.532V43.53a.693.693,0,0,0,.693.693h1.711a.693.693,0,0,0,.634-.413l1.033-2.338a.693.693,0,0,0,.059-.28V36.515A.692.692,0,0,0,21.28,36.235Zm-1.327,4.811-.791,1.792H18.6V41.745a.693.693,0,0,0-.693-.693H15.984a.693.693,0,0,0-.693.693v1.889H9.154L6.419,41.346a.693.693,0,0,0-.445-.161H3.724V33.748h1.52a.693.693,0,0,0,.693-.693v-.576h6.817V34.37a.693.693,0,0,0,.693.693h1.845v.9a.693.693,0,0,0,.693.693H17.9a.693.693,0,0,0,.693-.693V34.87h.567l.791,1.792Z"
                                    transform="translate(0 -29.048)"
                                    opacity="0.498"
                                  ></path>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">Loading...</span>
                            </li>
                            <li>
                              <span className="vehicle-spec__icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20.248"
                                  height="19.317"
                                  viewBox="0 0 20.248 19.317"
                                >
                                  <g transform="translate(0 0)" opacity="0.504">
                                    <path
                                      d="M55.663,194.85a2.191,2.191,0,1,0,2.191,2.191A2.193,2.193,0,0,0,55.663,194.85Zm0,3.19a1,1,0,1,1,1-1A1,1,0,0,1,55.663,198.04Z"
                                      transform="translate(-51.349 -187.58)"
                                    ></path>
                                    <path
                                      d="M153.373,325.171a2.191,2.191,0,1,0,2.191,2.191A2.193,2.193,0,0,0,153.373,325.171Zm0,3.19a1,1,0,1,1,1-1A1,1,0,0,1,153.373,328.361Z"
                                      transform="translate(-145.18 -312.727)"
                                    ></path>
                                    <path
                                      d="M19.7,24.155l-.012-.012L17.625,22.2a3.47,3.47,0,0,0,1.2-3.847,9.664,9.664,0,1,0-3.889,11.123,2.143,2.143,0,0,0-1.168-3.937,1.323,1.323,0,0,1-.355-2.6l3.633,3.85.012.012a1.867,1.867,0,1,0,2.64-2.64ZM12,26.025a2.556,2.556,0,0,0,1.765.7.95.95,0,0,1,.516,1.749,8.459,8.459,0,1,1,3.41-9.752,2.273,2.273,0,0,1-.956,2.637l-3.308-3.121a3.015,3.015,0,0,0,.62-.62L18.863,25A.675.675,0,0,1,18.858,25.955Z"
                                      transform="translate(0 -11.73)"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">Loading...</span>
                            </li>
                            <li>
                              <span className="vehicle-spec__icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15.937"
                                  height="17"
                                  viewBox="0 0 15.937 17"
                                >
                                  <g transform="translate(0)" opacity="0.501">
                                    <path
                                      d="M85.708,57.2a.531.531,0,0,0-.531-.531H79.865a.531.531,0,0,0-.531.531v4.25a.531.531,0,0,0,.531.531h5.313a.531.531,0,0,0,.531-.531Zm-1.062,3.719H80.4V57.729h4.25Z"
                                      transform="translate(-76.146 -54.01)"
                                      fill="#2c2c2c"
                                    ></path>
                                    <path
                                      d="M26.99,3.767,24.871,2.7a.53.53,0,1,0-.47.95l.807.4a.536.536,0,0,0-.05.184,1.708,1.708,0,0,0,1.05,1.5v6.473a.531.531,0,0,1-1.063,0V7.961a2.821,2.821,0,0,0-2.125-2.6V2.117A2.1,2.1,0,0,0,20.921,0H14.546A2.143,2.143,0,0,0,12.4,2.117v11.89l-.769.384a.531.531,0,0,0-.294.475v1.594A.56.56,0,0,0,11.89,17H23.577a.517.517,0,0,0,.506-.539V14.867a.531.531,0,0,0-.294-.475l-.769-.384V6.465a1.72,1.72,0,0,1,1.063,1.5v4.25a1.594,1.594,0,1,0,3.188,0V4.242A.52.52,0,0,0,26.99,3.767ZM23.021,15.937H12.4V15.2l.769-.384a.531.531,0,0,0,.294-.475V2.117a1.079,1.079,0,0,1,1.088-1.055h6.375a1.036,1.036,0,0,1,1.037,1.055V14.336a.531.531,0,0,0,.294.475l.769.384Z"
                                      transform="translate(-11.333)"
                                      fill="#2c2c2c"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">Loading...</span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing__info">
                          <div className="listing__wrapper">
                            <div className="listing__header">
                              <div className="listing__heading listing__heading--title">
                                Loading...
                              </div>
                              <div className="listing__heading listing__heading--subtitle">
                                Loading...
                              </div>
                            </div>
                            <div className="listing__prices">
                              <div className="listing__price listing__price--total">
                                <em className="figure">Loading...</em>
                              </div>
                              <a href="#finance-section">
                                <div className="listing__price listing__price--finance finance-available">
                                  Per month <em className="figure">Loading...</em>
                                </div>
                              </a>
                            </div>
                            <div className="listing__ctas">
                              <a href="#" className="btn">
                                View Details
                              </a>
                              <a
                                href="#finance-section"
                                className="btn btn--bordered finance-available"
                              >
                                Finance Me
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-layout__listings snipcss-opdrK">
        <div className="mobile-filter-header">
          <div className="wrapper">
            <div className="container">
              <div className="mobile-filter-header__wrapper">
                <div className="mobile-filters">
                  <div className="mobile-filters__search">
                    <a id="mobile-open" className="btn" onClick={() => setIsDrawerOpen(true)}>
                      Refine Search
                    </a>
                  </div>
                </div>
                <div className="res-filt__sortform">
                  <select id="sort" className="select" value={sortOption} onChange={handleSortChange}>
                    <div className="custom-select ">
                      <span className="custom-select__value">Price (high to low)</span>
                      <span className="custom-select__arrow"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="breadcrumb clear-fix">
          <div className="wrapper">
            <div className="container">
              <ol
                className="breadcrumb__list"
                itemScope=""
                itemType="http://schema.org/BreadcrumbList"
              >
                {getBreadcrumbItems().map((item, index) => (
                  <li
                    key={index}
                    className="breadcrumb__listitem"
                    itemProp="itemListElement"
                    itemScope=""
                    itemType="http://schema.org/ListItem"
                  >
                    {item.href ? (
                      <a itemType="http://schema.org/Thing" itemProp="item" href={item.href}>
                        <span itemProp="name">{item.name}</span>
                      </a>
                    ) : (
                      <span itemProp="name">{item.name}</span>
                    )}
                    <meta itemProp="position" content={item.position} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div
          className="error-message"
          style={{ textAlign: 'center', padding: '40px', background: '#fff' }}
        >
          <h3 style={{ color: '#dc3545', marginBottom: '20px' }}>Error Loading Search Results</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#171717',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Try Again
          </button>
        </div>
        <RefineSearchDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    );
  }

  return (
    <div className="results-layout__listings snipcss-opdrK">
      <div className="mobile-filter-header">
        <div className="wrapper">
          <div className="container">
            <div className="mobile-filter-header__wrapper">
              <div className="mobile-filters">
                <div className="mobile-filters__search">
                  <a id="mobile-open" className="btn" onClick={() => setIsDrawerOpen(true)}>
                    Refine Search
                  </a>
                </div>
              </div>
              <div className="res-filt__sortform">
                <select id="sort" className="select" value={sortOption} onChange={handleSortChange}>
                  <div className="custom-select ">
                    <span className="custom-select__value">Price (high to low)</span>
                    <span className="custom-select__arrow"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb clear-fix">
        <div className="wrapper">
          <div className="container">
            <ol
              className="breadcrumb__list"
              itemScope=""
              itemType="http://schema.org/BreadcrumbList"
            >
              {getBreadcrumbItems().map((item, index) => (
                <li
                  key={index}
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  {item.href ? (
                    <a itemType="http://schema.org/Thing" itemProp="item" href={item.href}>
                      <span itemProp="name">{item.name}</span>
                    </a>
                  ) : (
                    <span itemProp="name">{item.name}</span>
                  )}
                  <meta itemProp="position" content={item.position} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div id="header-trigger"></div>
      <div className="res-filt res-filt--top">
        <div className="wrapper">
          <div className="container">
            <div className="res-filt__wrapper">
              <div className="res-filt__mobile-filters">
                <div className="mobile-filters">
                  <div className="mobile-filters__search">
                    <a id="mobile-open" className="btn" onClick={() => setIsDrawerOpen(true)}>
                      Refine Search
                    </a>
                  </div>
                </div>
              </div>
              <div className="res-filt__showing">
                <em>
                  Currently showing{' '}
                  <strong>
                    {startIndex} - {endIndex}
                  </strong>{' '}
                  out of <strong>{totalCount}</strong>
                </em>
              </div>
              <div className="res-filt__sortform">
                <select id="sort" className="select" value={sortOption} onChange={handleSortChange}>
                  <div className="custom-select ">
                    <span className="custom-select__value">Price (high to low)</span>
                    <span className="custom-select__arrow"></span>
                  </div>
                </div>
              </div>
              {/* <div className="res-filt__layout-toggle mobile-hidden"></div> */}
            </div>
          </div>
        </div>
      </div>
      <div id="results">
        <div className="wrapper">
          <div className="container">
            <input type="hidden" id="button_class_hidden" value="button green full" />
            <div className="vehicle-results-list">
              <div className="results-vehicleresults grid-view">
                {currentVehicles.length > 0 ? (
                  currentVehicles.map((vehicle, index) => {
                    // Prefer to render two stacked images (primary + alternate)
                    // and let CSS handle the hover swap (same approach as Showroom.jsx).
                    const firstImageUrl =
                      vehicle.images && vehicle.images.length > 0
                        ? typeof vehicle.images[0] === 'string'
                          ? vehicle.images[0]
                          : vehicle.images[0].url
                        : `/images/placeholder.svg`;

                    const hasMultipleImages = vehicle.images && vehicle.images.length > 1;

                    const secondImageUrl = hasMultipleImages
                      ? typeof vehicle.images[1] === 'string'
                        ? vehicle.images[1]
                        : vehicle.images[1].url
                      : null;

                    return (
                      <div
                        key={vehicle.id || index}
                        className="listing veh-loc--42 veh--7261668 lazy-background visible"
                      >
                        <div className="listing__wrapper">
                          <div className="listing__image">
                            <Link
                              to={`/vehicle/${vehicle.brand?.toLowerCase()}/${vehicle.id || index}`}
                              title={getVehicleTitle(vehicle)}
                            >
                              <div className="maintain-ratio">
                                <div className="ratio-content">
                                  <img
                                    data-src={firstImageUrl}
                                    data-srcset=""
                                    src={firstImageUrl}
                                    alt={`View our ${getVehicleTitle(vehicle)}`}
                                    className="vehicle-img--1 responsive-img"
                                    onError={(e) => {
                                      e.target.src = '/images/placeholder.svg';
                                    }}
                                  />
                                  {hasMultipleImages && (
                                    <img
                                      data-src={secondImageUrl}
                                      data-srcset=""
                                      src={secondImageUrl}
                                      alt={`View our ${getVehicleTitle(vehicle)} - alternate view`}
                                      className="vehicle-img--2 responsive-img"
                                      onError={(e) => {
                                        e.target.src = '/images/placeholder.svg';
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="listing-vehicle-spec">
                            <ul className="vehicle-spec">
                              <li>
                                <span className="vehicle-spec__icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18.175"
                                    height="18.175"
                                    viewBox="0 0 18.175 18.175"
                                  >
                                    <g opacity="0.498">
                                      <path
                                        d="M16.045,1.42h-.852V0h-1.42V1.42H4.4V0H2.982V1.42H2.13A2.132,2.132,0,0,0,0,3.55v12.5a2.132,2.132,0,0,0,2.13,2.13H16.045a2.132,2.132,0,0,0,2.13-2.13V3.55A2.132,2.132,0,0,0,16.045,1.42Zm.71,14.625a.711.711,0,0,1-.71.71H2.13a.711.711,0,0,1-.71-.71V6.673H16.755Zm0-10.791H1.42V3.55a.711.711,0,0,1,.71-.71h.852V4.26H4.4V2.84h9.371V4.26h1.42V2.84h.852a.711.711,0,0,1,.71.71Z"
                                        fill="#2c2c2c"
                                      ></path>
                                    </g>
                                  </svg>
                                </span>
                                <span className="vehicle-spec__stat">{vehicle.year || 'N/A'}</span>
                              </li>
                              <li>
                                <span className="vehicle-spec__icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20.625"
                                    height="18.175"
                                    viewBox="0 0 20.625 18.175"
                                  >
                                    <path
                                      d="M11.868,40.315a1.611,1.611,0,1,1-1.139-1.139L14.7,35.207l1.139,1.139ZM17.6,33.44A10.313,10.313,0,0,0,3.02,48.024l.57.57,3.418-3.418-.57-.57a5.482,5.482,0,0,1,5.643-9.062l1.237-1.237A7.093,7.093,0,0,0,4.762,45.143L3.616,46.289a8.7,8.7,0,1,1,13.393,0l-1.145-1.145a7.109,7.109,0,0,0,.872-7.416L15.5,38.962a5.492,5.492,0,0,1-1.314,5.643l-.57.57,3.418,3.418.57-.57a10.313,10.313,0,0,0,0-14.584Z"
                                      transform="translate(0 -30.419)"
                                      fill="#2c2c2c"
                                      opacity="0.496"
                                    ></path>
                                  </svg>
                                </span>
                                <span className="vehicle-spec__stat">
                                  {vehicle.mileage ? `${vehicle.mileage.toLocaleString()}` : 'N/A'}
                                </span>
                              </li>
                              <li>
                                <span className="vehicle-spec__icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18.175"
                                    height="18.175"
                                    viewBox="0 0 18.175 18.175"
                                  >
                                    <g opacity="0.5">
                                      <path d="M15.512,0a2.662,2.662,0,0,0-.532,5.271V8.022a.533.533,0,0,1-.532.532H9.62V5.271a2.662,2.662,0,1,0-1.065,0V8.555H3.195V5.271a2.662,2.662,0,1,0-1.065,0V12.9a2.662,2.662,0,1,0,1.065,0V9.62h5.36V12.9a2.662,2.662,0,1,0,1.065,0V9.62h4.828a1.6,1.6,0,0,0,1.6-1.6V5.271A2.662,2.662,0,0,0,15.512,0ZM4.26,15.512a1.6,1.6,0,1,1-1.6-1.6A1.6,1.6,0,0,1,4.26,15.512ZM2.662,4.26a1.6,1.6,0,1,1,1.6-1.6A1.6,1.6,0,0,1,2.662,4.26Zm8.022,11.253a1.6,1.6,0,1,1-1.6-1.6A1.6,1.6,0,0,1,10.685,15.512ZM9.087,4.26a1.6,1.6,0,1,1,1.6-1.6A1.6,1.6,0,0,1,9.087,4.26Zm6.425,0a1.6,1.6,0,1,1,1.6-1.6A1.6,1.6,0,0,1,15.512,4.26Z"></path>
                                    </g>
                                  </svg>
                                </span>
                                <span className="vehicle-spec__stat">
                                  {vehicle.transmission || 'N/A'}
                                </span>
                              </li>
                              <li>
                                <span className="vehicle-spec__icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21.339"
                                    height="15.972"
                                    viewBox="0 0 21.339 15.972"
                                  >
                                    <path
                                      d="M21.28,36.235,20.247,33.9a.693.693,0,0,0-.634-.413H17.9a.693.693,0,0,0-.693.693v1.092h-.532v-.9a.693.693,0,0,0-.693-.693H14.139V31.787a.693.693,0,0,0-.693-.693H10.038v-.66h3.409a.693.693,0,0,0,0-1.386h-8.2a.693.693,0,0,0,0,1.386H8.652v.66H5.244a.693.693,0,0,0-.693.693v.576H3.031a.693.693,0,0,0-.693.693v3.718H1.386V33.055a.693.693,0,1,0-1.386,0v8.823a.693.693,0,0,0,1.386,0V38.159h.952v3.718a.693.693,0,0,0,.693.693H5.723l2.735,2.288a.693.693,0,0,0,.445.161h7.082a.693.693,0,0,0,.693-.693V42.438h.532V43.53a.693.693,0,0,0,.693.693h1.711a.693.693,0,0,0,.634-.413l1.033-2.338a.693.693,0,0,0,.059-.28V36.515A.692.692,0,0,0,21.28,36.235Zm-1.327,4.811-.791,1.792H18.6V41.745a.693.693,0,0,0-.693-.693H15.984a.693.693,0,0,0-.693.693v1.889H9.154L6.419,41.346a.693.693,0,0,0-.445-.161H3.724V33.748h1.52a.693.693,0,0,0,.693-.693v-.576h6.817V34.37a.693.693,0,0,0,.693.693h1.845v.9a.693.693,0,0,0,.693.693H17.9a.693.693,0,0,0,.693-.693V34.87h.567l.791,1.792Z"
                                    transform="translate(0 -29.048)"
                                    opacity="0.498"
                                  ></path>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">
                                {vehicle.engineSize || 'N/A'}
                              </span>
                            </li>
                            <li>
                              <span className="vehicle-spec__icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20.248"
                                  height="19.317"
                                  viewBox="0 0 20.248 19.317"
                                >
                                  <g transform="translate(0 0)" opacity="0.504">
                                    <path
                                      d="M55.663,194.85a2.191,2.191,0,1,0,2.191,2.191A2.193,2.193,0,0,0,55.663,194.85Zm0,3.19a1,1,0,1,1,1-1A1,1,0,0,1,55.663,198.04Z"
                                      transform="translate(-51.349 -187.58)"
                                    ></path>
                                    <path
                                      d="M153.373,325.171a2.191,2.191,0,1,0,2.191,2.191A2.193,2.193,0,0,0,153.373,325.171Zm0,3.19a1,1,0,1,1,1-1A1,1,0,0,1,153.373,328.361Z"
                                      transform="translate(-145.18 -312.727)"
                                    ></path>
                                    <path
                                      d="M19.7,24.155l-.012-.012L17.625,22.2a3.47,3.47,0,0,0,1.2-3.847,9.664,9.664,0,1,0-3.889,11.123,2.143,2.143,0,0,0-1.168-3.937,1.323,1.323,0,0,1-.355-2.6l3.633,3.85.012.012a1.867,1.867,0,1,0,2.64-2.64ZM12,26.025a2.556,2.556,0,0,0,1.765.7.95.95,0,0,1,.516,1.749,8.459,8.459,0,1,1,3.41-9.752,2.273,2.273,0,0,1-.956,2.637l-3.308-3.121a3.015,3.015,0,0,0,.62-.62L18.863,25A.675.675,0,0,1,18.858,25.955Z"
                                      transform="translate(0 -11.73)"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">{vehicle.color || 'N/A'}</span>
                            </li>
                            <li>
                              <span className="vehicle-spec__icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15.937"
                                  height="17"
                                  viewBox="0 0 15.937 17"
                                >
                                  <g transform="translate(0)" opacity="0.501">
                                    <path
                                      d="M85.708,57.2a.531.531,0,0,0-.531-.531H79.865a.531.531,0,0,0-.531.531v4.25a.531.531,0,0,0,.531.531h5.313a.531.531,0,0,0,.531-.531Zm-1.062,3.719H80.4V57.729h4.25Z"
                                      transform="translate(-76.146 -54.01)"
                                      fill="#2c2c2c"
                                    ></path>
                                    <path
                                      d="M26.99,3.767,24.871,2.7a.53.53,0,1,0-.47.95l.807.4a.536.536,0,0,0-.05.184,1.708,1.708,0,0,0,1.05,1.5v6.473a.531.531,0,0,1-1.063,0V7.961a2.821,2.821,0,0,0-2.125-2.6V2.117A2.1,2.1,0,0,0,20.921,0H14.546A2.143,2.143,0,0,0,12.4,2.117v11.89l-.769.384a.531.531,0,0,0-.294.475v1.594A.56.56,0,0,0,11.89,17H23.577a.517.517,0,0,0,.506-.539V14.867a.531.531,0,0,0-.294-.475l-.769-.384V6.465a1.72,1.72,0,0,1,1.063,1.5v4.25a1.594,1.594,0,1,0,3.188,0V4.242A.52.52,0,0,0,26.99,3.767ZM23.021,15.937H12.4V15.2l.769-.384a.531.531,0,0,0,.294-.475V2.117a1.079,1.079,0,0,1,1.088-1.055h6.375a1.036,1.036,0,0,1,1.037,1.055V14.336a.531.531,0,0,0,.294.475l.769.384Z"
                                      transform="translate(-11.333)"
                                      fill="#2c2c2c"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <span className="vehicle-spec__stat">
                                {vehicle.fuelType || 'N/A'}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing__info">
                          <div className="listing__wrapper">
                            <div className="listing__header">
                              <div className="listing__heading listing__heading--title">
                                {getVehicleTitle(vehicle)}
                              </div>
                              <div className="listing__heading listing__heading--subtitle">
                                {getVehicleVariant(vehicle)}
                              </div>
                            </div>
                            <div className="listing__prices">
                              <div className="listing__price listing__price--total">
                                <em className="figure">{formatPrice(vehicle.price)}</em>
                              </div>
                              {vehicle.financeMonthly && (
                                <Link
                                  to={`/vehicle/${vehicle.brand?.toLowerCase()}/${
                                    vehicle.id || index
                                  }#finance-section`}
                                >
                                  <div className="listing__price listing__price--finance finance-available">
                                    Per month{' '}
                                    <em className="figure">
                                      {formatFinance(vehicle.financeMonthly)}
                                      <span>p/m*.</span>
                                    </em>
                                  </div>
                                </Link>
                              )}
                            </div>
                            <div className="listing__ctas">
                              <Link
                                to={`/vehicle/${vehicle.brand?.toLowerCase()}/${
                                  vehicle.id || index
                                }`}
                                className="btn"
                              >
                                View Details
                              </Link>
                              <Link to="/contact" className="btn btn--bordered finance-available">
                                Finance Me
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  })
                ) : (
                  <div
                    className="no-vehicles"
                    style={{
                      gridColumn: '1 / -1',
                      textAlign: 'center',
                      padding: '60px 20px',
                      background: '#f2f2f2',
                      borderRadius: '10px',
                    }}
                  >
                    <h3 style={{ color: '#555', marginBottom: '20px' }}>
                      No vehicles found matching your search criteria
                    </h3>
                    <p style={{ color: '#888' }}>
                      Try adjusting your search parameters or browse our full inventory.
                    </p>
                    <Link
                      to="/used-cars"
                      style={{
                        display: 'inline-block',
                        marginTop: '20px',
                        padding: '10px 20px',
                        background: '#171717',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '3px',
                      }}
                    >
                      Browse All Used Cars
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <form>
              <input type="hidden" name="make" value="" id="makeid" />
              <input type="hidden" name="model" value="" id="modelid" />
              <input type="hidden" name="body" value="" id="bodyid" />
              <input type="hidden" name="vehicle_type" value="" id="vehicle_type" />
              <input type="hidden" name="vehicle_location" value="" id="vehicle_location" />
              <input type="hidden" name="location_name" value="" id="location_name" />
              <input type="hidden" name="location_path" value="used" id="location_path" />
              <input type="hidden" name="group_type" value="" id="group_type" />
            </form>
            <div className="res-filt res-filt--bottom">
              <div className="wrapper">
                <div className="res-filt__wrapper">
                  <div className="res-filt__pagination">
                    {totalPages > 1 ? (
                      <ol className="pagenavi">
                        {currentPage > 1 && (
                          <li className="pagenavi__prev">
                            <a
                              href="javascript:void(0)"
                              className="previous"
                              title="First Page of Results"
                              onClick={() => handlePageChange(1)}
                            >
                              <span className="ci ci-chevron-double-left-r"></span>
                            </a>
                          </li>
                        )}
                        {Array.from({ length: totalPages }, (_, index) => {
                          const pageNumber = index + 1; // Normal order
                          return (
                            <li key={pageNumber}>
                              <a
                                href="javascript:void(0)"
                                className={pageNumber === currentPage ? 'active' : ''}
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </a>
                            </li>
                          );
                        })}
                        {currentPage < totalPages && (
                          <li className="pagenavi__next">
                            <a
                              href="javascript:void(0)"
                              className="next"
                              title="Last Page of Results"
                              onClick={() => handlePageChange(totalPages)}
                            >
                              <span className="ci ci-chevron-double-right-r"></span>
                            </a>
                          </li>
                        )}
                      </ol>
                    ) : (
                      <ol className="pagenavi">
                        <li>
                          <a href="javascript:void(0)" className="active">
                            1
                          </a>
                        </li>
                      </ol>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="results-finance-section">
        <div className="wrapper">
          <div className="container">
            <div className="results-finance-example vehicle-7261668">
              <div className="results-finance-example__title">Finance Representative</div>
              <div className="results-finance-figure results-finance-figure--product">
                <span className="label">Product</span>
                <span className="stat">HP</span>
              </div>
              <div className="results-finance-figure results-finance-figure--price">
                <span className="label">Cash Price</span>
                <span className="stat">£6,990.00</span>
              </div>
              <div className="results-finance-figure results-finance-figure--deposit">
                <span className="label">Deposit</span>
                <span className="stat">£699.00</span>
              </div>
              <div className="results-finance-figure results-finance-figure--credit-amount">
                <span className="label">Total Amount of Credit</span>
                <span className="stat">£6,291.00</span>
              </div>
              <div className="results-finance-figure results-finance-figure--total-payable">
                <span className="label">Total Amount Payable</span>
                <span className="stat">£8,962.00</span>
              </div>
              <div className="results-finance-figure results-finance-figure--acceptance-fee">
                <span className="label">Administration Fee</span>
                <span className="stat">£0.00</span>
              </div>
              <div className="results-finance-figure results-finance-figure--option-fee">
                <span className="label">Option to Purchase Fee</span>
                <span className="stat">£1.00</span>
              </div>
              <div className="results-finance-figure results-finance-figure--interest_-rate">
                <span className="label">Fixed Rate</span>
                <span className="stat">11.29%</span>
              </div>
              <div className="results-finance-figure results-finance-figure--term">
                <span className="label">Duration of Agreement</span>
                <span className="stat">60</span>
              </div>
              <div className="results-finance-figure results-finance-figure--first-payment">
                <span className="label">Initial Payment</span>
                <span className="stat">£137.70</span>
              </div>
              <div className="results-finance-figure results-finance-figure--monthly-payment">
                <span className="label">Monthly Payment</span>
                <span className="stat">£137.70 x 58</span>
              </div>
              <div className="results-finance-figure results-finance-figure--final-payment">
                <span className="label">Final Payment</span>
                <span className="stat">£138.70</span>
              </div>
              <div className="results-finance-figure results-finance-figure--apr">
                <span className="label">APR Representative</span>
                <span className="stat">11.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="results-accordion-block">
        <div className="wrapper">
          <div className="container">
            <details className="results-accordion results-accordion--vehicles" open="">
              <summary>Search Results</summary>
              <ul className="makesmodels__list makesmodels__list--brand" role="menu">
                {brands.map((brand) => (
                  <li
                    key={brand._id}
                    className="makesmodels__listitem makesmodels__listitem--brand"
                  >
                    <a
                      href={`/used/cars/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="makesmodels__listitem__link"
                      title={`Used ${brand.name}`}
                      role="menuitem"
                    >
                      {' '}
                      Used {brand.name}{' '}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
            <details className="results-accordion results-accordion--webzation" open="">
              <summary>
                <h1>{getSearchTitle()}</h1>
              </summary>
              <p>
                {getSearchSubtitle()}. Take the opportunity to browse our current range online
                before contacting a member of the showroom team to find out more. Our friendly and
                knowledgeable staff will be more than happy to answer any questions and provide
                advice and guidance when necessary. Alternatively, why not pay a visit to our
                showroom in person and take a closer look at the selection of vehicles for sale.
              </p>
        </div>
      </div>
      <div className="results-accordion-block">
        <div className="wrapper">
          <div className="container">
            <details className="results-accordion results-accordion--vehicles" open="">
              <summary>Search Results</summary>
              <ul className="makesmodels__list makesmodels__list--brand" role="menu">
                {brands.map((brand) => (
                  <li
                    key={brand._id}
                    className="makesmodels__listitem makesmodels__listitem--brand"
                  >
                    <a
                      href={`/used/cars/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="makesmodels__listitem__link"
                      title={`Used ${brand.name}`}
                      role="menuitem"
                    >
                      {' '}
                      Used {brand.name}{' '}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
            <details className="results-accordion results-accordion--webzation" open="">
              <summary>
                <h1>{getSearchTitle()}</h1>
              </summary>
              <p>
                {getSearchSubtitle()}. Take the opportunity to browse our current range online
                before contacting a member of the showroom team to find out more. Our friendly and
                knowledgeable staff will be more than happy to answer any questions and provide
                advice and guidance when necessary. Alternatively, why not pay a visit to our
                showroom in person and take a closer look at the selection of vehicles for sale.
              </p>
              <p></p>
              <p>
                Every effort has been made to ensure the accuracy of the above vehicles information
                but errors may occur. Please check with a salesperson.
              </p>
              <p>
                The representative finance examples shown above are for illustrative purposes only.
                Fees, rates and monthly payments may change subject to underwriting decision.
              </p>
              <p>
                <strong>Representative APR 11.9 %</strong>
              </p>
              <p>
                <em>
                  *Fees are already accounted for within the payments displayed and are included
                  within the total amount payable.
                </em>
              </p>
              <p>
                <em>
                  Finance is available to UK residents aged 18 years or older, subject to status.
                  Terms &amp; Conditions apply. Indemnities may be required. Other finance offers
                  may be available but cannot be used in conjunction with this offer. We work with a
                  number of carefully selected credit providers who may be able to offer you finance
                  for your purchase, commission may be received. We are only able to offer finance
                  products from these providers. Postal Address:{' '}
                  <strong>
                    S James Prestige Limited, Wakeley Works, Bourne Road, Essendine, Lincolnshire
                    PE9 4LT
                  </strong>
                  . Find contact details{' '}
                  <a href="/contact.php" title="Contact Details">
                    here.
                  </a>
                </em>
              </p>
            </details>
          </div>
        </div>
      </div>
      <RefineSearchDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default Search;

