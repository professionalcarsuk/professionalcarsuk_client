import React from "react";
import "./WarrantySection.css";

const WarrantySection = () => {
  return (
    <div
      className="row-block row-block--finance visible"
      style={{
        backgroundImage: `url(/images/promo-full__bg.1749717714.jpg)`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="wrapper">
        <div className="container">
          <div className="finance-panels">
            <div className="text-panel">
              <div className="text-panel__heading">Warranty</div>
              <div className="text-panel__text">
                <p>Drive away with complete peace of mind.</p>
              </div>
              <div className="text-panel__link">
                <a
                  href="/warranty"
                  title="Warranty"
                  className="btn btn--feature-4"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantySection;
