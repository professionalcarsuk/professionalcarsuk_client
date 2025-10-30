import React from "react";
import {
  Hero,
  FeaturedVehicles,
  PurchaseSection,
  PartnersSection,
  WarrantySection,
  TypesSection,
  FooterTopSection,
} from "../components";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <FeaturedVehicles />
      <PurchaseSection />
      <PartnersSection />
      <WarrantySection />
      <TypesSection />
      <FooterTopSection />
    </div>
  );
};

export default Home;
