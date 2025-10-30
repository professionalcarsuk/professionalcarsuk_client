// Example usage of cookie and localStorage utilities
// This file demonstrates how to integrate the old website's data saving patterns

import { CookieStorage, LocalStorage } from "./cookieStorage";

// Example: Save UTM parameters when user arrives
export const saveUtmParameters = (utmData) => {
  CookieStorage.setUtmParameters(utmData);
};

// Example: Save click tracking data
export const saveClickTrackingData = (clickData) => {
  CookieStorage.setClickTrackingData(clickData);
};

// Example: Update vehicle count (could be called from admin or API)
export const updateVehicleCount = (count) => {
  CookieStorage.setVehicleMakes(count.toString());
};

// Example: Update website telephone
export const updateWebsiteTelephone = (phone) => {
  CookieStorage.setWebsiteTelephone(phone);
};

// Example: Manage user favourites
export const toggleFavourite = (vehicleId) => {
  if (LocalStorage.isFavourite(vehicleId)) {
    LocalStorage.removeFromFavourites(vehicleId);
    return false; // removed
  } else {
    LocalStorage.addToFavourites(vehicleId);
    return true; // added
  }
};

// Example: Get all stored data (for debugging or admin panel)
export const getAllStoredData = () => {
  return {
    consent: CookieStorage.getConsentAccepted(),
    gtmConsents: LocalStorage.getGtmConsents(),
    favourites: LocalStorage.getFavourites(),
    vehicleMakes: CookieStorage.getVehicleMakes(),
    websiteLocations: CookieStorage.getWebsiteLocations(),
    websiteTelephone: CookieStorage.getWebsiteTelephone(),
    utmParameters: CookieStorage.getUtmParameters(),
    clickTrackingData: CookieStorage.getClickTrackingData(),
  };
};

// Example: Clear all data (for GDPR compliance)
export const clearAllData = () => {
  // Clear localStorage
  localStorage.removeItem("cookieConsent");
  localStorage.removeItem("click_gtm_default_consents");
  localStorage.removeItem("favourites");

  // Clear cookies by setting them to expire
  document.cookie =
    "consentAcceptedRejected=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "vehicle_makes=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "website_locations=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "website_telephone=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "_utmParameters=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "_click_vc_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
