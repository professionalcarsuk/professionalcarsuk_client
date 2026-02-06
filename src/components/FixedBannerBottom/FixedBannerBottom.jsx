import React from "react";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import "./FixedBannerBottom.css";

const FixedBannerBottom = () => {
  const { settings } = useSiteSettings();
  const bannerText = settings?.bannerText || "PLEASE NOTE WE CAN DROP AND COLLECT - CALL US ON 07788929755 OR EMAIL professionalcarsltd@gmail.com FOR MORE INFORMATION.";

  return (
    <div className="covid-banner">
      <div className="covid-banner__left">
        <i className="ci ci-exclamation-triangle-l"></i> Important Message
      </div>
      <div className="covid-banner__right">
        <marquee>
          {bannerText}
        </marquee>
      </div>
    </div>
  );
};

export default FixedBannerBottom;
