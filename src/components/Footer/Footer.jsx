import "./Footer.css";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import clickDealerLogo from "./images/click_dealer_logo.1749717714.png";

const Footer = ({ noMargin = false }) => {
  const { settings } = useSiteSettings();

  const companyName = settings?.companyName || "Professional Cars Limited";
  const phone = settings?.phone || "07788929755";
  const email = settings?.email || "professionalcarsltd@gmail.com";
  const address = settings?.address || {};
  const social = settings?.social || {};
  const legal = settings?.legal || {};

  const openingHours = settings?.openingHours?.length
    ? settings.openingHours
    : [
        { day: "Monday", label: "10:00 - 17:00" },
        { day: "Tuesday", label: "10:00 - 17:00" },
        { day: "Wednesday", label: "10:00 - 17:00" },
        { day: "Thursday", label: "10:00 - 17:00" },
        { day: "Friday", label: "10:00 - 17:00" },
        { day: "Saturday", label: "10:00 - 17:00" },
        { day: "Sunday", label: "Closed" },
      ];

  const companyNumber = legal.companyNumber || "08763622";
  const fcaNumber = legal.fcaNumber || "1022311";
  const registeredOffice =
    legal.registeredOffice ||
    "Professional Cars, Rear Yard 2, College Road North Business Park, Aylesbury, HP22 5EZ";
  return (
    <>
      <div className="footer__main snipcss-advvq">
        <div className="wrapper">
          <div className="container">
            <div className="footer__widget footer__widget--contacts">
              <div className="footer__title">Get In Touch</div>
              <address className="footer__address">
                <span className="footer__addressline footer__addressline--name">
                  {companyName}
                </span>
                {address.line1 && (
                  <span className="footer__addressline footer__addressline--line-1">
                    {address.line1}
                  </span>
                )}
                {address.line2 && (
                  <span className="footer__addressline footer__addressline--line-2">
                    {address.line2}
                  </span>
                )}
                {address.town && (
                  <span className="footer__addressline footer__addressline--town">
                    {address.town}
                  </span>
                )}
                {address.county && (
                  <span className="footer__addressline footer__addressline--county">
                    {address.county}
                  </span>
                )}
                {address.postcode && (
                  <span className="footer__addressline footer__addressline--postcode">
                    {address.postcode}
                  </span>
                )}
              </address>
              <ul className="footer__numbers">
                <li className="footer__telephone">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <a href={`tel:${phone}`}>{phone}</a>
                </li>
                <li className="footer__email">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <a
                    href={`mailto:${email}`}
                    title={`Email ${companyName}`}
                  >
                    Email us
                  </a>
                </li>
              </ul>
              <ul className="footer__social">
                {social.facebook && (
                  <li>
                    <a
                      href={social.facebook}
                      title="Like us on Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span aria-hidden="true" className="fa fa-facebook"></span>
                    </a>
                  </li>
                )}
                {social.twitter && (
                  <li>
                    <a
                      href={social.twitter}
                      title="Share us on Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span aria-hidden="true" className="ci ci-x-twitter"></span>
                    </a>
                  </li>
                )}
                {social.instagram && (
                  <li>
                    <a
                      href={social.instagram}
                      title="Follow us on Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span aria-hidden="true" className="fa fa-instagram"></span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="footer__widget footer__widget--opening-hours">
              <div className="footer__title">Opening Hours</div>
              <ul className="footer__open-times">
                {openingHours.map((item, index) => {
                  const dayKey = item.day ? item.day.toLowerCase().slice(0, 3) : index;
                  const label = item.label ||
                    (item.open && item.close ? `${item.open} - ${item.close}` : "Closed");

                  return (
                    <li
                      key={`${item.day || "day"}-${index}`}
                      className={`footer__open-times--${dayKey}`}
                    >
                      <div className="open-day">
                        <span
                          aria-hidden="true"
                          className="icon icon-calendar"
                        ></span>{" "}
                        {item.day ? item.day.slice(0, 3) : "Day"}
                      </div>
                      <div className="open-times">{label}</div>
                    </li>
                  );
                })}
                <li className="bank-holiday-not-set">
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
            <div className="footer__widget footer__widget--quick-links">
              <div className="footer__title">Quick Links</div>
              <ul className="footer__services">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/showroom">Showroom</Link>
                </li>
                <li>
                  <Link to="/part-exchange">Part Exchange</Link>
                </li>
                <li>
                  <Link to="/warranty">Warranty</Link>
                </li>
                <li>
                  <Link to="/sellcar">Sell Your Car</Link>
                </li>
                <li>
                  <Link to="/complaints">Complaints</Link>
                </li>
              </ul>
            </div>
            <div className="footer__widget footer__widget--legal">
              <div className="footer__title">Company Info</div>
              <ul className="footer__legal-list">
                <li>Company No. {companyNumber}</li>
                <li>FCA No. {fcaNumber}</li>
              </ul>
              <div className="footer__fca-para">
                <div id="fca-disclaimer">
                  {companyName} are a credit broker and not a lender.
                  We are Authorised and Regulated by the Financial Conduct
                  Authority. FCA No: {fcaNumber}. Finance is Subject to status. Other offers
                  may be available but cannot be used in conjunction with this
                  offer. We work with a number of carefully selected credit
                  providers who may be able to offer you finance for your
                  purchase. <br />
                  <br />
                  We are a credit broker and not a lender. We can introduce you
                  to a limited number of lenders and their finance products
                  which may have different interest rates and charges. <br />
                  We are not an independent financial advisor. We will provide
                  details of products available from the lenders we work with,
                  but no advice or recommendation will be made. You must decide
                  whether the finance product is right for you. We do not charge
                  you a fee for our services. Whichever lender we introduce you
                  to, we will typically receive commission from them (either a
                  fixed fee or a fixed percentage of the amount you borrow).{" "}
                  <br />
                  The lenders we work with could pay commission at different
                  rates. However, the amount of commission we receive from a
                  lender does not have an effect on the amount you pay to that
                  lender under your credit agreement. We have the right to
                  decline third party lenders. <br />
                  <br />
                  Registered in England &amp; Wales: {companyNumber} <br />
                  Registered Office Address: {registeredOffice} <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`footer__bottom ${
          noMargin ? "footer__bottom--no-margin" : ""
        }`}
      >
        <div className="wrapper">
          <div className="container">
            <div className="footer__bottom-bar">
              <ul className="footer__list-links">
                <li>
                  <Link to="/terms-of-use" title="Terms of Use">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" title="Privacy Policy">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" title="Cookie Policy">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" title="Sitemap">
                    Sitemap
                  </Link>
                </li>
                
                <li className="footer__list-links--copyright">© 2026</li>
              </ul>
              <div className="footer__powered-by">
                {/* <div className="footer__powered-text">
                  <a
                    rel="external nofollow noopener noreferrer"
                    target="_blank"
                    href="https://www.clickdealer.co.uk/"
                    title="Click Dealer"
                  >
                    <span className="footer__powered-text--hidden">
                      Website powered By Click Dealer
                    </span>
                  </a>
                </div> */}
                <div className="footer__click-logo">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
