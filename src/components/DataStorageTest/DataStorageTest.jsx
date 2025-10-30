// Test component to demonstrate cookie and localStorage functionality
// This can be used for testing or as a reference for implementation

import React, { useState, useEffect } from "react";
import { CookieStorage, LocalStorage } from "../../utils/cookieStorage";
import { getAllStoredData, toggleFavourite } from "../../utils/dataManager";

const DataStorageTest = () => {
  const [storedData, setStoredData] = useState({});
  const [testVehicleId, setTestVehicleId] = useState("123");

  useEffect(() => {
    // Load all stored data on component mount
    const data = getAllStoredData();
    setStoredData(data);
  }, []);

  const refreshData = () => {
    const data = getAllStoredData();
    setStoredData(data);
  };

  const testUtmSave = () => {
    CookieStorage.setUtmParameters({
      utm_source: "test_source",
      utm_medium: "test_medium",
      utm_campaign: "test_campaign",
    });
    refreshData();
  };

  const testClickTrackingSave = () => {
    CookieStorage.setClickTrackingData({
      id: "test_id",
      name: "Test Site",
      accountId: 1234,
      data: {
        clickAccountId: 5678,
        utm_source: "direct",
      },
    });
    refreshData();
  };

  const testFavouriteToggle = () => {
    toggleFavourite(testVehicleId);
    refreshData();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>Data Storage Test Component</h2>
      <p>
        This component demonstrates the cookie and localStorage functionality
        matching your old website.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Test Actions:</h3>
        <button onClick={testUtmSave} style={{ marginRight: "10px" }}>
          Save UTM Data
        </button>
        <button onClick={testClickTrackingSave} style={{ marginRight: "10px" }}>
          Save Click Tracking
        </button>
        <button onClick={refreshData} style={{ marginRight: "10px" }}>
          Refresh Data
        </button>
        <br />
        <input
          type="text"
          value={testVehicleId}
          onChange={(e) => setTestVehicleId(e.target.value)}
          placeholder="Vehicle ID"
          style={{ marginTop: "10px", marginRight: "10px" }}
        />
        <button onClick={testFavouriteToggle}>Toggle Favourite</button>
      </div>

      <div>
        <h3>Current Stored Data:</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          {JSON.stringify(storedData, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Data Types Being Saved:</h3>
        <ul>
          <li>
            <strong>Cookies:</strong> consentAcceptedRejected, vehicle_makes,
            website_locations, website_telephone, _utmParameters, _click_vc_data
          </li>
          <li>
            <strong>LocalStorage:</strong> cookieConsent,
            click_gtm_default_consents, favourites
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DataStorageTest;
