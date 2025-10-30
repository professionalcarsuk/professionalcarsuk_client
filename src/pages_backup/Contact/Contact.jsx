import React from "react";
import { PageWithSidebarLayout } from "../../layouts";

const Contact = () => {
  return (
    <PageWithSidebarLayout
      pageClass="contact-pg"
      headerTitle="Contact S James Prestige Limited"
      headerClass="page-hdr--contact lazy-background visible"
      showSidebar={false}
    >
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
                  <strong>S James Prestige Limited</strong>
                </p>
                <address>
                  Wakeley Works
                  <br />
                  Bourne Road
                  <br />
                  Essendine
                  <br />
                  Rutland
                  <br />
                  PE9 4LT
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
                  <span aria-hidden="true" className="icon icon-phone"></span>{" "}
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
                      <a href="/contact">01780 435024</a>
                    </li>
                    <li className="desktop-hidden">
                      <span
                        aria-hidden="true"
                        className="icon icon-phone-2"
                      ></span>{" "}
                      <a href="tel:01780435024">01780435024</a>
                    </li>
                    <li className="mobile-hidden">
                      <span aria-hidden="true"></span> <a href="/contact"></a>
                    </li>
                    <li className="mobile-hidden">
                      <span aria-hidden="true"></span> <a href="/contact"></a>
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
                        href="mailto:enquiries@sjamesprestige.com"
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
                    <div className="open-times">09:00 - 17:30</div>
                  </li>
                  <li className="twelvecol">
                    <div className="open-day">
                      <span
                        aria-hidden="true"
                        className="icon icon-calendar"
                      ></span>{" "}
                      Tue
                    </div>
                    <div className="open-times">09:00 - 17:30</div>
                  </li>
                  <li className="twelvecol">
                    <div className="open-day">
                      <span
                        aria-hidden="true"
                        className="icon icon-calendar"
                      ></span>{" "}
                      Wed
                    </div>
                    <div className="open-times">09:00 - 17:30</div>
                  </li>
                  <li className="twelvecol">
                    <div className="open-day">
                      <span
                        aria-hidden="true"
                        className="icon icon-calendar"
                      ></span>{" "}
                      Thu
                    </div>
                    <div className="open-times">09:00 - 17:30</div>
                  </li>
                  <li className="twelvecol">
                    <div className="open-day">
                      <span
                        aria-hidden="true"
                        className="icon icon-calendar"
                      ></span>{" "}
                      Fri
                    </div>
                    <div className="open-times">09:00 - 17:30</div>
                  </li>
                  <li className="twelvecol">
                    <div className="open-day">
                      <span
                        aria-hidden="true"
                        className="icon icon-calendar"
                      ></span>{" "}
                      Sat
                    </div>
                    <div className="open-times">09:00 - 17:00</div>
                  </li>
                  <li className="twelvecol">
                    <div className="open-day">
                      <span
                        aria-hidden="true"
                        className="icon icon-calendar"
                      ></span>{" "}
                      Sun
                    </div>
                    <div className="open-times">09:00 - 16:00</div>
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
      <div className="row">
        <div className="fourcol mobile-hidden">
          <div className="contact-widget">
            <div className="pad-20 overflow-hidden">
              <a id="email-us"></a>
              <form
                action="email.php"
                method="post"
                id="frm_captcha_contact"
                noValidate
              >
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
                  value="https://car-listing-frontend-peach.vercel.app/contact.php"
                  id="captcha_enquiry_url"
                />
                <input
                  type="hidden"
                  name="enquiry_form"
                  value="/contact.php"
                  id="captcha_enquiry_form"
                />
                <fieldset title="Contact Form">
                  <h3>
                    <span aria-hidden="true" className="icon icon-mail"></span>{" "}
                    Email Us
                  </h3>
                  <div className="row" id="row_1">
                    <div className="twelvecol">
                      <input
                        size={40}
                        name="name"
                        value=""
                        placeholder="Name"
                        type="text"
                        id="captcha_name"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="row" id="row_2">
                    <div className="twelvecol">
                      <input
                        size={40}
                        name="telephone"
                        value=""
                        placeholder="Tel / Mob"
                        type="tel"
                        id="captcha_telephone"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="row" id="row_3">
                    <div className="twelvecol">
                      <input
                        size={40}
                        name="email"
                        value=""
                        placeholder="Email"
                        type="email"
                        id="captcha_email"
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
                        placeholder="Enter your enquiry"
                        id="captcha_question"
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
                        value=""
                        placeholder="Answer please"
                        type="text"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="row" id="row_5">
                    <div className="twelvecol">
                      <input type="submit" value="Send" />
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
                <span aria-hidden="true" className="icon icon-location"></span>{" "}
                Map
              </h3>
              <div className="flexible-frame">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1d2417.7123695721757!2d-0.45290148460173035!3d52.70128627984891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48778bd67aa6acdd%3A0xa17884ced2a5f8aa!2sS%20James%20Prestige!5e0!3m2!1sen!2suk!4v1621524565594!5m2!1sen!2suk"
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
    </PageWithSidebarLayout>
  );
};

export default Contact;
