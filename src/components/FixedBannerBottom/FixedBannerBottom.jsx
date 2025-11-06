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
          PLEASE NOTE WE CAN DROP AND COLLECT' - CALL US ON 07788929755 OR EMAIL info@professionalcars.co.uk FOR MORE INFORMATION.
        </marquee>
      </div>
    </div>
  );
};

export default FixedBannerBottom;
