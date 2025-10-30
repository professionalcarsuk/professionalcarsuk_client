# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# 🍪 Cookie & Data Storage System

This application implements a comprehensive cookie and localStorage management system that replicates the data storage patterns from the legacy website. The system is GDPR-compliant and provides utilities for managing user consent, tracking data, and persistent storage.

## 📊 Data Storage Overview

### Cookies (Document Cookies)

The following cookies are automatically managed by the system:

| Cookie Name               | Purpose                     | Expiration | Example Value                       |
| ------------------------- | --------------------------- | ---------- | ----------------------------------- |
| `consentAcceptedRejected` | GDPR consent status         | 1 year     | `true`                              |
| `vehicle_makes`           | Number of vehicle makes     | 1 day      | `11`                                |
| `website_locations`       | Number of website locations | 1 day      | `0`                                 |
| `website_telephone`       | Contact telephone number    | 30 days    | `01780 435024`                      |
| `_utmParameters`          | UTM tracking parameters     | 1 day      | `{"utm_source":"google"}`           |
| `_click_vc_data`          | Click tracking data         | Session    | `{"id":"website","accountId":1234}` |

### LocalStorage

The following data is stored in browser localStorage:

| Key                          | Purpose                       | Example Value                                            |
| ---------------------------- | ----------------------------- | -------------------------------------------------------- |
| `cookieConsent`              | Basic consent flag            | `"true"`                                                 |
| `click_gtm_default_consents` | Detailed GTM consent settings | `{"ad_storage":"granted","analytics_storage":"granted"}` |
| `favourites`                 | User favourite vehicles       | `{"ids":[123,456],"source":"app"}`                       |

## 🚀 Quick Start

### Automatic Initialization

The system automatically initializes default values when the app starts:

```javascript
// This happens automatically in main.jsx
import { initializeDefaultData } from "./utils/cookieStorage";
initializeDefaultData();
```

### Basic Usage

```javascript
import { CookieStorage, LocalStorage } from "./utils/cookieStorage";

// Check consent status
const hasConsented = CookieStorage.getConsentAccepted();

// Save UTM parameters
CookieStorage.setUtmParameters({
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "summer_sale",
});

// Get stored telephone
const phone = CookieStorage.getWebsiteTelephone();

// Manage favourites
import { useFavourites } from "./hooks/useFavourites";

function MyComponent() {
  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  return (
    <button onClick={() => toggleFavourite(vehicleId)}>
      {isFavourite(vehicleId) ? "Remove from Favourites" : "Add to Favourites"}
    </button>
  );
}
```

## 🛠️ API Reference

### CookieStorage

#### Consent Management

```javascript
CookieStorage.setConsentAccepted(); // Save consent
CookieStorage.getConsentAccepted(); // Check consent (boolean)
```

#### Website Data

```javascript
CookieStorage.setVehicleMakes(count); // Save vehicle count
CookieStorage.getVehicleMakes(); // Get vehicle count

CookieStorage.setWebsiteLocations(count); // Save location count
CookieStorage.getWebsiteLocations(); // Get location count

CookieStorage.setWebsiteTelephone(phone); // Save phone number
CookieStorage.getWebsiteTelephone(); // Get phone number
```

#### Tracking Data

```javascript
CookieStorage.setUtmParameters(params); // Save UTM data
CookieStorage.getUtmParameters(); // Get UTM data

CookieStorage.setClickTrackingData(data); // Save click tracking
CookieStorage.getClickTrackingData(); // Get click tracking
```

### LocalStorage

#### GTM Consents

```javascript
LocalStorage.setGtmConsents({
  ad_storage: "granted",
  analytics_storage: "granted",
  // ... other consent types
});
LocalStorage.getGtmConsents(); // Returns consent object
```

#### Favourites Management

```javascript
LocalStorage.setFavourites({ ids: [1, 2, 3], source: "app" });
LocalStorage.getFavourites(); // Returns favourites object

LocalStorage.addToFavourites(vehicleId);
LocalStorage.removeFromFavourites(vehicleId);
LocalStorage.isFavourite(vehicleId); // Returns boolean
```

### Data Manager (High-level API)

