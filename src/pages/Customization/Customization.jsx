import React from "react";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import "./Customization.css";

const Customization = () => {
  const mainContent = (
    <div className="pad-20 overflow-hidden">
      <h2> Professional Cars Where Style Meets Performance </h2>
      <p>
        {" "}
        Elevate your vehicle's style with our bespoke kit and wheels packages.
        Explore our selection of styling parts designed to transform your car
        into a true reflection of your personality, with options including
        wheels, front splitters, side skirts, rear diffusers, spoilers, brake
        calliper painting, tinting, ceramic coating and more! Open a world of
        customisation possibilities for your car.{" "}
      </p>
      <p>
        {" "}
        At Professional Cars, we go beyond just offering the styling parts for
        your vehicle. We provide a comprehensive package that includes the
        fitment and a 12 month back to base warranty as part of the overall kit.
        Contact us through WhatsApp for pricing and details.{" "}
      </p>
      <p>
        {" "}
        Are you one of Professional Cars's valued customers and purchased a vehicle from us in
        the past? If so, why not take advantage of our styling rejuvenation
        service. We can upgrade your old parts for new ones at a discounted
        price. Give your vehicle a fresh new look and feel while enjoying
        exclusive savings as a token of our appreciation for your continued
        loyalty.{" "}
      </p>
      <p>
        {" "}
        Don't miss out on this opportunity to enhance our vehicle's aesthetic
        appeal. Contact us today to learn more about how you can benefit from
        our services tailored specifically for you.{" "}
      </p>
      <br />
      <img
        className="responsive-img"
        src="/images/mod-img.1749717714.jpg"
        alt="Vehicle Customization"
      />
      <br />
      <br />
    </div>
  );

  return (
    <PageWithSidebarLayout
      pageClass="customisation-pg"
      headerTitle="Customisation"
      headerClass="page-hdr--customisation"
      showSidebar={false}
    >
      {mainContent}
    </PageWithSidebarLayout>
  );
};

export default Customization;
