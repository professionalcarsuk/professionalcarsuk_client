import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageSidebar = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [searchForm, setSearchForm] = useState({
    make: "",
    model: "",
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
  });

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

        const minPrice =
          prices.length > 0 ? Math.floor(prices[0] / 1000) * 1000 : 0;
        const maxPrice =
          prices.length > 0
            ? Math.ceil(prices[prices.length - 1] / 1000) * 1000
            : 150000;

        setPriceRanges({
          min: Math.max(0, minPrice),
          max: Math.min(150000, maxPrice),
        });
      } else {
        // Reset to defaults if no vehicles found
        setPriceRanges({
          min: 0,
          max: 150000,
        });
      }
    } catch (error) {
      console.error("Error updating price ranges:", error);
      setPriceRanges({ min: 0, max: 150000 });
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build search parameters
    const params = new URLSearchParams();

    // Add budget switch (0 for price mode)
    params.append("budgetswitch", "0");

    // Add make if selected
    if (searchForm.make) {
      params.append("make", searchForm.make);
    }

    // Add model if selected
    if (searchForm.model) {
      params.append("model", searchForm.model);
    }

    // Add budgetmax if selected (maximum price)
    if (searchForm.budgetmax) {
      params.append("budgetmax", searchForm.budgetmax);
    }

    // Navigate to search page with parameters
    navigate(`/search?${params.toString()}`);
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
          label: `£${price.toLocaleString()}`,
        });
      }
    }

    // Ensure we have at least some default options
    if (options.length === 0) {
      return [
        { value: 10000, label: "£10,000" },
        { value: 20000, label: "£20,000" },
        { value: 30000, label: "£30,000" },
        { value: 50000, label: "£50,000" },
        { value: 75000, label: "£75,000" },
        { value: 100000, label: "£100,000" },
        { value: 150000, label: "£150,000" },
      ];
    }

    return options;
  };

  return (
    <>
      <div className="sidebar-widget widget search">
        <div className="pad-20 overflow-hidden">
          <h3>
            <span aria-hidden="true" className="icon icon-search"></span>{" "}
            Vehicles for Sale
          </h3>
          <noscript>
            <div className="noscript message_red">
              Please enable Javascript to use this function.
            </div>
          </noscript>
          <form action="/search" method="get" onSubmit={handleSubmit}>
            <div id="sidebar-search-make">
              <select
                name="make"
                id="make"
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
            <div id="sidebar-search-model">
              <select
                name="model"
                id="model"
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
            <div id="sidebar-search-price">
              <select
                name="budgetmax"
                value={searchForm.budgetmax}
                onChange={handleInputChange}
              >
                <option value="">Maximum price</option>
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
            <div>
              <input
                type="submit"
                className="button black"
                value="Search"
                aria-hidden="true"
                data-icon="F"
                style={{ backgroundColor: isHovered ? "#7d7d7d" : undefined }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="sidebar-widget widget contact">
        <div className="pad-20 overflow-hidden">
          <h3>
            <span aria-hidden="true" className="icon icon-phone"></span> Get In
            Touch
          </h3>
          <p style={{ textAlign: "start" }}>Why not contact us directly?</p>
          <div className="elevencol contact-box">
            <ul id="get-in-touch">
              <li className="mobile-hidden">
                <span aria-hidden="true" className="icon icon-phone-2"></span>{" "}
                <a href="/contact">01780 435024</a>
              </li>
              <li className="desktop-hidden">
                <span aria-hidden="true" className="icon icon-phone-2"></span>{" "}
                <a href="tel:01780435024">01780435024</a>
              </li>
              <li className="mobile-hidden">
                <span
                  aria-hidden="true"
                  className="desktop-hidden mobile-hidden desktop-hidden"
                ></span>{" "}
                <a href="/contact"></a>
              </li>
              <li className="mobile-hidden">
                <span
                  aria-hidden="true"
                  className="desktop-hidden mobile-hidden desktop-hidden"
                ></span>{" "}
                <a href="/contact"></a>
              </li>
              <li className="desktop-hidden">
                <span
                  aria-hidden="true"
                  className="desktop-hidden mobile-hidden desktop-hidden"
                ></span>{" "}
                <a href="tel:"></a>
              </li>
              <li>
                <span aria-hidden="true" className="icon icon-mail"></span>{" "}
                <a href="mailto:enquiries@sjamesprestige.com" title="Email Us">
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sidebar-widget widget testimonials">
        <div
          className="pad-20 overflow-hidden"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <h3>
            <span aria-hidden="true" className="icon icon-comments"></span> What
            They Say
          </h3>
          <blockquote>
            <div className="quote">
              <div className="pad-15">
                The crew at S James Prestige were great, and could easily deal
                with all our questions. The service was brilliant and we are
                very happy with our new car. Will definitely be returning!
              </div>
            </div>
            <cite>Craig T</cite>
          </blockquote>
          <a
            href="https://uk.trustpilot.com/review/sjamesprestige.com"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Our Trustpilot
          </a>
        </div>
      </div>
      <div className="sidebar-widget widget partners tablet-hidden">
        <div className="pad-20 overflow-hidden">
          <h3>
            <span aria-hidden="true" className="icon icon-users"></span> Our
            Partners
          </h3>
          <div className="row sidebar-partners">
            <div className="fourcol center">
              <img
                className="responsive-img"
                data-src="/assets/images/partners/partner-alphera.png"
                src="/images/partner-alphera.png"
                data-srcset=""
                alt="Partner"
              />
            </div>
            <div className="fourcol center">
              <img
                className="responsive-img"
                data-src="/assets/images/partners/partner-mannisland.png"
                src="/images/partner-mannisland.png"
                data-srcset=""
                alt="Partner"
              />
            </div>
            <div className="fourcol last center">
              <img
                className="responsive-img"
                data-src="/assets/images/partners/partner-hpi.png"
                src="/images/partner-hpi.png"
                data-srcset=""
                alt="Partner"
              />
            </div>
            <div className="fourcol center">
              <img
                className="responsive-img"
                data-src="/assets/images/partners/partner-saf.png"
                src="/images/partner-saf.png"
                data-srcset=""
                alt="Partner"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSidebar;
