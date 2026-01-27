import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import {
  updateFormField,
  submitContactForm,
  resetForm,
  clearError,
} from "../../store/contactSlice";
import "./Contact.css";

const Contact = () => {
  const dispatch = useDispatch();
  const { formData, isSubmitting, submitSuccess, submitError } = useSelector(
    (state) => state.contact
  );

  // Handle success and error toasts
  useEffect(() => {
    if (submitSuccess) {
      toast.success("Thank you! Your message has been sent successfully.");
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

    // For telephone field, only allow digits, spaces, hyphens, plus signs, and parentheses
    if (name === "telephone") {
      const filteredValue = value.replace(/[^\d\s\-\+\(\)]/g, "");
      dispatch(updateFormField({ field: name, value: filteredValue }));
    } else {
      dispatch(updateFormField({ field: name, value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    dispatch(clearError());

    // Validate required fields (check for empty or whitespace-only strings)
    if (!formData.name || !formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.subject || !formData.subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }

    if (!formData.email || !formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!formData.question || !formData.question.trim()) {
      toast.error("Please enter your enquiry message");
      return;
    }

    if (!formData.captchaResponse || !formData.captchaResponse.trim()) {
      toast.error("Please answer the captcha");
      return;
    }

    // Email format validation
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Captcha validation
    if (formData.captchaResponse.trim() !== "2") {
      dispatch(updateFormField({ field: "captchaResponse", value: "" }));
      toast.error("Incorrect captcha answer. Please try again.");
      return;
    }

    // Validate telephone if provided (should be numeric)
    if (formData.telephone && formData.telephone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.telephone.trim())) {
        toast.error("Please enter a valid telephone number");
        return;
      }
    }

    // Prepare form data for submission
    const submissionData = {
      name: formData.name.trim(),
      subject: formData.subject.trim(),
      telephone: formData.telephone ? formData.telephone.trim() : "",
      email: formData.email.trim(),
      message: formData.question.trim(), // Map question to message for backend
      captchaResponse: formData.captchaResponse.trim(),
      enquiry_url: window.location.href,
      enquiry_form: "/contact",
    };

    dispatch(submitContactForm(submissionData));
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  return (
    <PageWithSidebarLayout
      pageClass="contact-pg"
      headerTitle="Contact Professional Cars Limited"
      headerClass="page-hdr--contact"
      showSidebar={false}
    >
      <div className="row">
        <div className="twelvecol block">
          <div className="row">
            <div className="fourcol">
              <div className="row">
                <div className="contact-widget">
                  <div className="pad-20 overflow-hidden">
                    <h3>
                      <span
                        aria-hidden="true"
                        className="icon icon-location"
                      ></span>{" "}
                      Address
                    </h3>
                    <p>
                      <strong>Professional Cars Limited</strong>
                    </p>
                    <address>
                      Rear Yard 2
                      <br />
                      College Road Business Park
                      <br />
                      Aston Clinton
                      <br />
                      Aylesbury
                      <br />
                      HP22 5EZ
                      <br />
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <div className="fourcol">
              <div className="row">
                <div className="contact-widget">
                  <div className="pad-20 overflow-hidden">
                    <h3>
                      <span
                        aria-hidden="true"
                        className="icon icon-phone"
                      ></span>{" "}
                      Contact
                    </h3>
                    <p>Why not contact us directly?</p>
                    <div className="contact-box">
                      <ul id="get-in-touch">
                        <li className="mobile-hidden">
                          <span
                            aria-hidden="true"
                            className="icon icon-phone-2"
                          ></span>{" "}
                          <a href="tel:07788929755">07788929755</a>
                        </li>
                        <li className="desktop-hidden">
                          <span
                            aria-hidden="true"
                            className="icon icon-phone-2"
                          ></span>{" "}
                          <a href="tel:07788929755">07788929755</a>
                        </li>
                        <li className="mobile-hidden">
                          <span aria-hidden="true"></span>{" "}
                          <a href="/contact"></a>
                        </li>
                        <li className="mobile-hidden">
                          <span aria-hidden="true"></span>{" "}
                          <a href="/contact"></a>
                        </li>
                        <li className="desktop-hidden">
                          <span aria-hidden="true"></span> <a href="tel:"></a>
                        </li>
                        <li>
                          <span
                            aria-hidden="true"
                            className="icon icon-mail"
                          ></span>{" "}
                          <a
                            href="mailto:professionalcarsltd@gmail.com"
                            title="Email Us"
                          >
                            Email Us
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fourcol last">
              <div className="row">
                <div className="contact-widget">
                  <div className="pad-20 overflow-hidden">
                    <h3>
                      <span
                        aria-hidden="true"
                        className="icon icon-calendar"
                      ></span>{" "}
                      Open Times
                    </h3>
                    <ul className="row open-times">
                      <li className="twelvecol">
                        <div className="open-day">
                          <span
                            aria-hidden="true"
                            className="icon icon-calendar"
                          ></span>{" "}
                          Mon
                        </div>
                        <div className="open-times">10:00 - 17:00</div>
                      </li>
                      <li className="twelvecol">
                        <div className="open-day">
                          <span
                            aria-hidden="true"
                            className="icon icon-calendar"
                          ></span>{" "}
                          Tue
                        </div>
                        <div className="open-times">10:00 - 17:00</div>
                      </li>
                      <li className="twelvecol">
                        <div className="open-day">
                          <span
                            aria-hidden="true"
                            className="icon icon-calendar"
                          ></span>{" "}
                          Wed
                        </div>
                        <div className="open-times">10:00 - 17:00</div>
                      </li>
                      <li className="twelvecol">
                        <div className="open-day">
                          <span
                            aria-hidden="true"
                            className="icon icon-calendar"
                          ></span>{" "}
                          Thu
                        </div>
                        <div className="open-times">10:00 - 17:00</div>
                      </li>
                      <li className="twelvecol">
                        <div className="open-day">
                          <span
                            aria-hidden="true"
                            className="icon icon-calendar"
                          ></span>{" "}
                          Fri
                        </div>
                        <div className="open-times">10:00 - 17:00</div>
                      </li>
                      <li className="twelvecol">
                        <div className="open-day">
                          <span
                            aria-hidden="true"
                            className="icon icon-calendar"
                          ></span>{" "}
                          Sat
                        </div>
                        <div className="open-times">10:00 - 17:00</div>
                      </li>
                      <li className="twelvecol">
                        <div className="open-day">
                          <span
                            aria-hidden="true"
                            className="icon icon-calendar"
                          ></span>{" "}
                          Sun
                        </div>
                        <div className="open-times">Closed</div>
                      </li>
                      <li className="twelvecol bank-holiday-not-set">
                        <div className="open-day">
                          <span
                            aria-hidden="true"
                            className="icon icon-calendar"
                          ></span>{" "}
                          Bank Hol.
                        </div>
                        <div className="open-times"> </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="twelvecol block">
          <div className="row">
            <div className="fourcol">
              <div className="contact-widget">
                <div className="pad-20 overflow-hidden">
                  <a id="email-us"></a>
                  <form onSubmit={handleSubmit} id="frm_captcha_contact">
                    <input
                      type="hidden"
                      name="_token"
                      value="2dnmyiR5CXl9EXGzrXNPnGQBafomUTPIj4LQbdks"
                      id="captcha__token"
                    />
                    <input
                      type="text"
                      name="a_password"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                      id="captcha_a_password"
                    />
                    <input
                      type="hidden"
                      name="subject"
                      value=""
                      id="captcha_subject"
                    />
                    <input
                      type="hidden"
                      name="enquiry_url"
                      value="/contact"
                      id="captcha_enquiry_url"
                    />
                    <input
                      type="hidden"
                      name="enquiry_form"
                      value="/contact"
                      id="captcha_enquiry_form"
                    />
                    <fieldset title="Contact Form">
                      <h3>
                        <span
                          aria-hidden="true"
                          className="icon icon-mail"
                        ></span>{" "}
                        Email Us
                      </h3>
                      <div className="row" id="row_1">
                        <div className="twelvecol">
                          <input
                            size={40}
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            type="text"
                            id="captcha_name"
                            required
                            aria-required="true"
                          />
                        </div>
                      </div>
                      <div className="row" id="row_subject">
                        <div className="twelvecol">
                          <input
                            size={40}
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Subject"
                            type="text"
                            id="captcha_subject_input"
                            required
                            aria-required="true"
                          />
                        </div>
                      </div>
                      <div className="row" id="row_2">
                        <div className="twelvecol">
                          <input
                            size={40}
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            type="tel"
                            id="captcha_telephone"
                            aria-required="true"
                            required
                          />
                        </div>
                      </div>
                      <div className="row" id="row_3">
                        <div className="twelvecol">
                          <input
                            size={40}
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            type="email"
                            id="captcha_email"
                            required
                            aria-required="true"
                          />
                        </div>
                      </div>
                      <div className="row" id="row_4">
                        <div className="twelvecol">
                          <textarea
                            rows={5}
                            cols={40}
                            name="question"
                            value={formData.question}
                            onChange={handleInputChange}
                            placeholder="Enter your enquiry"
                            id="captcha_question"
                            required
                            aria-required="true"
                          />
                        </div>
                      </div>
                      <div id="recaptcha_widget">
                        <div>
                          <div className="twelvecol">
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
                        </div>
                      </div>
                      <div className="row" id="row_5">
                        <div className="twelvecol">
                          <input
                            className="button"
                            type="submit"
                            value={isSubmitting ? "Sending" : "Send"}
                            disabled={isSubmitting}
                          />
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
            <div className="eightcol last">
              <div className="contact-widget">
                <div className="pad-20 overflow-hidden">
                  <h3>
                    <span
                      aria-hidden="true"
                      className="icon icon-location"
                    ></span>{" "}
                    Map
                  </h3>
                  <div className="flexible-frame">
                    <iframe
                      src="https://maps.google.com/maps?width=600&amp;height=450&amp;hl=en&amp;q=Professional Cars LTD HP22 5EZ&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                      width="600"
                      height="450"
                      allowFullScreen
                      loading="lazy"
                      id="style-bgVx7"
                      className="style-bgVx7"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebarLayout>
  );
};

export default Contact;
