import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div id="main-wrap">
      {/* Hero-style header for 404 */}
      <div className="page-hdr page-hdr--404 lazy-background visible" style={{
        background: 'linear-gradient(135deg, #171717 0%, #2e2c45 100%)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4" style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '700',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6" style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600'
            }}>
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8" style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '300',
              lineHeight: '1.6'
            }}>
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  textDecoration: 'none'
                }}
              >
                Go Home
              </Link>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-colors duration-300"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  textDecoration: 'none'
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content section with suggestions */}
      <div id="page-warrior">
        <div className="not-found-content" style={{ background: '#171717' }}>
          <div className="wrapper">
            <div className="container">
              <div className="pad-20">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-semibold text-white mb-6 text-center" style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600'
                  }}>
                    What can we help you find?
                  </h3>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300 border border-gray-600">
                      <div className="text-4xl mb-4 text-white">🚗</div>
                      <h4 className="text-lg font-semibold text-white mb-2" style={{
                        fontFamily: 'Montserrat, sans-serif'
                      }}>
                        Browse Our Cars
                      </h4>
                      <p className="text-gray-300 mb-4" style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '300'
                      }}>
                        Explore our premium collection of BMW, Audi, and Mercedes vehicles.
                      </p>
                      <Link
                        to="/vehicles/used-cars"
                        className="inline-block px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-500 transition-colors duration-300"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          textDecoration: 'none'
                        }}
                      >
                        View Cars
                      </Link>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300 border border-gray-600">
                      <div className="text-4xl mb-4 text-white">🔧</div>
                      <h4 className="text-lg font-semibold text-white mb-2" style={{
                        fontFamily: 'Montserrat, sans-serif'
                      }}>
                        Warranty Services
                      </h4>
                      <p className="text-gray-300 mb-4" style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '300'
                      }}>
                        Learn about our comprehensive warranty and service options.
                      </p>
                      <Link
                        to="/warranty"
                        className="inline-block px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-500 transition-colors duration-300"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          textDecoration: 'none'
                        }}
                      >
                        Learn More
                      </Link>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300 border border-gray-600 md:col-span-2 lg:col-span-1">
                      <div className="text-4xl mb-4 text-white">📞</div>
                      <h4 className="text-lg font-semibold text-white mb-2" style={{
                        fontFamily: 'Montserrat, sans-serif'
                      }}>
                        Get In Touch
                      </h4>
                      <p className="text-gray-300 mb-4" style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '300'
                      }}>
                        Our team is here to help you find the perfect vehicle.
                      </p>
                      <Link
                        to="/contact"
                        className="inline-block px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-500 transition-colors duration-300"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          textDecoration: 'none'
                        }}
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-300 mb-4" style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '300'
                    }}>
                      Can't find what you're looking for? Try our search or browse our sitemap.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/sitemap"
                        className="inline-block px-6 py-3 border border-gray-400 text-gray-300 font-medium rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-300"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          textDecoration: 'none'
                        }}
                      >
                        View Sitemap
                      </Link>
                      <a
                        href="tel:07788929755"
                        className="inline-block px-6 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-500 transition-colors duration-300"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          textDecoration: 'none'
                        }}
                      >
                        Call: 07788929755
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;