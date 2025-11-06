import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const [budgetSwitch, setBudgetSwitch] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [searchForm, setSearchForm] = useState({
    make: "",
    model: "",
    budgetmin: "",
    budgetmax: "",
  });
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);

  // Add state for dynamic price ranges based on selected brand/model
  const [priceRanges, setPriceRanges] = useState({
    min: 0,
    max: 150000,
    financeMin: 0,
    financeMax: 2000,
  });

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&crop=center",
      alt: "Luxury Car 1",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1714348938110-d3692bc3716a?w=1920&h=1080&fit=crop&crop=center",
      alt: "Luxury Car 2",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1677339059244-8c6cefec8415?w=1920&h=1080&fit=crop&crop=center",
      alt: "Luxury Car 3",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&h=1080&fit=crop&crop=center",
      alt: "Luxury Car 4",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&h=1080&fit=crop&crop=center",
      alt: "Luxury Car 5",
    },
  ];

  useEffect(() => {
    // Preload images to prevent black screens during transitions
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides]);

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/client/brands`
        );
        const result = await response.json();
        if (result.success) {
          setBrands(result.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, []);

  // Fetch models when brand changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!searchForm.make) {
        setModels([]);
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
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/client/models?brand=${searchForm.make}`
        );
        const result = await response.json();
        if (result.success) {
          setModels(result.data);
        }

        // Fetch price ranges for this brand
        await updatePriceRanges(searchForm.make, null);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, [searchForm.make]);

  // Update price ranges when model changes
  useEffect(() => {
    if (searchForm.make && searchForm.model) {
      updatePriceRanges(searchForm.make, searchForm.model);
    } else if (searchForm.make) {
      updatePriceRanges(searchForm.make, null);
    }
  }, [searchForm.model]);

  // Function to update price ranges based on available vehicles
  const updatePriceRanges = async (brandId, modelId) => {
    try {
      // Fetch vehicles for this brand/model combination to get price ranges
      const params = new URLSearchParams();
      params.append("make", brandId);
      if (modelId) {
        params.append("model", modelId);
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
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

        const minPrice =
          prices.length > 0 ? Math.floor(prices[0] / 1000) * 1000 : 0;
        const maxPrice =
          prices.length > 0
            ? Math.ceil(prices[prices.length - 1] / 1000) * 1000
            : 150000;
        const minFinance =
          financePrices.length > 0 ? Math.floor(financePrices[0] / 50) * 50 : 0;
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
      console.error("Error updating price ranges:", error);
      setPriceRanges({ min: 0, max: 150000, financeMin: 0, financeMax: 2000 });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Reset model when make changes
      if (name === "make") {
        updated.model = "";
      }

      return updated;
    });
  };

  const handleBudgetSwitch = () => {
    setBudgetSwitch(!budgetSwitch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build search parameters
    const params = new URLSearchParams();

    // Add budget switch (0 for price, 1 for finance)
    params.append("budgetswitch", budgetSwitch ? "1" : "0");

    // Add make if selected
    if (searchForm.make) {
      params.append("make", searchForm.make);
    }

    // Add model if selected
    if (searchForm.model) {
      params.append("model", searchForm.model);
    }

    // Add budget parameters based on switch
    if (budgetSwitch) {
      // Finance mode - budgetmin is now max budget
      if (searchForm.budgetmin) {
        params.append("budgetmax", searchForm.budgetmin); // Use budgetmax for the max budget filter
      }
    } else {
      // Price mode
      if (searchForm.budgetmax) {
        params.append("budgetmax", searchForm.budgetmax);
      }
    }

    // Navigate to search page with parameters
    navigate(`/search?${params.toString()}`);
  };

  // Helper function to get brand name by ID
  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b._id === brandId);
    return brand ? brand.name : "";
  };

  // Helper function to generate price options
  const generatePriceOptions = (min, max, step) => {
    const options = [];
    const start = Math.floor(min / step) * step;
    const end = Math.ceil(max / step) * step;

    for (let price = start; price <= end; price += step) {
      if (price >= 1000) {
        // Only show prices from £1,000
        options.push({
          value: price,
          label: `To £${price.toLocaleString()}`,
        });
      }
    }

    // Ensure we have at least some default options
    if (options.length === 0) {
      return [
        { value: 10000, label: "To £10,000" },
        { value: 20000, label: "To £20,000" },
        { value: 30000, label: "To £30,000" },
        { value: 50000, label: "To £50,000" },
        { value: 75000, label: "To £75,000" },
        { value: 100000, label: "To £100,000" },
        { value: 150000, label: "To £150,000" },
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
        // Only show amounts from £50
        options.push({
          value: amount,
          label: `To £${amount}/month`,
        });
      }
    }

    // Ensure we have at least some default options
    if (options.length === 0) {
      return [
        { value: 100, label: "To £100/month" },
        { value: 200, label: "To £200/month" },
        { value: 300, label: "To £300/month" },
        { value: 400, label: "To £400/month" },
        { value: 500, label: "To £500/month" },
        { value: 750, label: "To £750/month" },
        { value: 1000, label: "To £1,000/month" },
        { value: 1500, label: "To £1,500/month" },
        { value: 2000, label: "To £2,000/month" },
      ];
    }

    return options;
  };

  return (
    <div className="row-block hero-unit lazy-background visible">
      {/* Slider/Carousel */}
      <div className="hero-carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="wrapper">
              <div className="container"></div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hero Content Overlay */}
      <div className="hero-unit-bottom">
        <div className="hero-unit-block  sm:px-0 px-3">
          <div className="hero-unit-block__title">
            Professional Cars
            <div className="hero-unit-block__sub-head">
              Fuelled by Passion
              <br />
              <br />
              Bespoke Customisation
            </div>
            <div
              id="play-video-2"
              className="btn"
              onClick={() => setShowVideo(true)}
            >
              Watch Video
            </div>
          </div>

          {/* Search Block */}
          <div className="search-block">
            <div
              data-advanced-search="main"
              className="o-search o-search--home"
            >
              <em className="search-block__title">Quick Search:</em>
              <form method="get" action="/search" onSubmit={handleSubmit}>
                <input type="hidden" id="search-instance" value="home" />
                <input type="hidden" value="0" name="budgetswitch" />

                <fieldset className="fieldset fieldset--search">
                  <div className="fieldset__wrapper">
                    <div className="form-group form-group--make">
                      <select
                        name="make"
                        id="make"
                        data-search-field="main"
                        data-search-filters="type,injectedLocation,location,budgetmin,budgetmax,yearmin,yearmax"
                        className="default"
                        value={searchForm.make}
                        onChange={handleInputChange}
                        disabled={loadingBrands}
                      >
                        <option value="">
                          {loadingBrands ? "Loading..." : "Any make"}
                        </option>
                        {brands.map((brand) => (
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
                        value={searchForm.model}
                        onChange={handleInputChange}
                        disabled={!searchForm.make || loadingModels}
                      >
                        <option value="">
                          {loadingModels ? "Loading..." : "Any model"}
                        </option>
                        {models.map((model) => (
                          <option key={model._id} value={model._id}>
                            {model.model}
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
                        <div
                          className="price"
                          style={{
                            fontSize: "14px",
                            fontWeight: "300",
                            color: "#7d7d7d",
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          Price
                        </div>
                        <div className="budgetswitch">
                          <input
                            type="checkbox"
                            className="a-toggle"
                            name="budgetswitch"
                            id="budgetswitch"
                            data-search-field=""
                            value="1"
                            checked={budgetSwitch}
                            onChange={handleBudgetSwitch}
                          />
                          <label
                            htmlFor="budgetswitch"
                            className="budgetswitch-label"
                            data-checked="Monthly Price"
                            data-unchecked="Total Price"
                          ></label>
                        </div>
                        <div
                          className="finance"
                          style={{
                            fontSize: "14px",
                            fontWeight: "300",
                            color: "#7d7d7d",
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          Finance
                        </div>
                      </div>
                    </div>
                    {budgetSwitch ? (
                      <div
                        className="form-group form-group--budgetmin"
                        style={{ marginBottom: "0px !important" }}
                      >
                        <select
                          name="budgetmin"
                          id="budgetmin"
                          data-search-field="aside"
                          data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,gearbox,doors,body_colour,fuel_type,seats,yearmin,yearmax"
                          className="default"
                          value={searchForm.budgetmin}
                          onChange={handleInputChange}
                        >
                          <option value="">Budget (Max)</option>
                          {generateFinanceOptions(
                            priceRanges.financeMin,
                            priceRanges.financeMax,
                            50
                          ).map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div
                        className="form-group form-group--budgetmax"
                        style={{ marginBottom: "0px !important" }}
                      >
                        <select
                          name="budgetmax"
                          id="budgetmax"
                          data-search-field="aside"
                          data-search-filters="type,injectedLocation,location,make,model,variant,trim,body,gearbox,doors,body_colour,fuel_type,seats,yearmin,yearmax"
                          className="default"
                          value={searchForm.budgetmax}
                          onChange={handleInputChange}
                        >
                          <option value="">Price (Max)</option>
                          {generatePriceOptions(
                            priceRanges.min,
                            priceRanges.max,
                            1000
                          ).map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </fieldset>

                <fieldset className="fieldset fieldset--button">
                  <div className="fieldset__wrapper">
                    <div className="button-group button-group--search">
                      <button type="submit" className="a-btn search-button">
                        SEARCH
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className="video-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowVideo(false)}>
              ×
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Watch Video"
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
