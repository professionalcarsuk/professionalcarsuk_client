import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CookieConsentBanner.css";
import { CookieStorage, LocalStorage } from "../../utils/cookieStorage";

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented using utility function
    const hasConsented = CookieStorage.getConsentAccepted();
    if (!hasConsented) {
      setIsVisible(true);
    }

    // Listen for consent acceptance from other components
    const handleConsentAccepted = () => {
      setIsVisible(false);
    };

    window.addEventListener("cookieConsentAccepted", handleConsentAccepted);

    return () => {
      window.removeEventListener(
        "cookieConsentAccepted",
        handleConsentAccepted
      );
    };
  }, []);

  const handleAccept = () => {
    // Use utility function to save consent
    CookieStorage.setConsentAccepted();

    // Save detailed GTM consents to localStorage (matching old website)
    const gtmConsents = {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
    };
    LocalStorage.setGtmConsents(gtmConsents);

    setIsVisible(false);

    // Initialize Google Analytics if available
    if (window.gtag) {
      window.gtag("consent", "update", gtmConsents);
    }
  };

  if (!isVisible) return null;

  return (
    <div id="global-consent-banner" className="global-consent-banner">
      <div className="global-consent-banner__container">
        <div className="global-consent-banner__text">
          <p>
            We use cookies to help our site function correctly and to understand
            how it is used. By clicking "I understand", you agree to us doing
            so. You can find out more about cookies and how to manage them in
            our <Link to="/cookie-policy">Cookie Policy</Link>.
          </p>
        </div>
        <div className="global-consent-banner__buttons">
          <button className="global-consent-banner__btn" onClick={handleAccept}>
            I understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
