import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageWithSidebarLayout from '../../layouts/PageWithSidebarLayout';
import {
  clearError,
  resetForm,
  submitContactForm,
  updateFormField,
} from '../../store/contactSlice';
import { fetchVehicleById, selectCurrentVehicle } from '../../store/vehicleSlice';
import '../Contact/Contact.css';

// Helper to read query params
const useQuery = () => new URLSearchParams(useLocation().search);

const Enquiry = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const { formData, isSubmitting, submitSuccess, submitError } = useSelector(
    (state) => state.contact
  );
  const [phoneError, setPhoneError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [questionError, setQuestionError] = React.useState('');
  const [captchaError, setCaptchaError] = React.useState('');
  const currentVehicle = useSelector(selectCurrentVehicle);

  // Pre-fill subject from query param or default; don't force it in UI
  const subjectFromQuery = query.get('subject');
  const vehicleId = query.get('vehicle_id');
  const about = query.get('about');

  useEffect(() => {
    // Only set subject if not already set to avoid clobbering typing if user navigates within app
    if (!formData.subject) {
      const fallbackSubject = about
        ? `Enquiry about: ${about}`
        : subjectFromQuery || 'Vehicle enquiry';
      dispatch(updateFormField({ field: 'subject', value: fallbackSubject }));
    }
  }, [about, subjectFromQuery, dispatch, formData.subject]);

  // If a vehicle_id is provided, fetch the vehicle to display its title/subtitle
  useEffect(() => {
    if (vehicleId) {
      dispatch(fetchVehicleById(vehicleId));
    }
  }, [vehicleId, dispatch]);

  // Handle success and error toasts
  useEffect(() => {
    if (submitSuccess) {
      toast.success('Thank you! Your enquiry has been sent successfully.');
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

    if (name === 'telephone') {
      const filteredValue = value.replace(/[^\d\s\-+()]/g, '');
      dispatch(updateFormField({ field: name, value: filteredValue }));
      // Live UK phone validation
      if (filteredValue.trim()) {
        const ukPhoneRegex =
          /^(\+44|0044)\s?7\d{3}\s?\d{6}$|^(\+44|0044)\s?\d{4}\s?\d{6}$|^(\+44|0044)\s?\d{3}\s?\d{7}$|^(\+44|0044)\s?\d{2}\s?\d{8}$|^(\+44|0044)\s?\d{1}\s?\d{9}$/;
        // if (!ukPhoneRegex.test(filteredValue.replace(/[-\s]/g, ''))) {
        //   setPhoneError('Please enter a valid UK telephone number with country code (+44)');
        // } else {
        //   setPhoneError('');
        // }
      } else {
        setPhoneError('');
      }
    } else if (name === 'name') {
      dispatch(updateFormField({ field: name, value }));
      // Live name validation
      if (!value.trim()) {
        setNameError('Your name is required');
      } else {
        setNameError('');
      }
    } else if (name === 'email') {
      dispatch(updateFormField({ field: name, value }));
      // Live email validation
      if (!value.trim()) {
        setEmailError('Your email is required');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    } else if (name === 'question') {
      dispatch(updateFormField({ field: name, value }));
      // Live question validation
      if (!value.trim()) {
        setQuestionError('Your enquiry message is required');
      } else {
        setQuestionError('');
      }
    } else if (name === 'captchaResponse') {
      dispatch(updateFormField({ field: name, value }));
      // Live captcha validation
      if (!value.trim()) {
        setCaptchaError('Please answer the captcha');
      } else if (value.trim() !== '2') {
        setCaptchaError('Incorrect captcha answer. Please try again.');
      } else {
        setCaptchaError('');
      }
    } else {
      dispatch(updateFormField({ field: name, value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearError());

    // Check for live validation errors
    if (nameError || emailError || phoneError || questionError || captchaError) {
      toast.error('Please correct the errors in the form before submitting.');
      return;
    }

    // Required validations for this page
    if (!formData.name || !formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.telephone || !formData.telephone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    if (!formData.email || !formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!formData.question || !formData.question.trim()) {
      toast.error('Please enter your enquiry message');
      return;
    }

    if (!formData.captchaResponse || !formData.captchaResponse.trim()) {
      toast.error('Please answer the captcha');
      return;
    }

    // Email format
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Captcha: keep same as contact (1 + 1 = 2)
    if (formData.captchaResponse.trim() !== '2') {
      dispatch(updateFormField({ field: 'captchaResponse', value: '' }));
      toast.error('Incorrect captcha answer. Please try again.');
      return;
    }

    // UK phone number validation (with country code)
    if (formData.telephone && formData.telephone.trim()) {
      // Accepts +44 followed by 10 digits, optional spaces/hyphens, or 0044
      const ukPhoneRegex =
        /^(\+44|0044)\s?7\d{3}\s?\d{6}$|^(\+44|0044)\s?\d{4}\s?\d{6}$|^(\+44|0044)\s?\d{3}\s?\d{7}$|^(\+44|0044)\s?\d{2}\s?\d{8}$|^(\+44|0044)\s?\d{1}\s?\d{9}$/;
      // if (!ukPhoneRegex.test(formData.telephone.replace(/[-\s]/g, ''))) {
      //   toast.error('Please enter a valid UK telephone number with country code (+44)');
      //   return;
      // }
    }

    const submissionData = {
      name: formData.name.trim(),
      subject:
        (formData.subject && formData.subject.trim()) ||
        subjectFromQuery ||
        (about ? `Enquiry about: ${about}` : 'Vehicle enquiry'),
      telephone: formData.telephone ? formData.telephone.trim() : '',
      email: formData.email.trim(),
      message: formData.question.trim(),
      captchaResponse: formData.captchaResponse.trim(),
      // If we have a vehicle, construct the vehicle detail URL instead of using the enquiry page URL
      enquiry_url:
        vehicleId && currentVehicle
          ? `${window.location.origin}/vehicle/${(
              currentVehicle.brand || ''
            ).toLowerCase()}/${vehicleId}`
          : window.location.href,
      enquiry_form: '/enquiry',
      vehicle_id: vehicleId || '',
      vehicle_title:
        currentVehicle?.title || currentVehicle
          ? `${currentVehicle.brand || ''} ${currentVehicle.model || ''}`.trim()
          : '',
      vehicle_subtitle: currentVehicle?.subTitle || '',
    };

    dispatch(submitContactForm(submissionData));
  };

  // const handleReset = () => {
  //   dispatch(resetForm());
  // };

  return (
    <PageWithSidebarLayout
      pageClass="contact-pg"
      headerTitle="Vehicle Enquiry"
      headerClass="page-hdr--contact"
      showSidebar={false}
    >
      <div className="row">
        <div className="twelvecol block">
          <div className="row">
            <div className="twelvecol">
              <div className="contact-widget">
                <div className="pad-20">
                  <h2>
                    <span aria-hidden="true" className="icon icon-comments"></span> Request a call
                    back
                  </h2>
                  {(about || subjectFromQuery) && (
                    <p>
                      <strong>Enquiry about:</strong>
                      <br />
                      {about || subjectFromQuery}
                      <br />
                      {currentVehicle?.subTitle}

                      <br />
                    </p>
                  )}

                  <p>
                    Fill in the form below and a member of our sales team will be in touch shortly.
                  </p>

                  <form onSubmit={handleSubmit} id="frm_captcha_enquiry">
                    <input type="hidden" name="_token" value="auto" id="captcha__token" />
                    <input
                      type="text"
                      name="a_password"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                      id="captcha_a_password"
                    />
                    <fieldset>
                      <input
                        type="hidden"
                        name="subject"
                        value={
                          (formData.subject && formData.subject) ||
                          subjectFromQuery ||
                          (about ? `Enquiry about: ${about}` : 'Vehicle enquiry')
                        }
                        id="captcha_subject"
                      />
                      <input
                        type="hidden"
                        name="vehicle_id"
                        value={vehicleId || ''}
                        id="captcha_vehicle_id"
                      />
                      <input
                        type="hidden"
                        name="enquiry_url"
                        value={window.location.href}
                        id="captcha_enquiry_url"
                      />
                      <input
                        type="hidden"
                        name="enquiry_form"
                        value="/enquiry"
                        id="captcha_enquiry_form"
                      />

                      <div className="row" id="row_1">
                        <div className="sixcol">
                          <label>
                            Name
                            <span className="required" aria-required="true">
                              *
                            </span>
                          </label>
                        </div>
                        <div className="sixcol">
                          <input
                            size={40}
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name (Required)"
                            type="text"
                            id="captcha_name"
                            aria-required="true"
                            required
                          />
                          {nameError && (
                            <label
                              id="captcha_name-error"
                              className="error"
                              htmlFor="captcha_name"
                              style={{
                                display: 'inline-block',
                                color: 'red',
                                fontSize: '13px',
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {nameError}
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="row" id="row_2">
                        <div className="sixcol">
                          <label>
                            Tel
                            <span className="required" aria-required="true">
                              *
                            </span>
                          </label>
                        </div>
                        <div className="sixcol">
                          <input
                            size={40}
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleInputChange}
                            placeholder="Tel (Required)"
                            type="tel"
                            id="captcha_telephone"
                            aria-required="true"
                            required
                          />
                          {phoneError && (
                            <label
                              id="captcha_telephone-error"
                              className="error"
                              htmlFor="captcha_telephone"
                              style={{
                                display: 'inline-block',
                                color: 'red',
                                fontSize: '13px',
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {phoneError}
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="row" id="row_3">
                        <div className="sixcol">
                          <label>
                            Email
                            <span className="required" aria-required="true">
                              *
                            </span>
                          </label>
                        </div>
                        <div className="sixcol">
                          <input
                            size={40}
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email (Required)"
                            type="email"
                            id="captcha_email"
                            aria-required="true"
                            required
                          />
                          {emailError && (
                            <label
                              id="captcha_email-error"
                              className="error"
                              htmlFor="captcha_email"
                              style={{
                                display: 'inline-block',
                                color: 'red',
                                fontSize: '13px',
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {emailError}
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="row" id="row_4">
                        <div className="sixcol">
                          <label>
                            Your Enquiry
                            <span className="required" aria-required="true">
                              *
                            </span>
                          </label>
                        </div>
                        <div className="sixcol">
                          <textarea
                            rows={5}
                            cols={40}
                            name="question"
                            value={formData.question}
                            onChange={handleInputChange}
                            placeholder="Enquiry (Required)"
                            id="captcha_question"
                            aria-required="true"
                            required
                          />
                          {questionError && (
                            <label
                              id="captcha_question-error"
                              className="error"
                              htmlFor="captcha_question"
                              style={{
                                display: 'inline-block',
                                color: 'red',
                                fontSize: '13px',
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {questionError}
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="row" id="row_5">
                        <div className="sixcol">
                          <label>Security</label>
                        </div>
                        <div className="sixcol">
                          <div id="recaptcha_widget">
                            <div style={{ padding: '0 4px' }}>
                              <div className="twelvecol" style={{ padding: '0 4px' }}>
                                <label id="captchaText">What is : 1 + 1 </label>
                              </div>
                              <input
                                className="formInput"
                                id="captchaResponse"
                                size={40}
                                value={formData.captchaResponse}
                                onChange={handleInputChange}
                                name="captchaResponse"
                                placeholder="Answer please"
                                type="text"
                                aria-required="true"
                              />
                              {captchaError && (
                                <label
                                  id="captchaResponse-error"
                                  className="error"
                                  htmlFor="captchaResponse"
                                  style={{
                                    display: 'inline-block',
                                    color: 'red',
                                    fontSize: '13px',
                                    padding: 0,
                                    margin: 0,
                                  }}
                                >
                                  {captchaError}
                                </label>
                              )}
                            </div>
                          </div>

                          <div className="row" id="row_6">
                            <input
                              type="submit"
                              value={isSubmitting ? 'Submitting' : 'Submit Enquiry'}
                              className="button black full"
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <input
                      type="hidden"
                      name="active_status"
                      value="active"
                      id="captcha_active_status"
                    />
                    <input type="hidden" name="active_status" value="active" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebarLayout>
  );
};

export default Enquiry;
