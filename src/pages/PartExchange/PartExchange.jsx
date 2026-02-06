import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageWithSidebarLayout from '../../layouts/PageWithSidebarLayout';
import { useCmsPage } from '../../hooks/useCmsPage';
import {
  clearError,
  resetForm,
  setCurrentStep,
  submitPartExchangeForm,
  updateFormField,
} from '../../store/partExchangeSlice';
import { fetchPartExchangeVehicles } from '../../store/vehicleSlice';
import './PartExchange.css';

const PartExchange = () => {
  const dispatch = useDispatch();
  const { formData, currentStep, isSubmitting, submitSuccess, submitError } = useSelector(
    (state) => state.partExchange
  );
  const { content: partExchangePage } = useCmsPage('part-exchange');

  // Get vehicles from Redux store - Part Exchange specific
  const allVehicles = useSelector((state) => state.vehicles.partExchangeItems || []);

  // Fetch Part Exchange vehicles on component mount
  useEffect(() => {
    dispatch(fetchPartExchangeVehicles());
  }, [dispatch]);

  // Prepare sorted vehicles with display text
  const vehicles = useMemo(() => {
    const processed = allVehicles
      .map((v) => ({
        id: v._id || v.id,
        title: v.title || '',
        subtitle: v.subtitle || '',
        displayText: `${v.title || ''} ${v.subtitle || ''}`.trim(),
      }))
      .sort((a, b) => a.displayText.localeCompare(b.displayText));

    return processed;
  }, [allVehicles]);

  // Initialize filtered vehicles - no longer needed for simple dropdown
  // Vehicles are now directly rendered in the select element

  // Handle success and error toasts
  useEffect(() => {
    if (submitSuccess) {
      toast.success('Part exchange valuation submitted successfully');
      dispatch(resetForm());
    }
  }, [submitSuccess, dispatch]);

  useEffect(() => {
    if (submitError) {
      toast.error(`Error: ${submitError}`);
      dispatch(clearError());
    }
  }, [submitError, dispatch]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(updateFormField({ field: name, value }));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clear any previous errors
      dispatch(clearError());

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      // Captcha validation
      if (formData.captchaResponse !== '10') {
        toast.error('Incorrect captcha answer');
        return;
      }

      dispatch(submitPartExchangeForm(formData));
    },
    [formData, dispatch]
  );

  const handleNext = useCallback(() => {
    // Basic validation for current step
    const validateStep = (step) => {
      switch (step) {
        case 1:
          return (
            formData.enquiry_regarding.trim() &&
            formData.first_name.trim() &&
            formData.last_name.trim() &&
            formData.telephone.trim() &&
            formData.postcode.trim() &&
            formData.email.trim()
          );
        case 2:
          return (
            formData.registration.trim() &&
            formData.make.trim() &&
            formData.model.trim() &&
            formData.engine_size.trim() &&
            formData.external_colour.trim() &&
            formData.mileage.trim() &&
            formData.value.trim()
          );
        case 3:
          return (
            formData.vehicle_condition.trim() &&
            formData.service_history.trim() &&
            formData.captchaResponse.trim()
          );
        default:
          return true;
      }
    };

    if (!validateStep(currentStep)) {
      toast.error('Please fill all required fields');
      return;
    }

    if (currentStep === 3) {
      // Submit the form when on step 3
      handleSubmit(new Event('submit', { cancelable: true, bubbles: true }));
    } else if (currentStep < 3) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  }, [currentStep, formData, dispatch, handleSubmit]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  }, [currentStep, dispatch]);
  const mainContent = (
    <div className="pad-20 overflow-hidden part-exchange-page">
      {partExchangePage?.contentHtml ? (
        <div dangerouslySetInnerHTML={{ __html: partExchangePage.contentHtml }} />
      ) : (
        <>
          <p>
            <strong>
              Our dedicated team of vehicle valuation experts are ready to give you an up-to-the-minute
              market value of your car.
            </strong>
          </p>
          <h2>Free Quote</h2>

          <p>
            If you are considering part exchanging your current vehicle we are able to provide you with
            a free, no-obligation quote.
          </p>
          <p>
            Please contact one of our Sales Consultants on 07788929755 or complete our valuation form
            below.
          </p>
          <p>We will contact you as soon as possible with the best possible price for your car.</p>
        </>
      )}

      {/* SSL Certificate and Header Section */}
      <div className="form-header">
        <div className="header-content">
          <h1 className="valuation-title">Online Vehicle Valuation Application</h1>
          <div className="valuation-description">
            <p>Our online application is quick, simple and secure.</p>
            <p>Once completed, one of our team will contact you straight back.</p>
          </div>
        </div>
        <div className="ssl-badge">
          <img
            src="/images/ssl.png"
            alt="This website has an SSL Certificate"
            className="ssl-image"
          />
        </div>
      </div>

      <div className="part-exchange-form">
        <div className="step-indicator">{currentStep} of 3</div>

        {currentStep === 1 && (
          <div>
            <div className="step-header typography-header">
              <h3>Your Details * denotes a required field</h3>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="enquiry_regarding">
                  Enquiry regarding <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <select
                  id="enquiry_regarding"
                  name="enquiry_regarding"
                  value={formData.enquiry_regarding}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.displayText}>
                      {vehicle.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="first_name">
                  First Name <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="last_name">
                  Last Name <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="telephone">
                  Phone Number <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="number"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="postcode">
                  Postcode <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="Enter your postcode"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="step-header typography-header">
              <h3>Vehicle Details * denotes a required field</h3>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="registration">
                  Registration No <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="registration"
                  name="registration"
                  value={formData.registration}
                  onChange={handleChange}
                  placeholder="Enter registration number"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="make">
                  Vehicle Make <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  placeholder="e.g. BMW, Audi, Ford"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="model">
                  Vehicle Model <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. 3 Series, A4, Focus"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="engine_size">
                  Engine Size <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="engine_size"
                  name="engine_size"
                  value={formData.engine_size}
                  onChange={handleChange}
                  placeholder="e.g. 2.0L"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="external_colour">
                  External Colour <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="external_colour"
                  name="external_colour"
                  value={formData.external_colour}
                  onChange={handleChange}
                  placeholder="e.g. Black, White, Blue"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="internal_colour">Internal Colour</label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="internal_colour"
                  name="internal_colour"
                  value={formData.internal_colour}
                  onChange={handleChange}
                  placeholder="e.g. Black, Grey, Beige"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="mileage">
                  Vehicle Mileage <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  placeholder="Enter current mileage"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="value">
                  Estimated Value £ <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder="Enter estimated value"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div className="step-header typography-header">
              <h3>Additional Vehicle Information * denotes a required field</h3>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="owners">Number of owners</label>
              </div>
              <div className="form-input">
                <input
                  type="number"
                  id="owners"
                  name="owners"
                  value={formData.owners}
                  onChange={handleChange}
                  placeholder="Enter number of previous owners"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="first_registered">First registered</label>
              </div>
              <div className="form-input">
                <input
                  type="date"
                  id="first_registered"
                  name="first_registered"
                  value={formData.first_registered}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="mot_expires">MOT expires</label>
              </div>
              <div className="form-input">
                <input
                  type="date"
                  id="mot_expires"
                  name="mot_expires"
                  value={formData.mot_expires}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="vehicle_condition">
                  General condition <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <select
                  id="vehicle_condition"
                  name="vehicle_condition"
                  value={formData.vehicle_condition}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="last_service">Last service</label>
              </div>
              <div className="form-input">
                <input
                  type="date"
                  id="last_service"
                  name="last_service"
                  value={formData.last_service}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="service_history">
                  Service History <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <select
                  id="service_history"
                  name="service_history"
                  value={formData.service_history}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select service history</option>
                  <option value="full_dealer">Full dealer</option>
                  <option value="part_dealer">Part dealer</option>
                  <option value="independent">Independent garage</option>
                  <option value="mixed">Mixed</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="last_service_mileage">Last service mileage</label>
              </div>
              <div className="form-input">
                <input
                  type="number"
                  id="last_service_mileage"
                  name="last_service_mileage"
                  value={formData.last_service_mileage}
                  onChange={handleChange}
                  placeholder="Enter mileage at last service"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="external_defects">External defects</label>
              </div>
              <div className="form-input">
                <textarea
                  id="external_defects"
                  name="external_defects"
                  value={formData.external_defects}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe any external defects"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="internal_defects">Internal defects</label>
              </div>
              <div className="form-input">
                <textarea
                  id="internal_defects"
                  name="internal_defects"
                  value={formData.internal_defects}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe any internal defects"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="comments">Other comments</label>
              </div>
              <div className="form-input">
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows="4"
                  placeholder="comments"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label"></div>
              <div className="form-input">
                <p className="upload_image_p">
                  If you have any photos of your vehicle already uploaded to facebook, flickr etc.
                  Please feel free to copy the link below
                </p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="photos_url">Link to Photo's</label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="photos_url"
                  name="photos_url"
                  value={formData.photos_url}
                  onChange={handleChange}
                  placeholder="https://www.facebook.com/my_vehicle_photos"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="captchaResponse">
                  What is: 5 + 5 <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="captchaResponse"
                  name="captchaResponse"
                  value={formData.captchaResponse}
                  onChange={handleChange}
                  placeholder="Enter answer"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4 commented out
        {currentStep === 4 && (
          <form onSubmit={handleSubmit}>
            <div className="step-header typography-header">
              <h3>Complete Your Quotation * denotes a required field</h3>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="captchaResponse">
                  What is: 5 + 5 <span className="required">*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  id="captchaResponse"
                  name="captchaResponse"
                  value={formData.captchaResponse}
                  onChange={handleChange}
                  placeholder="Enter answer"
                  required
                />
              </div>
            </div>
            <div className="form-navigation">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Valuation"}
              </button>
            </div>
          </form>
        )} */}

        {currentStep < 3 && (
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              style={{ marginLeft: currentStep === 1 ? 'auto' : '0' }}
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-navigation">
            <button type="button" onClick={handleBack} className="btn btn-secondary">
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Valuation'}
            </button>
          </div>
        )}
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
