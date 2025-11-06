import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './RefineSearchDrawer.css';

const RefineSearchDrawer = ({ isOpen, onClose }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine vehicle type based on current path
  const getVehicleTypeFromPath = (pathname) => {
    if (pathname.includes('/used/cars') || pathname.includes('/used-cars')) {
      return 'cars'; // Exclude vans
    } else if (pathname.includes('/used/vans') || pathname.includes('/used-vans')) {
      return 'vans'; // Only vans
    }
    return null; // No specific type filter
  };

  const currentVehicleType = getVehicleTypeFromPath(location.pathname);

  // Loading states
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  // const [loadingTrims, setLoadingTrims] = useState(false);

  // Dynamic data
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  // const [availableTrims, setAvailableTrims] = useState([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(false);
  const [priceRanges, setPriceRanges] = useState({
    min: 0,
    max: 150000,
    financeMin: 0,
    financeMax: 2000,
  });

  // Dynamic options for lower fields
  const [availableBodyStyles, setAvailableBodyStyles] = useState([]);
  const [availableDoors, setAvailableDoors] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableTransmissions, setAvailableTransmissions] = useState([]);
  const [availableFuelTypes, setAvailableFuelTypes] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    // trim: '', // COMMENTED OUT
    body: '',
    doors: '',
    body_colour: '',
    gearbox: '',
    fuel_type: '',
    seats: '',
    budgetswitch: '0', // 0 = price, 1 = finance
    budgetmin: '',
    budgetmax: '',
  });

  // Initialize form with current search params
  useEffect(() => {
    setFormData({
      make: searchParams.get('make') || '',
      model: searchParams.get('model') || '',
      // trim: searchParams.get('trim') || '', // COMMENTED OUT
      body: searchParams.get('body_type') || '',
      doors: searchParams.get('doors') || '',
      body_colour: searchParams.get('color') || '',
      gearbox: searchParams.get('transmission') || '',
      fuel_type: searchParams.get('fuel_type') || '',
      seats: searchParams.get('seats') || '',
      budgetswitch: searchParams.get('budgetswitch') || '0',
      budgetmin: searchParams.get('budgetmin') || searchParams.get('min_price') || '',
      budgetmax: searchParams.get('budgetmax') || searchParams.get('max_price') || '',
    });
  }, [searchParams]);

  // Fetch unique options for dynamic fields on mount
  useEffect(() => {
    const fetchUniqueOptions = async () => {
      try {
        const params = new URLSearchParams();

        // Add type filter based on current path - this is critical for all dropdown options
        if (currentVehicleType === 'cars') {
          params.append('type', 'cars');
        } else if (currentVehicleType === 'vans') {
          params.append('type', 'vans');
        }

        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || 'http://localhost:5000'
          }/api/client/vehicles/filter?${params.toString()}&pageSize=1000`
        );
        const result = await response.json();
        if (result.success && result.data) {
          const vehicles = result.data;
          const bodyStyles = [...new Set(vehicles.map((v) => v.bodyStyle).filter(Boolean))].sort();
          const doors = [...new Set(vehicles.map((v) => v.doors).filter(Boolean))].sort();
          const colors = [...new Set(vehicles.map((v) => v.color).filter(Boolean))].sort();
          const transmissions = [
            ...new Set(vehicles.map((v) => v.transmission).filter(Boolean)),
          ].sort();
          const fuelTypes = [...new Set(vehicles.map((v) => v.fuelType).filter(Boolean))].sort();
          const seats = [...new Set(vehicles.map((v) => v.seats).filter(Boolean))].sort();
          setAvailableBodyStyles(bodyStyles);
          setAvailableDoors(doors);
          setAvailableColors(colors);
          setAvailableTransmissions(transmissions);
          setAvailableFuelTypes(fuelTypes);
          setAvailableSeats(seats);
        }
      } catch (error) {
        console.error('Error fetching unique options:', error);
      }
    };

    fetchUniqueOptions();
  }, [currentVehicleType]);

  // Fetch brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      setLoadingBrands(true);
      try {
        const params = new URLSearchParams();

        // Add type filter based on current path
        if (currentVehicleType === 'cars') {
          params.append('type', 'cars');
        } else if (currentVehicleType === 'vans') {
          params.append('type', 'vans');
        }

        const queryString = params.toString();
        const url = queryString
          ? `${
              import.meta.env.VITE_API_URL || 'http://localhost:5000'
            }/api/client/brands?${queryString}`
          : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/client/brands`;

        const response = await fetch(url);
        const result = await response.json();
        if (result.success && result.data) {
          setAvailableBrands(result.data);
        } else {
          console.error('Failed to fetch brands:', result);
          setAvailableBrands([]);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        setAvailableBrands([]);
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, [currentVehicleType]);

  // Function to update price ranges based on available vehicles
  const updatePriceRanges = useCallback(
    async (brandId, modelId) => {
      try {
        // Fetch vehicles for this brand/model combination to get price ranges
        const params = new URLSearchParams();
        params.append('make', brandId);
        if (modelId) {
          params.append('model', modelId);
        }

        // Add type filter based on current path
        if (currentVehicleType === 'cars') {
          params.append('type', 'cars');
        } else if (currentVehicleType === 'vans') {
          params.append('type', 'vans');
        }

        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || 'http://localhost:5000'
          }/api/client/vehicles/recent?${params.toString()}`
        );
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          const vehicles = result.data;

          // Calculate price ranges
          const prices = vehicles
            .map((v) => v.price)
            .filter((p) => p && p > 0)
            .sort((a, b) => a - b);

          const financePrices = vehicles
            .map((v) => v.financeMonthly)
            .filter((p) => p && p > 0)
            .sort((a, b) => a - b);

          const minPrice = prices.length > 0 ? Math.floor(prices[0] / 1000) * 1000 : 0;
          const maxPrice =
            prices.length > 0 ? Math.ceil(prices[prices.length - 1] / 1000) * 1000 : 150000;
          const minFinance = financePrices.length > 0 ? Math.floor(financePrices[0] / 50) * 50 : 0;
          const maxFinance =
            financePrices.length > 0
              ? Math.ceil(financePrices[financePrices.length - 1] / 50) * 50
              : 2000;

          setPriceRanges({
            min: Math.max(0, minPrice),
            max: Math.min(150000, maxPrice),
            financeMin: Math.max(0, minFinance),
            financeMax: Math.min(2000, maxFinance),
          });
        } else {
          // Reset to defaults if no vehicles found
          setPriceRanges({
            min: 0,
            max: 150000,
            financeMin: 0,
            financeMax: 2000,
          });
        }
      } catch (error) {
        console.error('Error updating price ranges:', error);
        setPriceRanges({ min: 0, max: 150000, financeMin: 0, financeMax: 2000 });
      }
    },
    [currentVehicleType]
  );

  // Fetch models when brand changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!formData.make) {
        setAvailableModels([]);
        setPriceRanges({
          min: 0,
          max: 150000,
          financeMin: 0,
          financeMax: 2000,
        });
        return;
      }

      setLoadingModels(true);
      try {
        const params = new URLSearchParams();
        params.append('brand', formData.make);

        // Add type filter based on current path
        if (currentVehicleType === 'cars') {
          params.append('type', 'cars');
        } else if (currentVehicleType === 'vans') {
          params.append('type', 'vans');
        }

        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || 'http://localhost:5000'
          }/api/client/models?${params.toString()}`
        );
        const result = await response.json();
        if (result.success) {
          setAvailableModels(result.data);
        }

        // Fetch price ranges for this brand
        await updatePriceRanges(formData.make, null);
      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, [formData.make, currentVehicleType, updatePriceRanges]);

  // Fetch trims when model changes - COMMENTED OUT FOR NOW
  // useEffect(() => {
  //   const fetchTrims = async () => {
  //     if (!formData.make || !formData.model) {
  //       setAvailableTrims([]);
  //       return;
  //     }

  //     setLoadingTrims(true);
  //     try {
  //       // Fetch vehicles for this brand/model combination to get available trims
  //       const params = new URLSearchParams();
  //       params.append('make', formData.make);
  //       params.append('model', formData.model);
  //       params.append('count_only', 'false');

  //       // Add type filter based on current path
  //       if (currentVehicleType === 'cars') {
  //         params.append('type', 'cars');
  //       } else if (currentVehicleType === 'vans') {
  //         params.append('type', 'vans');
  //       }

  //       const response = await fetch(
  //         `${
  //           import.meta.env.VITE_API_URL || 'http://localhost:5000'
  //         }/api/client/vehicles/filter?${params.toString()}`
  //       );
  //       const result = await response.json();

  //       if (result.success && result.data) {
  //         // Extract unique trims from the vehicles
  //         const trims = [
  //           ...new Set(
  //             result.data
  //               .map((vehicle) => {
  //                 // Check various trim fields
  //                 return (
  //                   vehicle.trim ||
  //                   (vehicle.formData &&
  //                     (vehicle.formData.trim ||
  //                       vehicle.formData.variant ||
  //                       vehicle.formData.modelVariant)) ||
  //                   ''
  //                 );
  //               })
  //               .filter((trim) => trim && trim.trim() !== '')
  //           ),
  //         ];

  //         setAvailableTrims(trims.sort());
  //       }
  //     } catch (error) {
  //       console.error('Error fetching trims:', error);
  //       setAvailableTrims([]);
  //     } finally {
  //       setLoadingTrims(false);
  //     }
  //   };

  //   fetchTrims();
  // }, [formData.make, formData.model, currentVehicleType]);

  // Function to update vehicle count based on current filters
  const updateVehicleCount = useCallback(async () => {
    setLoadingCount(true);
    try {
      const params = new URLSearchParams();

      // Add current filter values
      if (formData.make) params.append('make', formData.make);
      if (formData.model) params.append('model', formData.model);
      if (formData.trim) params.append('trim', formData.trim);
      if (formData.body) params.append('body_type', formData.body);
      if (formData.doors) params.append('doors', formData.doors);
      if (formData.body_colour) params.append('color', formData.body_colour);
      if (formData.gearbox) params.append('transmission', formData.gearbox);
      if (formData.fuel_type) params.append('fuel_type', formData.fuel_type);
      if (formData.seats) params.append('seats', formData.seats);

      // Add price/finance filters
      if (formData.budgetswitch === '1') {
        if (formData.budgetmin) params.append('budgetmin', formData.budgetmin);
        if (formData.budgetmax) params.append('budgetmax', formData.budgetmax);
        params.append('budgetswitch', '1');
      } else {
        if (formData.budgetmin) params.append('min_price', formData.budgetmin);
        if (formData.budgetmax) params.append('max_price', formData.budgetmax);
      }

      // Add type filter based on current path
      if (currentVehicleType === 'cars') {
        params.append('type', 'cars');
      } else if (currentVehicleType === 'vans') {
        params.append('type', 'vans');
      }

      params.append('count_only', 'true');

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/client/vehicles/filter?${params.toString()}`
      );
      const result = await response.json();

      if (result.success) {
        setVehicleCount(result.count || 0);
      } else {
        setVehicleCount(0);
      }
    } catch (error) {
      console.error('Error fetching vehicle count:', error);
      setVehicleCount(0);
    } finally {
      setLoadingCount(false);
    }
  }, [formData, currentVehicleType]);

  // Update vehicle count when filters change
  useEffect(() => {
    updateVehicleCount();
  }, [updateVehicleCount]);

  // Function to update price ranges based on available vehicles

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Clear model when make changes
      if (name === 'make') {
        updated.model = '';
        // updated.trim = ''; // COMMENTED OUT
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build new search params
    const newParams = new URLSearchParams();

    // Copy existing params that aren't filter-related
    for (let [key, value] of searchParams) {
      if (
        ![
          'make',
          'model',
          'trim',
          'body_type',
          'doors',
          'color',
          'transmission',
          'fuel_type',
          'seats',
          'budgetswitch',
          'budgetmin',
          'budgetmax',
          'min_price',
          'max_price',
          'type',
        ].includes(key)
      ) {
        newParams.set(key, value);
      }
    }

    // Add form values if they have values
    if (formData.make) newParams.set('make', formData.make);
    if (formData.model) newParams.set('model', formData.model);
    // if (formData.trim) newParams.set('trim', formData.trim); // COMMENTED OUT
    if (formData.body) newParams.set('body_type', formData.body);
    if (formData.doors) newParams.set('doors', formData.doors);
    if (formData.body_colour) newParams.set('color', formData.body_colour);
    if (formData.gearbox) newParams.set('transmission', formData.gearbox);
    if (formData.fuel_type) newParams.set('fuel_type', formData.fuel_type);
    if (formData.seats) newParams.set('seats', formData.seats);
    if (formData.budgetswitch !== '0') newParams.set('budgetswitch', formData.budgetswitch);
    if (formData.budgetmin) {
      if (formData.budgetswitch === '1') {
        newParams.set('budgetmin', formData.budgetmin);
      } else {
        newParams.set('min_price', formData.budgetmin);
      }
    }
    if (formData.budgetmax) {
      if (formData.budgetswitch === '1') {
        newParams.set('budgetmax', formData.budgetmax);
      } else {
        newParams.set('max_price', formData.budgetmax);
      }
    }

    // Add type filter based on current path
    if (currentVehicleType === 'cars') {
      newParams.set('type', 'cars');
    } else if (currentVehicleType === 'vans') {
      newParams.set('type', 'vans');
    }

    // Navigate to search with appropriate path based on type
    let searchPath = '/search';
    if (currentVehicleType === 'cars') {
      searchPath = '/used-cars';
    } else if (currentVehicleType === 'vans') {
      searchPath = '/used-vans';
    }

    navigate(`${searchPath}?${newParams.toString()}`);
    onClose();
  };

  const handleClear = () => {
    setFormData({
      make: '',
      model: '',
      // trim: '', // COMMENTED OUT
      body: '',
      doors: '',
      body_colour: '',
      gearbox: '',
      fuel_type: '',
      seats: '',
      budgetswitch: '0',
      budgetmin: '',
      budgetmax: '',
    });
  };

  // Reset filters when drawer closes
  const handleClose = () => {
    handleClear(); // Reset form data
    onClose(); // Call the parent's onClose
  };

  // Helper function to generate price options
  const generatePriceOptions = (min, max, step) => {
    const options = [];
    const start = Math.floor(min / step) * step;
    const end = Math.ceil(max / step) * step;

    for (let price = start; price <= end; price += step) {
      if (price >= 1000) {
        options.push({
          value: price,
          label: `To £${price.toLocaleString()}`,
        });
      }
    }

    // Ensure we have at least some default options
    if (options.length === 0) {
      return [
        { value: 10000, label: 'To £10,000' },
        { value: 20000, label: 'To £20,000' },
        { value: 30000, label: 'To £30,000' },
        { value: 50000, label: 'To £50,000' },
        { value: 75000, label: 'To £75,000' },
        { value: 100000, label: 'To £100,000' },
        { value: 150000, label: 'To £150,000' },
      ];
    }

    return options;
  };

  // Helper function to generate finance options
  const generateFinanceOptions = (min, max, step) => {
    const options = [];
    const start = Math.floor(min / step) * step;
    const end = Math.ceil(max / step) * step;

    for (let amount = start; amount <= end; amount += step) {
      if (amount >= 50) {
        options.push({
          value: amount,
          label: `To £${amount}/month`,
        });
      }
    }

    // Ensure we have at least some default options
    if (options.length === 0) {
      return [
        { value: 100, label: 'To £100/month' },
        { value: 200, label: 'To £200/month' },
        { value: 300, label: 'To £300/month' },
        { value: 400, label: 'To £400/month' },
        { value: 500, label: 'To £500/month' },
        { value: 750, label: 'To £750/month' },
        { value: 1000, label: 'To £1,000/month' },
        { value: 1500, label: 'To £1,500/month' },
        { value: 2000, label: 'To £2,000/month' },
      ];
    }

    return options;
  };

  // Filter models based on selected make
  const filteredModels = availableModels;

  return (
    <>
      <div className={`results-layout__search ${isOpen ? 'toggled' : ''}`}>
        <div data-advanced-search="main" className="o-search o-search--results">
          <em className="search-block__title">Refine Search</em>
          <a id="mobile-close" onClick={handleClose}>
            Close ×
          </a>
          <form method="get" action="/search" onSubmit={handleSubmit}>
            <input type="hidden" id="search-instance" value="search" />
            <input type="hidden" value={formData.budgetswitch} name="budgetswitch" />
            <input type="hidden" value="car" name="vehicle_type" />
            <fieldset className="fieldset fieldset--search">
              <div className="fieldset__wrapper">
                <div className="form-group form-group--make">
                  <select
                    name="make"
                    id="make"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,budgetmin,budgetmax,yearmin,yearmax"
                    className=""
                    value={formData.make}
                    onChange={handleInputChange}
                    disabled={loadingBrands}
                  >
                    <option value="">
                      {loadingBrands
                        ? 'Loading...'
                        : availableBrands.length > 0
                        ? `Any make (${availableBrands.length})`
                        : 'Any make'}
                    </option>
                    {availableBrands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-group--model">
                  <select
                    name="model"
                    id="model"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,make,trim,body,gearbox,doors,body_colour,fuel_type,budgetmin,budgetmax,seats,yearmin,yearmax"
                    className="default"
                    value={formData.model}
                    onChange={handleInputChange}
                    disabled={!formData.make || loadingModels}
                  >
                    <option value="">
                      {loadingModels
                        ? 'Loading...'
                        : filteredModels.length > 0
                        ? `Any model (${filteredModels.length})`
                        : 'Any model'}
                    </option>
                    {filteredModels.map((model) => (
                      <option key={model._id} value={model._id}>
                        {model.model}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Trim field commented out for now */}
                {/* <div className="form-group form-group--trim">
                  <select
                    name="trim"
                    id="trim"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,make,model,variant,body,gearbox,doors,body_colour,fuel_type,budgetmin,budgetmax,seats,yearmin,yearmax"
                    className="default"
                    value={formData.trim}
                    onChange={handleInputChange}
                    disabled={!formData.make || !formData.model || loadingTrims}
                  >
                    <option value="">
                      {loadingTrims
                        ? 'Loading...'
                        : availableTrims.length > 0
                        ? `Any trim (${availableTrims.length})`
                        : 'Any trim'}
                    </option>
                    {availableTrims.map((trim) => (
                      <option key={trim} value={trim}>
                        {trim}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="form-group form-group--body">
                  <select
                    name="body"
                    id="body"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,make,model,variant,trim,gearbox,doors,body_colour,fuel_type,budgetmin,budgetmax,seats,yearmin,yearmax"
                    className="default"
                    value={formData.body}
                    onChange={handleInputChange}
                  >
                    <option value="">{`Any bodystyle (${availableBodyStyles.length})`}</option>
                    {availableBodyStyles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-group--doors">
                  <select
                    name="doors"
                    id="doors"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,gearbox,body_colour,fuel_type,budgetmin,budgetmax,seats,yearmin,yearmax"
                    className="default"
                    value={formData.doors}
                    onChange={handleInputChange}
                  >
                    <option value="">{`Any doors (${availableDoors.length})`}</option>
                    {availableDoors.map((door) => (
                      <option key={door} value={door}>
                        {door} Doors
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-group--body_colour">
                  <select
                    name="body_colour"
                    id="body_colour"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,gearbox,doors,fuel_type,budgetmin,budgetmax,seats,yearmin,yearmax"
                    className="default"
                    value={formData.body_colour}
                    onChange={handleInputChange}
                  >
                    <option value="">{`Any colour (${availableColors.length})`}</option>
                    {availableColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-group--gearbox">
                  <select
                    name="gearbox"
                    id="gearbox"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,doors,body_colour,fuel_type,budgetmin,budgetmax,seats,yearmin,yearmax"
                    className="default"
                    value={formData.gearbox}
                    onChange={handleInputChange}
                  >
                    <option value="">{`Any transmission (${availableTransmissions.length})`}</option>
                    {availableTransmissions.map((transmission) => (
                      <option key={transmission} value={transmission}>
                        {transmission}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-group--fuel_type">
                  <select
                    name="fuel_type"
                    id="fuel_type"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,gearbox,doors,body_colour,budgetmin,budgetmax,seats,yearmin,yearmax"
                    className="default"
                    value={formData.fuel_type}
                    onChange={handleInputChange}
                  >
                    <option value="">{`Any fuel type (${availableFuelTypes.length})`}</option>
                    {availableFuelTypes.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-group--seats">
                  <select
                    name="seats"
                    id="seats"
                    data-search-field="main"
                    data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,gearbox,doors,body_colour,fuel_type,budgetmin,budgetmax,yearmin,yearmax"
                    className="default"
                    value={formData.seats}
                    onChange={handleInputChange}
                  >
                    <option value="">{`Any seats (${availableSeats.length})`}</option>
                    {availableSeats.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat} Seats
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
            <fieldset className="fieldset fieldset--price">
              <div className="fieldset__wrapper">
                <div className="budget-toggle">
                  <div className="budget-toggle__wrapper">
                    <div className="price">Price</div>
                    <div className="form-group form-group--budgetswitch">
                      <input
                        type="checkbox"
                        className="a-toggle"
                        name="budgetswitch"
                        id="budgetswitch"
                        data-search-field=""
                        value="1"
                        checked={formData.budgetswitch === '1'}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            budgetswitch: e.target.checked ? '1' : '0',
                            budgetmin: '', // Clear min when switching between price/finance
                            budgetmax: '', // Clear max when switching between price/finance
                          }))
                        }
                      />
                      <label
                        htmlFor="budgetswitch"
                        data-checked="Finance"
                        data-unchecked="Price"
                      ></label>
                    </div>
                    <div className="finance">Finance</div>
                  </div>
                </div>
                <div className="form-group form-group--budgetmin">
                  <select
                    name="budgetmin"
                    id="budgetmin"
                    data-search-field="aside"
                    data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,gearbox,doors,body_colour,fuel_type,seats,yearmin,yearmax"
                    className=""
                    value={formData.budgetmin}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      {formData.budgetswitch === '1' ? 'Budget (Min)' : 'Price (Min)'}
                    </option>
                    {formData.budgetswitch === '1'
                      ? generateFinanceOptions(
                          priceRanges.financeMin,
                          priceRanges.financeMax,
                          50
                        ).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      : generatePriceOptions(priceRanges.min, priceRanges.max, 1000).map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          )
                        )}
                  </select>
                </div>
                <div className="form-group form-group--budgetmax">
                  <select
                    name="budgetmax"
                    id="budgetmax"
                    data-search-field="aside"
                    data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,gearbox,doors,body_colour,fuel_type,seats,yearmin,yearmax"
                    className=""
                    value={formData.budgetmax}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      {formData.budgetswitch === '1' ? 'Budget (Max)' : 'Price (Max)'}
                    </option>
                    {formData.budgetswitch === '1'
                      ? generateFinanceOptions(
                          priceRanges.financeMin,
                          priceRanges.financeMax,
                          50
                        ).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      : generatePriceOptions(priceRanges.min, priceRanges.max, 1000).map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          )
                        )}
                  </select>
                </div>
              </div>
            </fieldset>
            <fieldset className="fieldset fieldset--button">
              <div className="fieldset__wrapper">
                <div className="button-group button-group--search">
                  <button type="submit" className="a-btn search-button">
                    Search <span data-search-total="">{loadingCount ? '...' : vehicleCount}</span>{' '}
                    vehicles
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default RefineSearchDrawer;
