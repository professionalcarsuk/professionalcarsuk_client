import React from "react";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import "./PartExchange.css";

const PartExchange = () => {
  const mainContent = (
    <div className="pad-20 overflow-hidden">
      <p>
        <strong>
          Our dedicated team of vehicle valuation experts are ready to give you
          an up-to-the-minute market value of your car.
        </strong>
      </p>
      <h2>Free Quote</h2>
      <p>
        If you are considering part exchanging your current vehicle we are able
        to provide you with a free, no-obligation quote.
      </p>
      <p>
        Please contact one of our Sales Consultants on 07788929755 or complete
        our valuation form below.
      </p>
      <p>
        We will contact you as soon as possible with the best possible price for
        your car.
      </p>
      <div className="row fin-calc-form">
        <div className="twelvecol">
          <iframe
            id="frame_finance"
            scrolling="no"
            frameBorder="0"
            width="100%"
            height="800px"
            src="https://www.vehicle-enquiry.co.uk/forms/partx/index.php?url=https%3A%2F%2Fcar-listing-frontend-peach.vercel.app&amp;hideGeneralSelect=0&amp;partex_vehicle_id=0&amp;utm_source=direct"
            title="Part Exchange Valuation Form"
          ></iframe>
        </div>
      </div>
    </div>
  );

  return (
    <PageWithSidebarLayout
      pageClass="partex-pg"
      headerTitle="Part Exchange"
      headerClass="page-hdr--partex"
      showSidebar={true}
    >
      {mainContent}
    </PageWithSidebarLayout>
  );
};

export default PartExchange;
