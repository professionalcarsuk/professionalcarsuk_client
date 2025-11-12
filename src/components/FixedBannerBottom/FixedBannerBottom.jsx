import React from "react";
import "./FixedBannerBottom.css";

const FixedBannerBottom = () => {
  return (
    <div className="covid-banner">
      <div className="covid-banner__left">
        <i className="ci ci-exclamation-triangle-l"></i> Important Message
      </div>
      <div className="covid-banner__right">
        <marquee>
          PLEASE NOTE WE ARE ONLINE BASED ONLY AND CONTINUE TO OPERATE AS 'CLICK
          AND COLLECT' - CALL US ON 01780 435024 OR EMAIL
          ENQUIRIES@SJAMESPRESTIGE.COM FOR MORE INFORMATION.
        </marquee>
      </div>
    </div>
  );
};

export default FixedBannerBottom;
