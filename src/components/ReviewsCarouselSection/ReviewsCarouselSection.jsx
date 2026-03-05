import React from "react";
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

  const reviews = settings?.review?.reviews?.length
    ? settings.review.reviews.slice(0, 10)
    : fallbackReviews;

  const carouselReviews = reviews.length > 1 ? [...reviews, ...reviews] : reviews;

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
                <div className="reviews-carousel-section__viewport">
                  <div className="reviews-carousel-section__track">
                    {carouselReviews.map((review, index) => (
                      <a
                        key={`${review.author || "review"}-${index}`}
                        className="reviews-carousel-section__card"
                        href={getReviewUrl(review, settings?.review)}
                        target="_blank"
                        rel="noopener noreferrer"
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
