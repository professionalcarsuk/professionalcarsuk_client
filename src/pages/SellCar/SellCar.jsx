import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import {
  updateFormField,
  submitSellCarForm,
  resetForm,
  clearError,
} from "../../store/sellCarSlice";
import "./SellCar.css";

const SellCar = () => {
  const dispatch = useDispatch();
  const { formData, isSubmitting, submitSuccess, submitError } = useSelector(
    (state) => state.sellCar
  );

  // Handle success and error toasts
  useEffect(() => {
    if (submitSuccess) {
      toast.success(
        "Thank you for your vehicle valuation request. We will get back to you with a competitive offer soon!"
      );
      dispatch(resetForm());
    }
  }, [submitSuccess, dispatch]);

  useEffect(() => {
    if (submitError) {
      toast.error(`Error: ${submitError}`);
      dispatch(clearError());
    }
  }, [submitError, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    dispatch(clearError());

    // Basic validation for required fields
    const required = [
      "registration",
      "make",
      "model",
      "name",
      "email",
      "captchaResponse",
    ];

    // Check for empty or whitespace-only fields
    const emptyFields = [];
    const whitespaceOnlyFields = [];

    for (const field of required) {
      if (!formData[field]) {
        emptyFields.push(field);
      } else if (formData[field].trim() === "") {
        whitespaceOnlyFields.push(field);
      }
    }

    if (emptyFields.length > 0) {
      toast.error("Please fill all required fields");
      return;
    }

    if (whitespaceOnlyFields.length > 0) {
      toast.error(
        "Fields cannot contain only spaces. Please enter valid information."
      );
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Captcha validation
    if (!formData.captchaResponse.trim()) {
      toast.error("Please answer the captcha");
      return;
    } else if (formData.captchaResponse !== "8") {
      dispatch(updateFormField({ field: "captchaResponse", value: "" }));
      toast.error("Incorrect captcha answer. Please try again.");
      return;
    }

    // Prepare form data for submission
    const submissionData = {
      registration: formData.registration,
      make: formData.make,
      model: formData.model,
      year: formData.year,
      mileage: formData.mileage,
      name: formData.name,
      email: formData.email,
      telephone: formData.telephone,
      enquiry_url: window.location.href,
      enquiry_form: "/sell-car",
    };

    dispatch(submitSellCarForm(submissionData));
  };
  const mainContent = (
    <div className="pad-20 overflow-hidden">
      <p>
        <strong>Looking to sell your car?</strong>
      </p>
      <h2>We buy cars</h2>
      <p>
        We take the hassle out of selling privately plus we have a network of
        industry contacts looking to pay good prices for your vehicle.
      </p>
      <p>Complete our simple to use valuation form below to get started.</p>
      <form onSubmit={handleSubmit} noValidate>
        <h3>Car Valuation</h3>
        <div className="row" id="row_1">
          <div className="sixcol">
            <label>
              Registration No.{" "}
              <span className="required" aria-required="true">
                *
              </span>
            </label>
          </div>
          <div className="sixcol last">
            <input
              type="text"
              size="10"
              name="registration"
              value={formData.registration}
              onChange={handleInputChange}
              id="captcha_registration"
              placeholder="e.g. AB12 CDE"
              required
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_2">
          <div className="sixcol">
            <label>
              Make of car{" "}
              <span className="required" aria-required="true">
                *
              </span>
            </label>
          </div>
          <div className="sixcol last">
            <input
              type="text"
              size="40"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              id="captcha_make"
              placeholder="e.g. BMW, Audi, Mercedes"
              required
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_3">
          <div className="sixcol">
            <label>
              Model{" "}
              <span className="required" aria-required="true">
                *
              </span>
            </label>
          </div>
          <div className="sixcol last">
            <input
              type="text"
              size="40"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              id="captcha_model"
              placeholder="e.g. 3 Series, A4, C-Class"
              required
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
              value={formData.year}
              onChange={handleInputChange}
              id="captcha_year"
              placeholder="e.g. 2020"
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
              value={formData.mileage}
              onChange={handleInputChange}
              id="captcha_mileage"
              placeholder="e.g. 50000"
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_6">
          <div className="sixcol">
            <label>
              Name{" "}
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
              value={formData.name}
              onChange={handleInputChange}
              id="captcha_name"
              placeholder="Your full name"
              required
              aria-required="true"
            />
          </div>
        </div>
        <div className="row" id="row_7">
          <div className="sixcol">
            <label>
              Email{" "}
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
              value={formData.email}
              onChange={handleInputChange}
              id="captcha_email"
              placeholder="your.email@example.com"
              required
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
              value={formData.telephone}
              onChange={handleInputChange}
              id="captcha_telephone"
              placeholder="07123456789"
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
                  <label id="captchaText">
                    What is : 4 + 4{" "}
                    <span className="required" aria-required="true">
                      *
                    </span>
                  </label>
                </div>
                <div className="sixcol last">
                  <input
                    className="formInput"
                    id="captchaResponse"
                    size="40"
                    value={formData.captchaResponse}
                    onChange={handleInputChange}
                    name="captchaResponse"
                    placeholder="Answer"
                    type="text"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value={isSubmitting ? "Submitting" : "Submit"}
              className="button green"
              id="captcha_submit"
              disabled={isSubmitting}
            />
          </div>
        </div>
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
