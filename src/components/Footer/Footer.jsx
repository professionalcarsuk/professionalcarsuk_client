import "./Footer.css";
import { Link } from "react-router-dom";
import clickDealerLogo from "./images/click_dealer_logo.1749717714.png";

const Footer = ({ noMargin = false }) => {
  return (
    <>
      <div className="footer__main snipcss-advvq">
        <div className="wrapper">
          <div className="container">
            <div className="footer__widget footer__widget--contacts">
              <div className="footer__title">Get In Touch</div>
              <address className="footer__address">
                <span className="footer__addressline footer__addressline--name">
                  S James Prestige Limited
                </span>
                <span className="footer__addressline footer__addressline--line-1">
                  Wakeley Works
                </span>
                <span className="footer__addressline footer__addressline--line-2">
                  Bourne Road
                </span>
                <span className="footer__addressline footer__addressline--town">
                  Essendine
                </span>
                <span className="footer__addressline footer__addressline--county">
                  Rutland
                </span>
                <span className="footer__addressline footer__addressline--postcode">
                  PE9 4LT
                </span>
              </address>
              <ul className="footer__numbers">
                <li className="footer__telephone">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <a href="tel:01780435024">01780 435024</a>
                </li>
                <li className="footer__email">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <a
                    href="mailto:enquiries@sjamesprestige.com"
                    title="Email S James Prestige Limited"
                  >
                    Email us
                  </a>
                </li>
              </ul>
              <ul className="footer__social">
                <li>
                  <a
                    href="https://www.facebook.com/S-James-Prestige-Finance-1554962181444200/?ref=page_internal"
                    title="Like us on Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span aria-hidden="true" className="fa fa-facebook"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/share?url=https://car-listing-frontend-peach.vercel.app"
                    title="Share us on Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span aria-hidden="true" className="ci ci-x-twitter"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/sjamesprestige/?hl=en"
                    title="Follow us on Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span aria-hidden="true" className="fa fa-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__widget footer__widget--opening-hours">
              <div className="footer__title">Opening Hours</div>
              <ul className="footer__open-times">
                <li className="footer__open-times--mon">
                  <div className="open-day">
                    <span
                      aria-hidden="true"
                      className="icon icon-calendar"
                    ></span>{" "}
                    Mon
                  </div>
                  <div className="open-times">09:00 - 17:30</div>
                </li>
                <li className="footer__open-times--tue">
                  <div className="open-day">
                    <span
                      aria-hidden="true"
                      className="icon icon-calendar"
                    ></span>{" "}
                    Tue
                  </div>
                  <div className="open-times">09:00 - 17:30</div>
                </li>
                <li className="footer__open-times--wed">
                  <div className="open-day">
                    <span
                      aria-hidden="true"
                      className="icon icon-calendar"
                    ></span>{" "}
                    Wed
                  </div>
                  <div className="open-times">09:00 - 17:30</div>
                </li>
                <li className="footer__open-times--thu">
                  <div className="open-day">
                    <span
                      aria-hidden="true"
                      className="icon icon-calendar"
                    ></span>{" "}
                    Thu
                  </div>
                  <div className="open-times">09:00 - 17:30</div>
                </li>
                <li className="footer__open-times--fri">
                  <div className="open-day">
                    <span
                      aria-hidden="true"
                      className="icon icon-calendar"
                    ></span>{" "}
                    Fri
                  </div>
                  <div className="open-times">09:00 - 17:30</div>
                </li>
                <li className="footer__open-times--sat">
                  <div className="open-day">
                    <span
                      aria-hidden="true"
                      className="icon icon-calendar"
                    ></span>{" "}
                    Sat
                  </div>
                  <div className="open-times">09:00 - 17:00</div>
                </li>
                <li className="footer__open-times--sun">
                  <div className="open-day">
                    <span
                      aria-hidden="true"
                      className="icon icon-calendar"
                    ></span>{" "}
                    Sun
                  </div>
                  <div className="open-times">09:00 - 16:00</div>
                </li>
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
                <li>Company No. 08921181</li>
                <li>FCA No. 655032</li>
              </ul>
              <div className="footer__fca-para">
                <div id="fca-disclaimer">
                  S James Prestige Limited are a credit broker and not a lender.
                  We are Authorised and Regulated by the Financial Conduct
                  Authority. FCA No: Finance is Subject to status. Other offers
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
                  Registered in England &amp; Wales: 08921181 <br />
                  Registered Office: Address: Meadow Park Industrial Estate
                  Bourne Road, Essendine, Stamford, England, PE9 4LT <br />
                  Data Protection No: ZA285887
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
                <li>
                  <a
                    href="/pdfs/IDD.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Initial Disclosure Document
                  </a>
                </li>
                <li>
                  <a
                    href="/pdfs/SAF-Certificate-New.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SAF Certificate
                  </a>
                </li>
                <li className="footer__list-links--copyright">© 2025</li>
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
                  <a
                    rel="external nofollow noopener noreferrer"
                    target="_blank"
                    href="https://www.clickdealer.co.uk/"
                    title="Click Dealer"
                  >
                    <img
                      data-src="/assets/images/themev2/theme/click_dealer_logo.1749717714.png"
                      data-srcset=""
                      src={clickDealerLogo}
                      alt="Powered by Click Dealer"
                      className="footer__click-logo"
                    />
                  </a>
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
