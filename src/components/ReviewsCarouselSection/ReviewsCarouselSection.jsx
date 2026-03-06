import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import "./ReviewsCarouselSection.css";

const fallbackReviews = [
  {
    title: "Great Service",
    text: "Friendly team and a straightforward buying process from start to finish.",
    author: "R. Fielding",
    date: "2025-12-02",
    source: "Autotrader",
    stars: 5,
  },
];

const formatReviewDate = (dateValue) => {
  if (!dateValue) return "";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(parsed);
};

const renderStars = (rating) => {
  const stars = Math.max(1, Math.min(5, Number(rating) || 0));
  if (!stars) return "";
  return `${"★".repeat(stars)}${"☆".repeat(5 - stars)}`;
};

const trimReviewText = (text, limit = 50) => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const getReviewUrl = (review, reviewSettings) => {
  const source = (review?.source || "").toLowerCase();
  const googleUrl =
    reviewSettings?.googleUrl ||
    "https://www.google.com/search?q=Professional+Cars+Limited+reviews";
  const autotraderUrl =
    reviewSettings?.autotraderUrl ||
    "https://www.autotrader.co.uk/dealers/buckinghamshire/aylesbury/professional-cars-ltd-10001305";

  return source === "autotrader" ? autotraderUrl : googleUrl;
};

const ReviewsCarouselSection = () => {
  const { settings } = useSiteSettings();
  const viewportRef = useRef(null);
  const isDownRef = useRef(false);
  const activePointerIdRef = useRef(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const reviews = useMemo(
    () =>
      settings?.review?.reviews?.length
        ? settings.review.reviews.slice(0, 10)
        : fallbackReviews,
    [settings]
  );

  const carouselReviews = useMemo(
    () => (reviews.length > 1 ? [...reviews, ...reviews] : reviews),
    [reviews]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reviews.length <= 1) return undefined;

    const stepPx = 1;
    const intervalMs = 22;

    const timer = setInterval(() => {
      if (!viewport || isDownRef.current) return;
      viewport.scrollLeft += stepPx;

      const halfWidth = viewport.scrollWidth / 2;
      if (viewport.scrollLeft >= halfWidth) {
        viewport.scrollLeft -= halfWidth;
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePointerDown = (e) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (e.button !== undefined && e.button !== 0) return;

    isDownRef.current = true;
    setIsDragging(true);
    activePointerIdRef.current = e.pointerId;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = viewport.scrollLeft;
    suppressClickRef.current = false;

  };

  const handlePointerMove = (e) => {
    const viewport = viewportRef.current;
    if (!viewport || !isDownRef.current) return;
    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;

    const delta = e.pageX - startXRef.current;
    if (Math.abs(delta) > 6) suppressClickRef.current = true;
    viewport.scrollLeft = startScrollLeftRef.current - delta;
  };

  const handlePointerUp = (e) => {
    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;

    isDownRef.current = false;
    setIsDragging(false);

    activePointerIdRef.current = null;
  };

  const handleCardClick = (e) => {
    if (!suppressClickRef.current) return;
    e.preventDefault();
    suppressClickRef.current = false;
  };

  return (
    <div className="row-block html6 reviews-carousel-section">
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="pad-10 overflow-hidden">
              <div className="reviews-carousel-section__content">
                <div className="reviews-carousel-section__heading-div">
                  <h2 className="reviews-carousel-section__heading">Customer Reviews</h2>
                </div>
                <div
                  ref={viewportRef}
                  className={`reviews-carousel-section__viewport ${isDragging ? "is-dragging" : ""}`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <div className="reviews-carousel-section__track">
                    {carouselReviews.map((review, index) => (
                      <a
                        key={`${review.author || "review"}-${index}`}
                        className="reviews-carousel-section__card"
                        href={getReviewUrl(review, settings?.review)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCardClick}
                      >
                        <p className="reviews-carousel-section__meta">
                          {review.author || "Verified customer"}
                          {review.date ? ` | ${formatReviewDate(review.date)}` : ""}
                          {review.source ? ` | ${review.source}` : ""}
                          {review.stars ? " | " : ""}
                          {review.stars ? (
                            <span className="reviews-carousel-section__stars">{renderStars(review.stars)}</span>
                          ) : null}
                        </p>
                        {review.title ? (
                          <h3 className="reviews-carousel-section__headline">{review.title}</h3>
                        ) : null}
                        <p className="reviews-carousel-section__text">{trimReviewText(review.text, 50)}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCarouselSection;
