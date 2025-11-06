import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FavoriteButton from '../../components/FavoriteButton';
import '../../components/VehicleDetail-accordion.css';
import '../../components/VehicleDetail-components.css';
import '../../components/VehicleDetail-gallery.css';
import '../../components/VehicleDetail-layout.css';
import '../../components/VehicleDetail-sidebar.css';
import { fetchVehicleById, loadFavorites, selectCurrentVehicle } from '../../store/vehicleSlice';

const VehicleDetail = () => {
  const { brand, vehicleId } = useParams();
  const dispatch = useDispatch();
  const vehicleFromRedux = useSelector(selectCurrentVehicle);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbnailWidth, setThumbnailWidth] = useState(106);
  const [loadingBrochure, setLoadingBrochure] = useState(false);
  const [vehicle, setVehicle] = useState(null);

  // Find the vehicle by ID
  useEffect(() => {
    const loadVehicle = async () => {
      if (vehicleId) {
        try {
          setLoading(true);
          setError(null);
          const result = await dispatch(fetchVehicleById(vehicleId)).unwrap();
          setVehicle(result);
          // Load favorites from localStorage
          dispatch(loadFavorites());
        } catch (err) {
          setError('Failed to load vehicle. Please try again.');
          console.error('Error fetching vehicle:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadVehicle();
  }, [dispatch, vehicleId]);

  // Update thumbnail width based on screen size
  useEffect(() => {
    const updateThumbnailWidth = () => {
      setThumbnailWidth(window.innerWidth <= 768 ? 69 : 106);
    };
    updateThumbnailWidth();
    window.addEventListener('resize', updateThumbnailWidth);
    return () => window.removeEventListener('resize', updateThumbnailWidth);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const scrollToThumbnail = (index) => {
    const container = document.querySelector('.rsThumbsContainer');
    if (container) {
      const containerWidth = container.offsetWidth;
      const visibleThumbnails = Math.floor(containerWidth / thumbnailWidth);
      const scrollPosition = index * thumbnailWidth;

      // Calculate if the thumbnail is visible
      const currentScroll = container.scrollLeft;
      const thumbnailLeft = scrollPosition;
      const thumbnailRight = scrollPosition + thumbnailWidth;

      // If thumbnail is not fully visible, scroll to center it
      if (thumbnailLeft < currentScroll || thumbnailRight > currentScroll + containerWidth) {
        const centerPosition = scrollPosition - containerWidth / 2 + thumbnailWidth / 2;
        container.scrollTo({
          left: Math.max(0, centerPosition),
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollThumbnailsLeft = () => {
    const container = document.querySelector('.rsThumbsContainer');
    if (container) {
      container.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollThumbnailsRight = () => {
    const container = document.querySelector('.rsThumbsContainer');
    if (container) {
      container.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  // Scroll to current thumbnail when image index changes
  useEffect(() => {
    scrollToThumbnail(currentImageIndex);
  }, [currentImageIndex]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return (
      <div className="results-layout__listings snipcss-opdrK">
        <div className="breadcrumb clear-fix">
          <div className="wrapper">
            <div className="container">
              <ol
                className="breadcrumb__list"
                itemScope=""
                itemType="http://schema.org/BreadcrumbList"
              >
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <a itemType="http://schema.org/Thing" itemProp="item" href="/">
                    <span itemProp="name">Home</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <a itemType="http://schema.org/Thing" itemProp="item" href="/used-cars">
                    <span itemProp="name">Used Cars</span>
                  </a>
                  <meta itemProp="position" content="2" />
                </li>
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <span itemProp="name">Loading...</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div id="header-trigger"></div>
        <div className="res-filt res-filt--top">
          <div className="wrapper">
            <div className="container">
              <div className="res-filt__wrapper">
                <div className="res-filt__showing">
                  <em>Loading vehicle details...</em>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="results">
          <div className="wrapper">
            <div className="container">
              <div className="vehicle-results-list">
                <div className="results-vehicleresults grid-view">
                  <div className="loading-vehicle-detail">
                    <h2>Loading Vehicle Details...</h2>
                    <p>Please wait while we fetch the vehicle information.</p>
                  </div>
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
        <div className="breadcrumb clear-fix">
          <div className="wrapper">
            <div className="container">
              <ol
                className="breadcrumb__list"
                itemScope=""
                itemType="http://schema.org/BreadcrumbList"
              >
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <a itemType="http://schema.org/Thing" itemProp="item" href="/">
                    <span itemProp="name">Home</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <a itemType="http://schema.org/Thing" itemProp="item" href="/used-cars">
                    <span itemProp="name">Used Cars</span>
                  </a>
                  <meta itemProp="position" content="2" />
                </li>
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <span itemProp="name">Error</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div
          className="error-message"
          style={{ textAlign: 'center', padding: '40px', background: '#fff' }}
        >
          <h3 style={{ color: '#dc3545', marginBottom: '20px' }}>Error Loading Vehicle</h3>
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
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="results-layout__listings snipcss-opdrK">
        <div className="breadcrumb clear-fix">
          <div className="wrapper">
            <div className="container">
              <ol
                className="breadcrumb__list"
                itemScope=""
                itemType="http://schema.org/BreadcrumbList"
              >
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <a itemType="http://schema.org/Thing" itemProp="item" href="/">
                    <span itemProp="name">Home</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <a itemType="http://schema.org/Thing" itemProp="item" href="/used-cars">
                    <span itemProp="name">Used Cars</span>
                  </a>
                  <meta itemProp="position" content="2" />
                </li>
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <span itemProp="name">Vehicle Not Found</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div
          className="error-message"
          style={{ textAlign: 'center', padding: '40px', background: '#fff' }}
        >
          <h3 style={{ color: '#dc3545', marginBottom: '20px' }}>Vehicle Not Found</h3>
          <p>The vehicle you're looking for could not be found.</p>
          <Link
            to="/used-cars"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#171717',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '3px',
              marginTop: '20px',
            }}
          >
            Browse All Vehicles
          </Link>
        </div>
      </div>
    );
  }

  // Ensure vehicle has required basic fields
  if (!vehicle.id && !vehicle._id) {
    return (
      <div className="results-layout__listings snipcss-opdrK">
        <div className="breadcrumb clear-fix">
          <div className="wrapper">
            <div className="container">
              <ol
                className="breadcrumb__list"
                itemScope=""
                itemType="http://schema.org/BreadcrumbList"
              >
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <a itemType="http://schema.org/Thing" itemProp="item" href="/">
                    <span itemProp="name">Home</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <a itemType="http://schema.org/Thing" itemProp="item" href="/used-cars">
                    <span itemProp="name">Used Cars</span>
                  </a>
                  <meta itemProp="position" content="2" />
                </li>
                <li
                  className="breadcrumb__listitem"
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <span itemProp="name">Loading Vehicle Data...</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div
          className="loading-message"
          style={{ textAlign: 'center', padding: '40px', background: '#fff' }}
        >
          <h3 style={{ color: '#171717', marginBottom: '20px' }}>Loading Vehicle Details...</h3>
          <p>Please wait while we load the complete vehicle information.</p>
        </div>
      </div>
    );
  }

  const images = vehicle.images || ['/images/default-vehicle.jpg'];

  // Extract image URLs from the images array (handles both string URLs and object URLs)
  const imageUrls = images
    .map((img) => (typeof img === 'string' ? img : img.url))
    .filter((url) => url && url !== '/images/default-vehicle.jpg');

  // Use extracted URLs or fallback to default
  const displayImages = imageUrls.length > 0 ? imageUrls : ['/images/default-vehicle.jpg'];

  return (
    <div id="detail" className="car-7397673 veh-loc-4 snipcss-SJHlq">
      <div className="detail-header">
        <div className="detail-header__image">
          <img
            data-src={displayImages[0] || '/images/default-vehicle.jpg'}
            src={displayImages[0] || '/images/default-vehicle.jpg'}
            data-srcset=""
            className=""
            onError={(e) => (e.target.style.display = 'none')}
            alt="Vehicle"
          />
        </div>
        <div className="detail-header__breadcrumb">
          <div className="wrapper">
            <div className="container">
              <div className="breadcrumb breadcrumb--details">
                <ol
                  className="breadcrumb__list"
                  itemScope=""
                  itemType="http://schema.org/BreadcrumbList"
                >
                  <li
                    className="breadcrumb__listitem"
                    itemProp="itemListElement"
                    itemScope=""
                    itemType="http://schema.org/ListItem"
                  >
                    <a itemType="http://schema.org/Thing" itemProp="item" href="/">
                      <span itemProp="name">Home</span>
                    </a>
                    <meta itemProp="position" content="1" />
                  </li>
                  <li
                    className="breadcrumb__listitem"
                    itemProp="itemListElement"
                    itemScope=""
                    itemType="http://schema.org/ListItem"
                  >
                    <Link itemType="http://schema.org/Thing" itemProp="item" to={`/used-cars`}>
                      <span itemProp="name">Current Stock</span>
                    </Link>
                    <meta itemProp="position" content="2" />
                  </li>
                  <li
                    className="breadcrumb__listitem"
                    itemProp="itemListElement"
                    itemScope=""
                    itemType="http://schema.org/ListItem"
                  >
                    <Link
                      itemType="http://schema.org/Thing"
                      itemProp="item"
                      to={`/used-cars/${vehicle.brand}`}
                    >
                      <span itemProp="name">{vehicle.brand}</span>
                    </Link>
                    <meta itemProp="position" content="3" />
                  </li>
                  <li
                    className="breadcrumb__listitem"
                    itemProp="itemListElement"
                    itemScope=""
                    itemType="http://schema.org/ListItem"
                  >
                    <Link itemType="http://schema.org/Thing" itemProp="item">
                      <span itemProp="name">{vehicle.model}</span>
                    </Link>
                    <meta itemProp="position" content="4" />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="container">
            <div className="detail-header__wrapper">
              <div className="detail-header__title detail-title">
                <h1 className="detail-title__main-title">
                  {vehicle.title || `${vehicle.brand} ${vehicle.model}`}{' '}
                  {(vehicle.year || vehicle.subTitle) && (
                    <span className="detail-title__sub-title">
                      {vehicle.year && (
                        <>
                          {vehicle.year}
                          {vehicle.subTitle ? ' ' : ''}
                        </>
                      )}
                      {vehicle.subTitle}
                    </span>
                  )}
                </h1>
              </div>
              <div className="detail-header__ctas">
                <ul className="detail-cta">
                  {vehicle.brochures && vehicle.brochures.length > 0 && (
                    <li className="mobile-hidden">
                      <button
                        onClick={async () => {
                          setLoadingBrochure(true);
                          try {
                            const response = await fetch(vehicle.brochures[0].url);
                            const blob = await response.blob();
                            const url = URL.createObjectURL(blob);
                            window.open(url, '_blank');
                          } catch (error) {
                            console.error('Failed to load brochure:', error);
                            // Fallback to direct link
                            window.open(vehicle.brochures[0].url, '_blank');
                          } finally {
                            setLoadingBrochure(false);
                          }
                        }}
                        disabled={loadingBrochure}
                        title="View Brochure"
                        className="btn btn--ghost"
                      >
                        {loadingBrochure ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 mr-2 inline"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          'Download Brochure'
                        )}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-main">
        <div className="wrapper">
          <div className="container">
            <div className="detail-main__wrapper">
              <div className="detail-main__gallery">
                <div className="simple-slider">
                  <div className="slider-main-image">
                    <img
                      src={displayImages[currentImageIndex]}
                      alt="Vehicle"
                      className="main-vehicle-image"
                    />
                    <button
                      className="slider-arrow slider-arrow-left"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      className="slider-arrow slider-arrow-right"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </div>
                  <div className="slider-thumbnails">
                    <button
                      className="rsThumbsArrow rsThumbsArrowLeft m-0"
                      onClick={scrollThumbnailsLeft}
                      aria-label="Scroll thumbnails left"
                    >
                      ◀
                    </button>
                    <div className="rsThumbsContainer">
                      {displayImages.map((image, index) => (
                        <div
                          key={index}
                          className={`thumbnail rsNavItem rsThumb ${
                            index === currentImageIndex ? 'active' : ''
                          }`}
                          onClick={() => selectImage(index)}
                        >
                          <img
                            src={image}
                            alt={`Vehicle view ${index + 1}`}
                            width="96"
                            height="72"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="rsThumbsArrow rsThumbsArrowRight m-0"
                      onClick={scrollThumbnailsRight}
                      aria-label="Scroll thumbnails right"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              </div>
              <div className="detail-main__info">
                <div className="detail-sidebar">
                  <div className="detail-sidebar__favourites">
                    <div className="listing-favourites">
                      <div className="app">
                        <FavoriteButton vehicle={vehicle} />
                      </div>
                    </div>
                  </div>
                  <div className="detail-sidebar__prices">
                    {vehicle.price && (
                      <div className="detail-sidebar__price detail-sidebar__price--total">
                        <em className="figure">
                          £
                          {typeof vehicle.price === 'string'
                            ? parseFloat(vehicle.price.replace(/,/g, '')).toLocaleString()
                            : vehicle.price.toLocaleString()}
                        </em>
                      </div>
                    )}
                    {vehicle.financeMonthly && (
                      <a href="#finance-section">
                        <div className="detail-sidebar__price detail-sidebar__price--finance finance-available">
                          {' '}
                          From{' '}
                          <em className="figure">
                            £
                            {typeof vehicle.financeMonthly === 'string'
                              ? parseFloat(
                                  vehicle.financeMonthly.replace(/,/g, '')
                                ).toLocaleString()
                              : vehicle.financeMonthly.toLocaleString()}
                            <span>p/m.</span>
                          </em>
                        </div>
                      </a>
                    )}
                  </div>
                  <div className="detail-sidebar__spec-pills">
                    <ul className="spec-pills">
                      {vehicle.year && (
                        <li className="spec-pills__item spec-pills__item--year">{vehicle.year}</li>
                      )}
                      {vehicle.mileage && (
                        <li className="spec-pills__item spec-pills__item--mileage">
                          {vehicle.mileage.toLocaleString()} Miles
                        </li>
                      )}
                      {vehicle.engineSize && (
                        <li className="spec-pills__item spec-pills__item--engine-size">
                          {vehicle.engineSize}
                        </li>
                      )}
                      {vehicle.fuelType && (
                        <li className="spec-pills__item spec-pills__item--fuel-type">
                          {vehicle.fuelType}
                        </li>
                      )}
                      {vehicle.transmission && (
                        <li className="spec-pills__item spec-pills__item--transmission">
                          {vehicle.transmission}
                        </li>
                      )}
                      {vehicle.color && (
                        <li className="spec-pills__item spec-pills__item--colour">
                          {vehicle.color}
                        </li>
                      )}
                      {vehicle.bodyStyle && (
                        <li className="spec-pills__item spec-pills__item--body-type">
                          {vehicle.bodyStyle}
                        </li>
                      )}
                      {vehicle.doors && (
                        <li className="spec-pills__item spec-pills__item--doors">
                          {vehicle.doors} Doors
                        </li>
                      )}
                      {vehicle.seats && (
                        <li className="spec-pills__item spec-pills__item--seats">
                          {vehicle.seats} Seats
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="detail-sidebar__cta-list">
                    <ul className="detail-cta-list">
                      <li>
                        <Link
                          to={`/enquiry?about=${encodeURIComponent(
                            vehicle.title || `${vehicle.brand} ${vehicle.model}`
                          )}&vehicle_id=${encodeURIComponent(vehicle.id || vehicle._id || '')}`}
                          title="Send An Enquiry"
                          className="btn--ghost"
                        >
                          Make An Enquiry
                        </Link>
                      </li>
                      {/* <li className="finance-available">
                        <a
                          href="#finance-section"
                          title="View Finance Options"
                          className="btn--ghost"
                        >
                          Finance Options
                        </a>
                      </li> */}
                      <li className="detail-main-cta">
                        <div className="dt-buy-button">
                          <Link
                            to="/contact"
                            rel="nofollow"
                            title="Apply For Finance"
                            className="finance-available btn btn--engage btn--large style-ELfdD"
                            id="style-ELfdD"
                          >
                            Apply For Finance{' '}
                            <i className="far fa-chevron-right" aria-hidden="true"></i>
                          </Link>
                        </div>
                      </li>
                    </ul>
                    <ul className="detail-contact-list">
                      <li>
                        T:{' '}
                        <a href="tel:01780435024" title="Call Us">
                          01780 435024
                        </a>
                      </li>
                      <li>
                        M:{' '}
                        <a href="tel:01780435024" title="Call Us">
                          01780435024
                        </a>
                      </li>
                      <li>
                        E:{' '}
                        <a href="mailto:enquiries@sjamesprestige.com" title="Email Us">
                          enquiries@sjamesprestige.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-section detail-section--description">
        <div className="wrapper">
          <div className="container">
            {vehicle.description && (
              <div className="detail-description">
                <div className={`detail-description__content ${isExpanded ? 'expanded' : ''}`}>
                  <p>{vehicle.description}</p>
                </div>
                <a
                  id="read-more-button"
                  className={isExpanded ? 'expanded' : ''}
                  onClick={toggleReadMore}
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="detail-section detail-section--vehicle-information">
        <div className="wrapper">
          <div className="container">
            <em className="row-block__heading">
              Vehicle <span>Information</span>
            </em>
            <div className="detail-information">
              <details className="detail-accordion detail-accordion--summary" open="">
                <summary>
                  Vehicle <span>Summary</span>
                </summary>
                <div className="detail-accordion__content">
                  <div className="vehicle-image">
                    <img
                      data-src={displayImages[0] || '/images/default-vehicle.jpg'}
                      src={displayImages[0] || '/images/default-vehicle.jpg'}
                      data-srcset=""
                      alt={`View our ${vehicle.brand} ${vehicle.model}`}
                      className="responsive-img"
                    />
                  </div>
                  <div className="vehicle-stats">
                    <ul className="vehicle-stat-list">
                      {vehicle.year && (
                        <li>
                          <span className="vehicle-stat-list__label">Year of Reg</span>
                          <span className="vehicle-stat-list__stat">{vehicle.year}</span>
                        </li>
                      )}
                      {vehicle.registration && (
                        <li>
                          <span className="vehicle-stat-list__label">Registration</span>
                          <span className="vehicle-stat-list__stat">{vehicle.registration}</span>
                        </li>
                      )}
                      {vehicle.mileage && (
                        <li>
                          <span className="vehicle-stat-list__label">Mileage</span>
                          <span className="vehicle-stat-list__stat">
                            {vehicle.mileage.toLocaleString()} miles
                          </span>
                        </li>
                      )}
                      {vehicle.engineSize && (
                        <li>
                          <span className="vehicle-stat-list__label">Engine Size</span>
                          <span className="vehicle-stat-list__stat">{vehicle.engineSize}</span>
                        </li>
                      )}
                      {vehicle.color && (
                        <li>
                          <span className="vehicle-stat-list__label">Colour</span>
                          <span className="vehicle-stat-list__stat">{vehicle.color}</span>
                        </li>
                      )}
                      {vehicle.previousOwners && (
                        <li>
                          <span className="vehicle-stat-list__label">Previous owners</span>
                          <span className="vehicle-stat-list__stat">{vehicle.previousOwners}</span>
                        </li>
                      )}
                      {vehicle.bodyStyle && (
                        <li>
                          <span className="vehicle-stat-list__label">Body Style</span>
                          <span className="vehicle-stat-list__stat">{vehicle.bodyStyle}</span>
                        </li>
                      )}
                      {vehicle.transmission && (
                        <li>
                          <span className="vehicle-stat-list__label">Transmission</span>
                          <span className="vehicle-stat-list__stat">{vehicle.transmission}</span>
                        </li>
                      )}
                      {vehicle.fuelType && (
                        <li>
                          <span className="vehicle-stat-list__label">Fuel Type</span>
                          <span className="vehicle-stat-list__stat">{vehicle.fuelType}</span>
                        </li>
                      )}
                      {vehicle.insuranceGroup && (
                        <li>
                          <span className="vehicle-stat-list__label">Insurance group</span>
                          <span className="vehicle-stat-list__stat">{vehicle.insuranceGroup}</span>
                        </li>
                      )}
                      {vehicle.roadTax6Months && (
                        <li>
                          <span className="vehicle-stat-list__label">6 mths Road Tax</span>
                          <span className="vehicle-stat-list__stat">£{vehicle.roadTax6Months}</span>
                        </li>
                      )}
                      {vehicle.roadTax12Months && (
                        <li>
                          <span className="vehicle-stat-list__label">12 mths Road Tax</span>
                          <span className="vehicle-stat-list__stat">
                            £{vehicle.roadTax12Months}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </details>
              {vehicle.fittedExtras && vehicle.fittedExtras.length > 0 && (
                <details
                  className="detail-accordion detail-accordion--factory-fitted-extras"
                  open=""
                >
                  <summary>
                    This car includes{' '}
                    <span>
                      £
                      {(() => {
                        const savedTotal = vehicle.formData && vehicle.formData.totalWorth;
                        if (savedTotal && !isNaN(parseFloat(savedTotal))) {
                          return parseFloat(savedTotal).toLocaleString();
                        }
                        return vehicle.fittedExtras
                          .filter((extra) => extra.name && extra.value)
                          .reduce((total, extra) => total + (parseFloat(extra.value) || 0), 0)
                          .toLocaleString();
                      })()}
                    </span>{' '}
                    worth of fitted extras{' '}
                  </summary>
                  <div className="detail-accordion__content">
                    <ul>
                      {vehicle.fittedExtras
                        .filter((extra) => extra.name && extra.value)
                        .map((extra, index) => (
                          <li key={index} className="">
                            <div className="list-label">{extra.name}</div>
                            <div className="list-stat">
                              {' '}
                              £{parseFloat(extra.value).toLocaleString()}
                            </div>
                          </li>
                        ))}
                      <li className="">
                        <div className="list-label">
                          <strong>Total value of factory fitted extras</strong>
                        </div>
                        <div className="list-stat" style={{ marginLeft: '20px' }}>
                          {' '}
                          £
                          {(() => {
                            const savedTotal = vehicle.formData && vehicle.formData.totalWorth;
                            if (savedTotal && !isNaN(parseFloat(savedTotal))) {
                              return parseFloat(savedTotal).toLocaleString();
                            }
                            return vehicle.fittedExtras
                              .filter((extra) => extra.name && extra.value)
                              .reduce((total, extra) => total + (parseFloat(extra.value) || 0), 0)
                              .toLocaleString();
                          })()}
                        </div>
                      </li>
                    </ul>
                  </div>
                </details>
              )}
              {(vehicle.topSpeed ||
                vehicle.acceleration ||
                vehicle.torque ||
                vehicle.power ||
                vehicle.combinedMpg ||
                vehicle.co2Emissions ||
                vehicle.cylinders ||
                vehicle.bore ||
                vehicle.stroke ||
                vehicle.cc ||
                vehicle.numberOfGears) && (
                <details className="detail-accordion detail-accordion--performance" open="">
                  <summary>
                    Performance &amp; <span>Economy</span>
                  </summary>
                  <div className="detail-accordion__content">
                    {(vehicle.topSpeed ||
                      vehicle.acceleration ||
                      vehicle.engineTorque ||
                      vehicle.enginePower) && (
                      <div className="accordion-group">
                        <em className="detail-accordion__heading">Performance</em>
                        <ul className="row tablist">
                          {vehicle.topSpeed && (
                            <li className="">
                              <div className="list-label">Top speed</div>
                              <div className="list-stat">{vehicle.topSpeed}</div>
                            </li>
                          )}
                          {vehicle.acceleration && (
                            <li className="">
                              <div className="list-label">0 to 60</div>
                              <div className="list-stat">{vehicle.acceleration}</div>
                            </li>
                          )}
                          {vehicle.engineTorque && (
                            <li className="">
                              <div className="list-label">Engine torque (lbs/ft)</div>
                              <div className="list-stat">{vehicle.engineTorque}</div>
                            </li>
                          )}
                          {vehicle.enginePower && (
                            <li className="">
                              <div className="list-label">Engine power (BHP)</div>
                              <div className="list-stat">{vehicle.enginePower}</div>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    {vehicle.combinedMpg && (
                      <div className="accordion-group">
                        <em className="detail-accordion__heading">Fuel Consumption</em>
                        <ul className="row tablist">
                          <li className="">
                            <div className="list-label">Combined (mpg)</div>
                            <div className="list-stat">{vehicle.combinedMpg}</div>
                          </li>
                        </ul>
                      </div>
                    )}
                    {(vehicle.cylinders ||
                      vehicle.bore ||
                      vehicle.stroke ||
                      vehicle.cc ||
                      vehicle.numberOfGears) && (
                      <div className="accordion-group">
                        <em className="detail-accordion__heading">Engine &amp; Drive Train</em>
                        <ul className="row tablist">
                          {vehicle.bore && (
                            <li className="">
                              <div className="list-label">Cylinders - bore (mm)</div>
                              <div className="list-stat">{vehicle.bore}</div>
                            </li>
                          )}
                          {vehicle.transmission && (
                            <li className="">
                              <div className="list-label">Transmission</div>
                              <div className="list-stat">{vehicle.transmission}</div>
                            </li>
                          )}
                          {vehicle.numberOfGears && (
                            <li className="">
                              <div className="list-label">Number of gears</div>
                              <div className="list-stat">{vehicle.numberOfGears}</div>
                            </li>
                          )}
                          {vehicle.stroke && (
                            <li className="">
                              <div className="list-label">Cylinders - stroke (mm)</div>
                              <div className="list-stat">{vehicle.stroke}</div>
                            </li>
                          )}
                          {vehicle.cc && (
                            <li className="">
                              <div className="list-label">CC</div>
                              <div className="list-stat">{vehicle.cc}</div>
                            </li>
                          )}
                          {vehicle.cylinders && (
                            <li className="">
                              <div className="list-label">Cylinders</div>
                              <div className="list-stat">{vehicle.cylinders}</div>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    {vehicle.co2Emissions && (
                      <div className="accordion-group">
                        <em className="detail-accordion__heading">Emissions</em>
                        <ul className="row tablist">
                          <li className="">
                            <div className="list-label">CO2 (g/km)</div>
                            <div className="list-stat">{vehicle.co2Emissions}</div>
                          </li>
                          {vehicle.euroEmissions && (
                            <li className="">
                              <div className="list-label">Standard Euro emissions</div>
                              <div className="list-stat">{vehicle.euroEmissions}</div>
                            </li>
                          )}
                          {vehicle.ultraLowEmissionZone && (
                            <li className="">
                              <div className="list-label">Ultra Low Emission Zone</div>
                              <div className="list-stat">{vehicle.ultraLowEmissionZone}</div>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>
              )}
              {(vehicle.interiorFeatures && vehicle.interiorFeatures.length > 0) ||
              (vehicle.exteriorFeatures && vehicle.exteriorFeatures.length > 0) ? (
                <details className="detail-accordion detail-accordion--interior-exterior" open="">
                  <summary>
                    Interior / <span>Exterior</span>
                  </summary>
                  <div className="detail-accordion__content">
                    {vehicle.interiorFeatures && vehicle.interiorFeatures.length > 0 && (
                      <div className="accordion-group">
                        <em className="detail-accordion__heading">Interior Features</em>
                        <ul className="row tablist">
                          {vehicle.interiorFeatures.map((feature, index) => (
                            <li key={index} className="">
                              <div className="list-stat">{feature}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {vehicle.exteriorFeatures && vehicle.exteriorFeatures.length > 0 && (
                      <div className="accordion-group">
                        <em className="detail-accordion__heading">Exterior Features</em>
                        <ul className="row tablist">
                          {vehicle.exteriorFeatures.map((feature, index) => (
                            <li key={index} className="">
                              <div className="list-stat">{feature}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>
              ) : null}
              {(vehicle.safetyFeatures && vehicle.safetyFeatures.length > 0) ||
              vehicle.ncapRating ||
              vehicle.height ||
              vehicle.length ||
              vehicle.width ||
              vehicle.wheelbase ||
              vehicle.heightWithRails ||
              vehicle.widthWithMirrors ||
              vehicle.luggageCapacitySeatsUp ||
              vehicle.luggageCapacitySeatsDown ||
              vehicle.seats ||
              vehicle.grossWeight ||
              vehicle.maxLoadingWeight ||
              vehicle.turningCircle ||
              vehicle.maxRoofLoad ||
              vehicle.kerbWeight ? (
                <details className="detail-accordion detail-accordion--safety-other" open="">
                  <summary>
                    Safety / <span>Other</span>
                  </summary>
                  <div className="detail-accordion__content">
                    {vehicle.safetyFeatures && vehicle.safetyFeatures.length > 0 && (
                      <div className="accordion-group accordion-group--full-width">
                        <em className="detail-accordion__heading">Safety Features</em>
                        <ul className="row tablist justify-between">
                          {vehicle.safetyFeatures.map((feature, index) => (
                            <li key={index} className="">
                              <div className="list-stat">{feature}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {vehicle.ncapRating && (
                      <div className="accordion-group accordion-group--full-width">
                        <em className="detail-accordion__heading">NCAP Ratings</em>{' '}
                        {vehicle.ncapRating}
                      </div>
                    )}
                    {(vehicle.height ||
                      vehicle.length ||
                      vehicle.width ||
                      vehicle.wheelbase ||
                      vehicle.heightWithRails ||
                      vehicle.widthWithMirrors) && (
                      <div className="accordion-group">
                        <em className="detail-accordion__heading">Dimensions</em>
                        <ul className="row tablist">
                          {vehicle.height && (
                            <li className="">
                              <div className="list-label">Height</div>
                              <div className="list-stat">{vehicle.height}mm</div>
                            </li>
                          )}
                          {vehicle.heightWithRails && (
                            <li className="">
                              <div className="list-label">Height inclusive of roof rails</div>
                              <div className="list-stat">{vehicle.heightWithRails}mm</div>
                            </li>
                          )}
                          {vehicle.length && (
                            <li className="">
                              <div className="list-label">Length</div>
                              <div className="list-stat">{vehicle.length}mm</div>
                            </li>
                          )}
                          {vehicle.wheelbase && (
                            <li className="">
                              <div className="list-label">Wheelbase</div>
                              <div className="list-stat">{vehicle.wheelbase}mm</div>
                            </li>
                          )}
                          {vehicle.width && (
                            <li className="">
                              <div className="list-label">Width</div>
                              <div className="list-stat">{vehicle.width}mm</div>
                            </li>
                          )}
                          {vehicle.widthWithMirrors && (
                            <li className="">
                              <div className="list-label">Width including mirrors</div>
                              <div className="list-stat">{vehicle.widthWithMirrors}mm</div>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    {(vehicle.luggageCapacitySeatsUp ||
                      vehicle.luggageCapacitySeatsDown ||
                      vehicle.seats ||
                      vehicle.grossWeight ||
                      vehicle.maxLoadingWeight ||
                      vehicle.turningCircle ||
                      vehicle.maxRoofLoad ||
                      vehicle.kerbWeight) && (
                      <div className="accordion-group">
                        <em className="detail-accordion__heading">Weights &amp; Capacities</em>
                        <ul className="row tablist">
                          {vehicle.luggageCapacitySeatsUp && (
                            <li className="">
                              <div className="list-label">Luggage capacity (seats up)</div>
                              <div className="list-stat">
                                {vehicle.luggageCapacitySeatsUp} litres
                              </div>
                            </li>
                          )}
                          {vehicle.luggageCapacitySeatsDown && (
                            <li className="">
                              <div className="list-label">Luggage capacity (seats down)</div>
                              <div className="list-stat">
                                {vehicle.luggageCapacitySeatsDown} litres
                              </div>
                            </li>
                          )}
                          {vehicle.seats && (
                            <li className="">
                              <div className="list-label">Number of seats</div>
                              <div className="list-stat">{vehicle.seats}</div>
                            </li>
                          )}
                          {vehicle.grossWeight && (
                            <li className="">
                              <div className="list-label">Gross vehicle weight</div>
                              <div className="list-stat">{vehicle.grossWeight} kg</div>
                            </li>
                          )}
                          {vehicle.maxLoadingWeight && (
                            <li className="">
                              <div className="list-label">Max loading weight</div>
                              <div className="list-stat">{vehicle.maxLoadingWeight} kg</div>
                            </li>
                          )}
                          {vehicle.turningCircle && (
                            <li className="">
                              <div className="list-label">Turning circle (kerb to kerb)</div>
                              <div className="list-stat">{vehicle.turningCircle} metres</div>
                            </li>
                          )}
                          {vehicle.maxRoofLoad && (
                            <li className="">
                              <div className="list-label">Max roof load</div>
                              <div className="list-stat">{vehicle.maxRoofLoad} kg</div>
                            </li>
                          )}
                          {vehicle.kerbWeight && (
                            <li className="">
                              <div className="list-label">Minimum kerb weight</div>
                              <div className="list-stat">{vehicle.kerbWeight} kg</div>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>
              ) : null}
              {/* More details will be added here */}
              <div className="detail-disclaimer">
                <p>For more info on this vehicle call our showroom on 01780 435024</p>
                <p>
                  Every effort has been made to ensure the accuracy of the above information but
                  errors may occur. Please check with a salesperson.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Static content will be added here */}
    </div>
  );
};

export default VehicleDetail;
