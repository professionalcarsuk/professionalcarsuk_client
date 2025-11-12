import React from "react";
import "./PurchaseSection.css";

const PurchaseSection = () => {
  return (
    <div className="row-block html8 snipcss-lgao7">
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="overflow-hidden">
              <div className="rebuy-promo sm:px-0 px-3">
                <div className="rebuy-promo__head">
                  <h3>THINKING OF SELLING YOUR CAR?</h3>
                </div>
                <div className="rebuy-promo__text">
                  <p>
                    <strong>
                      We could be interested in buying your car back.
                      <br />
                      If you have purchased a vehicle from us and the car was
                      registered from March 2017 onwards, please contact{" "}
                      <a href="mailto:michael@sjamesprestige.com">
                        michael@sjamesprestige.com
                      </a>{" "}
                      for a FREE valuation.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;
