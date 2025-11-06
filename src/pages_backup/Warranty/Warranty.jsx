import React from "react";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import "./Warranty.css";

const Warranty = () => {
  const mainContent = (
    <div className="pad-20 overflow-hidden">
      <p>
        <strong>Drive away with complete peace of mind.</strong>
      </p>
      <p>
        We pride ourselves on providing mechanically sound and robust products
        that have been maintained in accordance with the manufacturer's service
        schedule wherever possible. That said, as cars are after all mechanical,
        we offer a standard, totally free 3 month parts and labour warranty on
        all vehicles.
      </p>
      <h2>Extendable Warranty</h2>
      <p>
        There is also the option to purchase a more comprehensive product up to
        a period of 3 years at an additional cost. Please call 07788929755 for
        a detailed overview of all products and services available.
      </p>
      <h2>Warranty Claim Form</h2>
      <iframe
        id="displayPage_672"
        width="100%"
        height="806px"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://www.vehicle-enquiry.co.uk/forms/custom_form_css_dynamic_dev/index.php?url=https://car-listing-frontend-peach.vercel.app/&amp;utm_source=direct&amp;form=672&amp;returnUrl=complaint-response.php"
        className="style-w4oix"
        title="Warranty Claim Form"
      ></iframe>
    </div>
  );

  return (
    <PageWithSidebarLayout
      pageClass="warranty-pg"
      headerTitle="Warranty"
      headerClass="page-hdr--warranty"
      showSidebar={true}
    >
      {mainContent}
    </PageWithSidebarLayout>
  );
};

export default Warranty;
