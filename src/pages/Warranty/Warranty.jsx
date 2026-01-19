import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import {
  updateFormField,
  submitWarrantyForm,
  resetForm,
  clearError,
} from "../../store/warrantySlice";
import "./Warranty.css";

const Warranty = () => {
  const dispatch = useDispatch();
  const { formData, isSubmitting, submitSuccess, submitError } = useSelector(
    (state) => state.warranty
  );
  // const [currentStep, setCurrentStep] = React.useState(1);

  // Handle success and error toasts
  useEffect(() => {
    if (submitSuccess) {
      toast.success("Warranty claim submitted successfully");
      dispatch(resetForm());
      // setCurrentStep(1); // Reset to first step after successful submission - removed
    }
  }, [submitSuccess, dispatch]);

  useEffect(() => {
    if (submitError) {
      toast.error(`Error: ${submitError}`);
      dispatch(clearError());
    }
  }, [submitError, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name, value }));
  };

  // const handleNext = () => {
  //   // Basic validation
  //   const required = [
  //     "date",
  //     "full_name",
  //     "email",
  //     "telephone",
  //     "reg",
  //     "current_mileage",
  //     "details_of_issue",
  //     "date_first_noticed",
  //   ];
  //   const missing = required.filter((field) => !formData[field].trim());
  //   if (missing.length > 0) {
  //     toast.error("Please fill all required fields");
  //     return;
  //   }

  //   // Email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(formData.email)) {
  //     toast.error("Please enter a valid email address");
  //     return;
  //   }

  //   setCurrentStep(2);
  // };

  // const handleBack = () => {
  //   setCurrentStep(1);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    dispatch(clearError());

    // Basic validation
    const required = [
      "date",
      "full_name",
      "email",
      "telephone",
      "reg",
      "current_mileage",
      "details_of_issue",
      "date_first_noticed",
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Captcha validation
    if (formData.captchaResponse !== "4") {
      toast.error("Incorrect captcha answer");
      return;
    }

    dispatch(submitWarrantyForm(formData));
  };

  const mainContent = (
    <div className="pad-20">
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
      {/* {currentStep === 1 && (
        <p id="pageIncrementsf1" className="pageIncrements">
          1 of 2
        </p>
      )}
      {currentStep === 2 && (
        <p id="pageIncrementsf2" className="pageIncrements">
          2 of 2
        </p>
      )} */}
      <div className="warranty-form bg-[#f5f5f5] rounded-[5px] p-6">
        {/* {currentStep === 1 && ( */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text=[#222]">
              Date *
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 mt-1"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=[#222]">
              Full Name *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 mt-1"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=[#222]">
              Email *
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 mt-1"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=[#222]">
              Telephone Number *
            </label>
            <input
              type="tel"
              maxLength="11"
              className="w-full border border-gray-300 p-2 mt-1"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Telephone Number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=[#222]">
              Original Vehicle Registration (no private plates) *
            </label>
            <textarea
              rows="2"
              className="w-full border border-gray-300 p-2 mt-1"
              name="reg"
              value={formData.reg}
              onChange={handleChange}
              placeholder="Original Vehicle Registration (no private plates)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=[#222]">
              Current Mileage *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 mt-1"
              name="current_mileage"
              value={formData.current_mileage}
              onChange={handleChange}
              placeholder="Current Mileage"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=[#222]">
              Details Of Issue You Are Experiencing *
            </label>
            <textarea
              rows="3"
              className="w-full border border-gray-300 p-2 mt-1"
              name="details_of_issue"
              value={formData.details_of_issue}
              onChange={handleChange}
              placeholder="Details Of Issue You Are Experiencing"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=[#222]">
              Date You First Noticed The Issue Reported *
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 mt-1"
              name="date_first_noticed"
              value={formData.date_first_noticed}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=[#222]">
              What is : 1 + 3 *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 mt-1"
              name="captchaResponse"
              value={formData.captchaResponse}
              onChange={handleChange}
              placeholder="Answer"
              required
            />
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn bg-green-500 text-white px-6 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
        {/* )} */}
        {/* {currentStep === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text=[#222]">
                What is : 1 + 3
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 mt-1"
                name="captchaResponse"
                value={formData.captchaResponse}
                onChange={handleChange}
                placeholder="Answer"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="btn bg-blue-500 text-white px-6 py-2"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn bg-green-500 text-white px-6 py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
        )} */}
      </div>
      {/* {currentStep === 1 && (
        <div className="text-center mt-4">
          <button
            onClick={handleNext}
            className="btn bg-green-500 text-white px-6 py-2"
          >
            Next
          </button>
        </div>
      )} */}
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
