import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecentVehicles, selectVehicleItems } from '../../store/vehicleSlice';
import './FeaturedVehicles.css';

const FeaturedVehicles = () => {
  const dispatch = useDispatch();
  const allVehicles = useSelector(selectVehicleItems) || [];

  // Number of vehicles to show initially and how many to add when loading more
  const [displayCount, setDisplayCount] = useState(12);

  // Pull recent vehicles on mount
  useEffect(() => {
    dispatch(fetchRecentVehicles());
  }, [dispatch]);

  // The vehicles we actually render (slice of fetched vehicles)
  const vehicles = allVehicles.slice(0, displayCount);

  // Log raw payload for debugging
  useEffect(() => {}, [allVehicles]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [itemWidth, setItemWidth] = useState(320);
  const [itemMargin, setItemMargin] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const containerRef = useRef(null);
  const autoSlideRef = useRef(null);

  // Update items per view and dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth <= 480) {
        setItemsPerView(1);
        setItemWidth(250);
        setItemMargin(10);
      } else if (window.innerWidth <= 768) {
        setItemsPerView(1);
        setItemWidth(280);
        setItemMargin(15);
      } else if (window.innerWidth <= 1024) {
        setItemsPerView(2);
        setItemWidth(320);
        setItemMargin(20);
      } else if (window.innerWidth <= 1200) {
        setItemsPerView(3);
        setItemWidth(320);
        setItemMargin(20);
      } else {
        setItemsPerView(4);
        setItemWidth(320);
        setItemMargin(20);
      }
    };

    updateDimensions();
    // Reset current index when screen size changes
    setCurrentIndex(0);
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, vehicles.length - itemsPerView);
      const next = prev >= maxIndex ? 0 : prev + 1;
      // if we're near the end request more
      if (next >= vehicles.length - itemsPerView - 2) {
        setDisplayCount((c) => Math.min(allVehicles.length, c + 8));
      }
      return next;
    });
  };

  const goPrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, vehicles.length - itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // Auto-slide functionality (pauses while dragging)
  useEffect(() => {
    if (isDragging) return;
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, vehicles.length - itemsPerView);
        const next = prevIndex >= maxIndex ? 0 : prevIndex + 1;
        if (next >= vehicles.length - itemsPerView - 2) {
          setDisplayCount((c) => Math.min(allVehicles.length, c + 8));
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(autoSlideRef.current);
  }, [vehicles.length, itemsPerView, isDragging]);

  // sync translate when index changes
  useEffect(() => {
    const base = currentIndex * (itemWidth + itemMargin);
    setCurrentTranslate(base);
    if (containerRef.current && !isDragging) {
      containerRef.current.style.transition = 'transform 0.5s ease-in-out';
      containerRef.current.style.transform = `translateX(-${base}px)`;
    }
  }, [currentIndex, itemWidth, itemMargin, isDragging]);

  // pointer/touch handlers
  const pointerDown = (pageX) => {
    setIsDragging(true);
    setStartX(pageX);
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    if (containerRef.current) containerRef.current.style.transition = 'none';
  };

  const pointerMove = (pageX) => {
    if (!isDragging) return;
    const deltaX = pageX - startX;
    const base = currentIndex * (itemWidth + itemMargin);
    const next = base - deltaX;
    setCurrentTranslate(next);
    if (containerRef.current) containerRef.current.style.transform = `translateX(-${next}px)`;
  };

  const pointerUp = (pageX) => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaX = pageX - startX;
    const threshold = 50;
    if (deltaX > threshold) {
      goPrev();
    } else if (deltaX < -threshold) {
      goNext();
    } else {
      const base = currentIndex * (itemWidth + itemMargin);
      if (containerRef.current) {
        containerRef.current.style.transition = 'transform 0.5s ease-in-out';
        containerRef.current.style.transform = `translateX(-${base}px)`;
      }
    }
    // restart auto slide after a short delay
    setTimeout(() => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, vehicles.length - itemsPerView);
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 3000);
    }, 800);
  };

  // Intersection observer for infinite-load: attach to containerRef's parent to watch when we approach the end
  useEffect(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // when the right edge is visible, load more if available
            setDisplayCount((c) => {
              if (c >= allVehicles.length) return c;
              return Math.min(allVehicles.length, c + 8);
            });
          }
        }
      },
      {
        root: parent,
        threshold: 0.9,
      }
    );

    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [containerRef.current, allVehicles.length]);

  return (
    <div className="row-block car-carousel">
      <div className="wrapper">
        <div className="container">
          <div id="hmpg-picks-carousel" className="touchcarousel clear-fix">
            <em className="row-block__heading center">Ones To Watch</em>
            <div
              className="touchcarousel-wrapper grab-cursor"
              onMouseDown={(e) => pointerDown(e.pageX)}
              onMouseMove={(e) => pointerMove(e.pageX)}
              onMouseUp={(e) => pointerUp(e.pageX)}
              onMouseLeave={(e) => isDragging && pointerUp(e.pageX)}
              onTouchStart={(e) => pointerDown(e.touches[0].pageX)}
              onTouchMove={(e) => pointerMove(e.touches[0].pageX)}
              onTouchEnd={(e) => pointerUp(e.changedTouches[0].pageX)}
            >
              <ul
                ref={containerRef}
                className="touchcarousel-container"
                style={{
                  // transform: `translateX(-${currentTranslate}px)`,
                  transform: `translateX(-${currentIndex * (itemWidth + itemMargin)}px)`,
                  transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
                }}
              >
                {vehicles.map((v) => {
                  // Normalize display fields using backend light projection and fallbacks
                  const title =
                    v.title ||
                    (v.brand && v.model
                      ? `${v.brand} ${v.model}`
                      : v.formData?.title || 'Untitled');
                  const priceVal =
                    typeof v.price !== 'undefined' && v.price !== null
                      ? v.price
                      : v.formData?.price;
                  const price = priceVal ? `£${Number(priceVal).toLocaleString()}` : '';
                  // finance / price from
                  const financeVal =
                    v.financeMonthly || v.formData?.priceFromFinance || v.formData?.priceFrom;
                  const finance = financeVal ? `£${Number(financeVal).toLocaleString()}` : '';
                  // images may be array of objects or strings
                  let image = '/images/placeholder.jpg';
                  if (v.images && v.images.length) {
                    const first = v.images[0];
                    image = typeof first === 'string' ? first : first.url || first.src || image;
                  } else if (
                    v.formData &&
                    v.formData.existingImages &&
                    v.formData.existingImages.length
                  ) {
                    const first = v.formData.existingImages[0];
                    image = typeof first === 'string' ? first : first.url || first.src || image;
                  } else if (v.formData && v.formData.image) {
                    image = v.formData.image;
                  }
                  const year = v.year || v.formData?.year || '';
                  const subTitle = v.subTitle || v.formData?.subtitle || '';
                  const variant =
                    v.variant ||
                    v.formData?.variant ||
                    (year || subTitle
                      ? `${year && subTitle ? `${year} ${subTitle}` : year || subTitle}`
                      : '');
                  const vehicleId = v._id || v.id;
                  const brandSlug = v.brand
                    ? v.brand.toLowerCase().replace(/\s+/g, '-')
                    : 'unknown';

                  return (
                    <li key={v.id || v._id || vehicleId} className="touchcarousel-item">
                      <Link
                        to={`/vehicle/${brandSlug}/${vehicleId}`}
                        title={`Used ${title} for sale in Aylesbury`}
                      >
                        <img
                          className="home-carousel-image"
                          alt={`${title} ${variant}`}
                          src={image}
                        />
                        <div className="carousel-text">
                          <div className="carousel-info__price-block">
                            <div className="carousel-info__price">
                              <div className="price">{price}</div>
                            </div>
                            {finance && (
                              <div className="carousel-info__finance finance-available">
                                <div className="label">Finance from</div>

                                <div className="monthly">
                                  {finance} <span>p/m</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="carousel-info__title">{title}</div>
                          <div className="carousel-info__variant">{variant}</div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="arrow-holder left">
            <a className="arrow-icon left" onClick={goPrev} aria-label="Previous"></a>
          </div>
          <div className="arrow-holder right">
            <a className="arrow-icon right" onClick={goNext} aria-label="Next"></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicles;
