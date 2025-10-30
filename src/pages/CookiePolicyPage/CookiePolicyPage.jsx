import React, { useState, useEffect } from "react";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import "./CookiePolicyPage.css";
import { CookieStorage, LocalStorage } from "../../utils/cookieStorage";

const CookiePolicyPage = () => {
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has already consented using utility function
    const consent = CookieStorage.getConsentAccepted();
    if (consent) {
      setHasConsented(true);
    }
  }, []);

  const handleAccept = () => {
    // Use utility function to save consent
    CookieStorage.setConsentAccepted();

    // Save detailed GTM consents to localStorage (matching old website)
    const gtmConsents = {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
    };
    LocalStorage.setGtmConsents(gtmConsents);

    setHasConsented(true);

    // Initialize Google Analytics if available
    if (window.gtag) {
      window.gtag("consent", "update", gtmConsents);
    }

    // Dispatch a custom event to hide the banner if it's visible
    window.dispatchEvent(new CustomEvent("cookieConsentAccepted"));
  };
  return (
    <PageWithSidebarLayout
      pageClass="cookie-policy-pg"
      headerTitle="Cookie Policy"
      headerClass="page-hdr--cookie lazy-background visible"
      showSidebar={false}
      showHeading={true}
    >
      <div className="wrapper snipcss-YhaRV">
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="row row--flex">
                <div className="block">
                  <div className="pad-20 overflow-hidden">
                    <div className="page-hdr" id="page-hdr-collateral">
                      <h1>Cookie Policy</h1>
                    </div>
                    <p>
                      Our website uses cookies to distinguish you from other
                      users of our website. This helps us to provide you with a
                      good experience when you browse our website and also
                      allows us to improve our site.
                    </p>
                    <h4>What are cookies?</h4>
                    <p>
                      A cookie is a small text file that a website saves on your
                      computer or mobile device when you visit the site. It
                      enables the website to remember your actions and
                      preferences (such as login, language, font size and other
                      display preferences) over a period of time, so you don't
                      have to keep re-entering them whenever you come back to
                      the site or browse from one page to another.
                    </p>
                    <h4>How do we use cookies?</h4>
                    <p>
                      A number of our pages use cookies to: Protect your
                      privacy. We use cookies to make sure that only
                      authenticated devices are allowed to view your data. We do
                      this by storing a token that is unique to you on your
                      device. This token will only be present if you have
                      authorised the device, either by following a link in an
                      email / SMS, or by entering your details directly into the
                      site. Enabling these cookies is required for the use of
                      this service. Without these cookies we are unable to
                      identify you and therefore protect your privacy. As such,
                      without these cookies we will not allow any personal data
                      to be viewed. Enhance website performance. We use cookies
                      to ensure our websites run smoothly and perform
                      efficiently. These cookies do not contain personal
                      information. Enabling these cookies is required for the
                      use of this service. Without these cookies we are unable
                      to provide full website functionality.
                    </p>
                    <h4>Third-party cookies</h4>
                    <p>
                      In addition to our own cookies, we may also use various
                      cookies from third-parties to report anonymous usage
                      statistics and or provide functionality enhancements. Some
                      examples of third-party cookies that could be present are
                      detailed below, this may not be a full list and there
                      could be other cookies present that are not listed here.
                    </p>
                    <h4>Automatic Logging of Session Data</h4>
                    <p>
                      We automatically log generic information about your
                      computer and your computer's connection to the Internet
                      which we call "session data". Session data consists of
                      things such as device information, IP address, operating
                      system and browser software information, and the
                      activities conducted by you while on our Website. An IP
                      address is a number that lets computers attached to the
                      Internet, such as our web servers, know where to send data
                      back to the user, such as the pages of the Website the
                      user wishes to view. Session data helps us to analyse such
                      things as what items visitors are likely to click on most,
                      the way visitors are clicking through the Website, how
                      many visitors are surfing to various pages on the Website,
                      how long visitors to the Website are staying and how often
                      they are visiting. It also helps us diagnose problems with
                      our servers. It is possible to determine from an IP
                      address a visitor's Internet Service provider (ISP) and
                      the approximate geographical location of his or her point
                      of connectivity. We also use session data to help prevent
                      fraud and unauthorised use of our Website.
                    </p>
                    <h4>How to control cookies</h4>
                    <p>
                      You can control and or delete cookies as you wish - for
                      details, see aboutcookies.org. You can delete all cookies
                      that are already on your computer and you can set most
                      browsers to prevent them from being placed. If you do
                      this, however, you may have to manually adjust some
                      preferences every time you visit a site and some services
                      and functionality may not work.
                    </p>
                    <section className="written-content">
                      <h4>Google Analytics</h4>
                      <p>
                        We use this to better understand how people are using
                        our website. Google also use it to better understand how
                        people are using their own website. The Google Analytics
                        cookie allows us to recognise when you first visit our
                        website and recognise you if you visit again. It also
                        enables us to recognise the pages you visit, when you
                        visit, how long you visit our website for, the IP
                        address and what site you were looking at before
                        visiting our website (this is known as the referral
                        url). See more information Google Analytics Cookies.
                      </p>
                    </section>
                    <section className="written-content">
                      <h4>Google Maps &amp; YouTube</h4>
                      <p>
                        YouTube uses cookies to collect information that helps
                        to provided statistics of its videos, prevent fraud and
                        improve site experience. YouTube uses cookies on
                        youtube.com and videos embedded on our website from
                        youtube.com. See more information on Google's Privacy
                        Policy{" "}
                        <a href="https://policies.google.com/technologies/cookies?hl=en-US">
                          here
                        </a>
                      </p>
                    </section>
                    <section className="written-content">
                      <h4>Visitor Chat Service</h4>
                      <p>
                        We use a third-party supplier to provide the Visitor
                        Chat Service. The supplier may use cookies, over which
                        we have no control. The cookies are used to manage your
                        visitor chat session, to track your preferences and to
                        personalise your experience. You may disable persistent
                        cookies. However, if you disable the session cookie you
                        will not be able to use the Visitor Chat Service. If you
                        wish to find out more about the supplier's use of
                        cookies please refer to their privacy policy at{" "}
                        <a href="https://visitor.chat/cookie-policy/">here</a>
                      </p>
                    </section>
                    <section className="written-content">
                      <h4>Codeweavers</h4>
                      <p>
                        We use Codeweavers to provide the software that
                        facilitates your finance application. The supplier may
                        use cookies, over which we have no control. The cookies
                        are used by this provider are to track pages used, your
                        preferences and to personalise your experience.You may
                        disable persistent cookies. However, this may affect
                        your experience when using the website. If you wish to
                        find out more about the supplier's use of cookies please
                        refer to their privacy policy at{" "}
                        <a href="https://codeweavers.net/privacy">here</a>
                      </p>
                    </section>
                    <section className="written-content">
                      <p>List of example cookies used on our site:</p>
                      <div className="finance-table-wrap">
                        <table className="finance-table" id="finance-table">
                          <thead>
                            <tr>
                              <th>Cookie Name</th>
                              <th>Expiration Time</th>
                              <th>Cookie Type</th>
                              <th>Purpose/How we use it</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>website_telephone</td>
                              <td>30 day</td>
                              <td>Session</td>
                              <td>Stores the telephone number</td>
                            </tr>
                            <tr>
                              <td>website_locations</td>
                              <td>1 day</td>
                              <td>Session</td>
                              <td>Stores the amount of locations</td>
                            </tr>
                            <tr>
                              <td>content_source</td>
                              <td>null</td>
                              <td>Persistent</td>
                              <td>Content Cache</td>
                            </tr>
                            <tr>
                              <td>vehicles_in_stock</td>
                              <td>1 day</td>
                              <td>Session</td>
                              <td>Stores the amount of vehicles in stock</td>
                            </tr>
                            <tr>
                              <td>cars_in_stock</td>
                              <td>1 day</td>
                              <td>Session</td>
                              <td>Stores the amount of cars in stock</td>
                            </tr>
                            <tr>
                              <td>commercials_in_stock</td>
                              <td>1 day</td>
                              <td>Session</td>
                              <td>Stores the amount of commercials in stock</td>
                            </tr>
                            <tr>
                              <td>bikes_in_stock</td>
                              <td>1 day</td>
                              <td>Session</td>
                              <td>Stores the amount of bikes in stock</td>
                            </tr>
                            <tr>
                              <td>vehicle_makes</td>
                              <td>1 day</td>
                              <td>Session</td>
                              <td>Stores the amount of unique vehicle makes</td>
                            </tr>
                            <tr>
                              <td>p</td>
                              <td>1 hour</td>
                              <td>Persistent</td>
                              <td>Web Tracking</td>
                            </tr>
                            <tr>
                              <td>t</td>
                              <td>1 hour</td>
                              <td>Persistent</td>
                              <td>Web Tracking</td>
                            </tr>
                            <tr>
                              <td>website_mobile</td>
                              <td>30 day</td>
                              <td>Session</td>
                              <td>Stores the mobile number</td>
                            </tr>
                            <tr>
                              <td>website_fax</td>
                              <td>30 day</td>
                              <td>Session</td>
                              <td>Stores the fax number</td>
                            </tr>
                            <tr>
                              <td>content_refresh_time</td>
                              <td>null</td>
                              <td>Persistent</td>
                              <td>Content Cache, refresh time</td>
                            </tr>
                            <tr>
                              <td>selected favourites</td>
                              <td>null</td>
                              <td>null</td>
                              <td>Checks ID is unique</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>
                    {!hasConsented && (
                      <section className="cookie-consent-section">
                        <h4>Your Cookie Preferences</h4>
                        <p>
                          By accepting cookies, you agree to the use of cookies
                          as described in this policy. You can withdraw your
                          consent at any time by managing your browser settings.
                        </p>
                        <button
                          className="cookie-accept-btn"
                          onClick={handleAccept}
                        >
                          I Accept Cookies
                        </button>
                      </section>
                    )}
                    {hasConsented && (
                      <section className="cookie-consent-section">
                        <p className="consent-confirmed">
                          ✓ You have accepted our cookie policy. You can manage
                          your preferences in your browser settings.
                        </p>
                      </section>
                    )}
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

export default CookiePolicyPage;
