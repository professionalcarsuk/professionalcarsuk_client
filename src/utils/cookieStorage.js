// Cookie and LocalStorage utilities to match old website functionality

export const CookieStorage = {
  // Save consent status
  setConsentAccepted: () => {
    document.cookie =
      "consentAcceptedRejected=true; path=/; max-age=" +
      365 * 24 * 60 * 60 +
      "; SameSite=Lax";
    localStorage.setItem("cookieConsent", "true");
  },

  // Get consent status
  getConsentAccepted: () => {
    return (
      localStorage.getItem("cookieConsent") === "true" ||
      document.cookie.includes("consentAcceptedRejected=true")
    );
  },

  // Save vehicle makes count
  setVehicleMakes: (count) => {
    document.cookie = `vehicle_makes=${count}; path=/; max-age=${
      24 * 60 * 60
    }; SameSite=Lax`;
  },

  // Get vehicle makes count
  getVehicleMakes: () => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("vehicle_makes="));
    return cookie ? cookie.split("=")[1] : null;
  },

  // Save website locations count
  setWebsiteLocations: (count) => {
    document.cookie = `website_locations=${count}; path=/; max-age=${
      24 * 60 * 60
    }; SameSite=Lax`;
  },

  // Get website locations count
  getWebsiteLocations: () => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("website_locations="));
    return cookie ? cookie.split("=")[1] : null;
  },

  // Save website telephone
  setWebsiteTelephone: (phone) => {
    const encodedPhone = encodeURIComponent(phone);
    document.cookie = `website_telephone=${encodedPhone}; path=/; max-age=${
      30 * 24 * 60 * 60
    }; SameSite=Lax`;
  },

  // Get website telephone
  getWebsiteTelephone: () => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("website_telephone="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  },

  // Save UTM parameters
  setUtmParameters: (params) => {
    const encodedParams = encodeURIComponent(JSON.stringify(params));
    document.cookie = `_utmParameters=${encodedParams}; path=/; max-age=${
      24 * 60 * 60
    }; SameSite=Lax`;
  },

  // Get UTM parameters
  getUtmParameters: () => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("_utmParameters="));
    if (cookie) {
      try {
        return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  // Save click tracking data
  setClickTrackingData: (data) => {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    document.cookie = `_click_vc_data=${encodedData}; path=/; SameSite=Lax`;
  },

  // Get click tracking data
  getClickTrackingData: () => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("_click_vc_data="));
    if (cookie) {
      try {
        return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
      } catch (e) {
        return null;
      }
    }
    return null;
  },
};

export const LocalStorage = {
  // Save GTM consents
  setGtmConsents: (consents) => {
    localStorage.setItem(
      "click_gtm_default_consents",
      JSON.stringify(consents)
    );
  },

  // Get GTM consents
  getGtmConsents: () => {
    const consents = localStorage.getItem("click_gtm_default_consents");
    return consents ? JSON.parse(consents) : null;
  },

  // Save user favourites
  setFavourites: (favourites) => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  },

  // Get user favourites
  getFavourites: () => {
    const favourites = localStorage.getItem("favourites");
    return favourites ? JSON.parse(favourites) : { ids: [], source: "" };
  },

  // Add to favourites
  addToFavourites: (id) => {
    const favourites = LocalStorage.getFavourites();
    if (!favourites.ids.includes(id)) {
      favourites.ids.push(id);
      LocalStorage.setFavourites(favourites);
    }
  },

  // Remove from favourites
  removeFromFavourites: (id) => {
    const favourites = LocalStorage.getFavourites();
    favourites.ids = favourites.ids.filter((favId) => favId !== id);
    LocalStorage.setFavourites(favourites);
  },

  // Check if item is favourited
  isFavourite: (id) => {
    const favourites = LocalStorage.getFavourites();
    return favourites.ids.includes(id);
  },
};

// Initialize default data on first load
export const initializeDefaultData = () => {
  // Set default GTM consents if not already set
  if (!LocalStorage.getGtmConsents()) {
    const defaultConsents = {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      personalization_storage: "denied",
      security_storage: "granted",
    };
    LocalStorage.setGtmConsents(defaultConsents);
  }

  // Initialize favourites if not exists
  if (!localStorage.getItem("favourites")) {
    LocalStorage.setFavourites({ ids: [], source: "z0tryf2o8" });
  }

  // Set default website data
  if (!CookieStorage.getVehicleMakes()) {
    CookieStorage.setVehicleMakes("11");
  }

  if (!CookieStorage.getWebsiteLocations()) {
    CookieStorage.setWebsiteLocations("0");
  }

  if (!CookieStorage.getWebsiteTelephone()) {
    CookieStorage.setWebsiteTelephone("01780 435024");
  }
};
