import PageWithSidebarLayout from '../../layouts/PageWithSidebarLayout';
import './SellCar.css';

const SellCar = () => {
  const mainContent = (
    <div className="pad-20 overflow-hidden">
      <p>
        <strong>Looking to sell your car?</strong>
      </p>
      <h2>We buy cars</h2>
      <p>
        We take the hassle out of selling privately plus we have a network of industry contacts
        looking to pay good prices for your vehicle.
      </p>
      <p>Complete our simple to use valuation form below to get started.</p>
      <form action="sellcar" method="post" id="frm_captcha_sellcar" noValidate="novalidate">
        <input type="hidden" name="enquiry_url" value="/sellcar" id="captcha_enquiry_url" />
        <input type="hidden" name="enquiry_form" value="/sellcar" id="captcha_enquiry_form" />
        <h3>Car Valuation</h3>
        <div className="row" id="row_1">
          <div className="sixcol">
            <label>Reg number </label>
          </div>
          <div className="sixcol last">
            <input
              type="text"
              size="10"
              name="registration"
              value=""
              id="captcha_registration"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_2">
          <div className="sixcol">
            <label>Make of car </label>
          </div>
          <div className="sixcol last">
            <input
              type="text"
              size="40"
              name="make"
              value=""
              id="captcha_make"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_3">
          <div className="sixcol">
            <label>Model </label>
          </div>
          <div className="sixcol last">
            <input
              type="text"
              size="40"
              name="model"
              value=""
              id="captcha_model"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_4">
          <div className="sixcol">
            <label>Year </label>
          </div>
          <div className="sixcol last">
            <input
              type="number"
              pattern="[0-9]*"
              size="10"
              name="year"
              value=""
              id="captcha_year"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_5">
          <div className="sixcol">
            <label>Mileage </label>
          </div>
          <div className="sixcol last">
            <input
              type="number"
              pattern="[0-9]*"
              size="10"
              name="mileage"
              value=""
              id="captcha_mileage"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_6">
          <div className="sixcol">
            <label>
              Name{' '}
              <span className="required" aria-required="true">
                *
              </span>
            </label>
          </div>
          <div className="sixcol last">
            <input
              type="text"
              size="40"
              name="name"
              value=""
              id="captcha_name"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_7">
          <div className="sixcol">
            <label>
              Email{' '}
              <span className="required" aria-required="true">
                *
              </span>
            </label>
          </div>
          <div className="sixcol last">
            <input
              type="email"
              size="40"
              name="email"
              value=""
              id="captcha_email"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_8">
          <div className="sixcol">
            <label>Telephone </label>
          </div>
          <div className="sixcol last">
            <input
              type="tel"
              size="40"
              name="telephone"
              value=""
              id="captcha_telephone"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_9">
          <div className="sixcol"></div>
          <div id="sellcar-submit" className="sixcol last">
            <div id="new_captcha" className="row">
              <div className="row">
                <div className="sixcol">
                  <label id="captchaText">What is : 4 + 4 </label>
                </div>
                <div className="sixcol last">
                  <input
                    className="formInput"
                    id="captchaResponse"
                    size="40"
                    value=""
                    placeholder="Answer"
                    type="text"
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
            <input type="submit" value="Submit" className="button green" id="captcha_submit" />
          </div>
        </div>
        <input type="hidden" name="active_status" value="active" />
      </form>
    </div>
  );

  return (
    <PageWithSidebarLayout
      pageClass="sellcar-pg"
      headerTitle="Vehicle Valuation"
      headerClass="page-hdr--sellcar"
      showSidebar={true}
    >
      {mainContent}
    </PageWithSidebarLayout>
  );
};

export default SellCar;