```javascript
import {
  saveUtmParameters,
  saveClickTrackingData,
  toggleFavourite,
  getAllStoredData,
  clearAllData,
} from "./utils/dataManager";

// Save tracking data
saveUtmParameters({ utm_source: "direct" });
saveClickTrackingData({ id: "website", accountId: 123 });

// Toggle favourites
toggleFavourite(vehicleId);

// Get all stored data (for debugging)
const allData = getAllStoredData();

// Clear all data (GDPR compliance)
clearAllData();
```

## ⚙️ Configuration

### Default Values

The system initializes with these default values:

```javascript
// Set in initializeDefaultData()
CookieStorage.setVehicleMakes("11");
CookieStorage.setWebsiteLocations("0");
CookieStorage.setWebsiteTelephone("01780 435024");

LocalStorage.setGtmConsents({
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  personalization_storage: "denied",
  security_storage: "granted",
});

LocalStorage.setFavourites({ ids: [], source: "z0tryf2o8" });
```

### Cookie Expiration Times

- Consent cookies: 1 year
- Tracking cookies: 1 day
- Telephone: 30 days
- Session cookies: Browser session

### GTM Integration

The system automatically updates Google Tag Manager consents:

```javascript
if (window.gtag) {
  window.gtag("consent", "update", gtmConsents);
}
```

## 🔒 GDPR Compliance

### Consent Management

- Users must explicitly accept cookies via banner or policy page
- Consent is stored persistently and checked on every page load
- Cross-component communication ensures consistent consent state

### Data Clearing

- `clearAllData()` function removes all stored data
- Individual data types can be cleared using specific methods
- Cookie expiration ensures automatic cleanup

### User Rights

- Right to access: `getAllStoredData()`
- Right to erasure: `clearAllData()`
- Right to object: Modify consent settings

## 🧪 Testing

### DataStorageTest Component

Use the included test component to verify functionality:

```javascript
import { DataStorageTest } from "./components";

// Add to any page for testing
<DataStorageTest />;
```

This component provides:

- Real-time data viewing
- Interactive testing buttons
- UTM parameter simulation
- Favourite management testing

### Browser Developer Tools

Check stored data in:

- **Cookies:** Application → Storage → Cookies
- **LocalStorage:** Application → Storage → Local Storage

## 📁 File Structure

```
src/
├── components/
│   ├── CookieConsentBanner/     # Consent banner component
│   └── DataStorageTest/         # Testing component
├── hooks/
│   └── useFavourites.js         # Favourites management hook
├── pages/
│   └── CookiePolicyPage/        # Cookie policy with accept button
├── utils/
│   ├── cookieStorage.js         # Core cookie/localStorage utilities
│   ├── dataManager.js           # High-level data management
│   └── index.js                 # Utility exports
└── main.jsx                     # App initialization
```

## 🔄 Migration from Legacy System

This implementation replicates the exact data structure from the old website:

### Old Website Cookies → New System

- `consentAcceptedRejected` ✅ Implemented
- `_ga`, `_ga_*` → Handled by Google Analytics
- `_click_vc_data` ✅ Implemented
- `_utmParameters` ✅ Implemented
- `PHPSESSID` → Handled by server
- Custom data cookies ✅ All implemented

### Old Website localStorage → New System

- `click_gtm_default_consents` ✅ Implemented
- `favourites` ✅ Implemented

## 🚨 Important Notes

1. **SameSite Cookies**: All cookies use `SameSite=Lax` for security
2. **Secure Context**: Cookies work in both HTTP and HTTPS
3. **Browser Compatibility**: Supports all modern browsers
4. **Data Persistence**: Data survives browser restarts
5. **Performance**: Minimal impact on page load times

## 🐛 Troubleshooting

### Banner Not Showing

- Check if `cookieConsent` exists in localStorage
- Clear localStorage and refresh

### Data Not Saving

- Check browser cookie settings
- Verify incognito/private mode restrictions
- Check for JavaScript errors in console

### Import Errors

- Ensure correct relative paths: `../../utils/cookieStorage`
- Check file exists in `src/utils/` directory

---

For questions or issues with the cookie system, refer to the component implementations or create an issue in the project repository.
