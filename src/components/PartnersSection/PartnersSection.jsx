import React from "react";
import "./PartnersSection.css";

const PartnersSection = () => {
  const partners = [
    {
      name: "Alphera",
      image: "/images/partner-alphera.png",
      alt: "Partner Blue Motor Finance",
    },
    {
      name: "Mann Island",
      image: "/images/partner-mannisland.png",
      alt: "Partner Mann Island",
    },
    {
      name: "HPI",
      image: "/images/partner-hpi.png",
      alt: "Partner HPI",
    },
    {
      name: "SAF",
      image: "/images/partner-saf.png",
      alt: "Partner SAF",
    },
  ];

  return (
    <div className="row-block html6">
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="pad-10 overflow-hidden">
              <div className="partner-brands">
                <div className="partner-brands__heading-div">
                  <h2 className="partner-brands__heading">
                    Our Partner Brands
                  </h2>
                </div>
                <div className="partner-brands__logos">
                  {partners.map((partner, index) => (
                    <div
                      key={index}
                      className={`fourcol center ${index === 2 ? "last" : ""}`}
                    >
                      <img
                        className="responsive-img"
                        src={partner.image}
                        alt={partner.alt}
                        width={120}
                        height={97}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
