import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteButton from '../../components/FavoriteButton';
import PageWithSidebarLayout from '../../layouts/PageWithSidebarLayout';
import { fetchVehicleById, removeFromFavorites, selectFavorites } from '../../store/vehicleSlice';
import './Compare.css';
import './Showroom.css';

const Compare = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [enrichedVehicles, setEnrichedVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removedCount, setRemovedCount] = useState(0);

  // Fetch complete vehicle details for each favorite
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (favorites.length > 0) {
        setLoading(true);
        try {
          const successful = [];
          const toRemove = [];

          for (const fav of favorites) {
            try {
              const result = await dispatch(fetchVehicleById(fav.id)).unwrap();
              successful.push(result);
            } catch (error) {
              const msg = (error || '').toString().toLowerCase();
              console.warn(`Compare: vehicle ${fav.id} unavailable:`, msg);
              // Only remove from favourites if it's definitively not found
              if (msg.includes('not found')) {
                toRemove.push(fav.id);
              }
            }
          }

          // Purge any definitively missing vehicles from favourites/localStorage
          if (toRemove.length > 0) {
            toRemove.forEach((id) => dispatch(removeFromFavorites(id)));
            setRemovedCount((prev) => prev + toRemove.length);
          }

          setEnrichedVehicles(successful);
        } catch (error) {
          console.error('Error fetching vehicle details:', error);
          // Fallback to original favorites
          setEnrichedVehicles([]);
        } finally {
          setLoading(false);
        }
      } else {
        setEnrichedVehicles([]);
      }
    };

    fetchVehicleDetails();
  }, [favorites, dispatch]);

  const formatPrice = (price) => {
    if (price === 0 || !price) return 'Contact for price';
    return `£${price.toLocaleString()}`;
  };

  const formatFinance = (financeMonthly) => {
    if (!financeMonthly || financeMonthly === 0) return null;
    return `£${financeMonthly}`;
  };

  const getVehicleTitle = (vehicle) => {
    return vehicle.title || `${vehicle.brand} ${vehicle.model || 'Unknown Model'}`;
  };

  const getVehicleVariant = (vehicle) => {
    const parts = [];
    if (vehicle.year) parts.push(vehicle.year);
    if (vehicle.fuelType) parts.push(vehicle.fuelType);
    if (vehicle.transmission) parts.push(vehicle.transmission);
    if (vehicle.engineSize) parts.push(vehicle.engineSize);
    return parts.join(', ') || 'Details available on request';
  };

  return (
    <PageWithSidebarLayout
      pageClass="compare-pg"
      headerTitle="Compare"
      headerClass="page-hdr--compare"
      showSidebar={false}
    >
      <div
        className="results-layout__listings snipcss-opdrK"
        style={{ paddingTop: 0, marginTop: 0 }}
      >
        {removedCount > 0 && (
          <div className="wrapper" style={{ marginTop: '10px' }}>
            <div className="container">
              <div
                style={{
                  background: '#fff3cd',
                  color: '#856404',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  border: '1px solid #ffeeba',
                  marginBottom: '10px',
                }}
              >
                We removed {removedCount} vehicle{removedCount > 1 ? 's' : ''} from your favourites
                because they are no longer available.
              </div>
            </div>
          </div>
        )}
        {/* <div className="res-filt res-filt--top">
        <div className="wrapper">
          <div className="container">
            <div className="res-filt__wrapper">
              <div className="res-filt__showing">
                <em>
                  {favorites.length > 0
                    ? `Comparing ${favorites.length} vehicle${
                        favorites.length > 1 ? "s" : ""
                      }`
                    : "No vehicles added to compare"}
                </em>
              </div>
            </div>
          </div>
        </div>
      </div> */}

        <div id="results" style={{ marginTop: '0px !important' }}>
          <div className="wrapper">
            <div className="container">
              <input type="hidden" id="button_class_hidden" value="button green full" />
              <div className="favourites-panel">
                <div className="favourites-panel__wrapper grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 lg:gap-8">
                  {loading ? (
                    <div
                      className="loading-vehicles"
                      style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '60px 20px',
                      }}
                    >
                      <h3 style={{ color: '#555', marginBottom: '20px' }}>
                        Loading vehicle details...
                      </h3>
                    </div>
                  ) : enrichedVehicles.length > 0 ? (
                    enrichedVehicles.map((vehicle, index) => {
                      const imageUrl =
                        vehicle.images && vehicle.images.length > 0
                          ? typeof vehicle.images[0] === 'string'
                            ? vehicle.images[0]
                            : vehicle.images[0].url
                          : `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=`;

                      return (
                        <div key={vehicle.id || index} className="vehicle-listing w-full">
                          <div className="vehicle-listing__image">
                            <Link
                              to={`/vehicle/${vehicle.brand?.toLowerCase()}/${vehicle.id}`}
                              title={getVehicleTitle(vehicle)}
                            >
                              <img
                                src={imageUrl}
                                alt={`View our ${getVehicleTitle(vehicle)}`}
                                className="responsive-img"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </Link>
                            <div className="listing__favourites">
                              <div
                                className="listing-favourites"
                                style={{ top: '30px !important' }}
                              >
                                <div className="app">
                                  <FavoriteButton vehicle={vehicle} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="vehicle-listing__title">
                            <h3>
                              <Link
                                to={`/vehicle/${vehicle.brand?.toLowerCase()}/${vehicle.id}`}
                                title={getVehicleTitle(vehicle)}
                                className="primary-colour"
                              >
                                {vehicle.brand} {vehicle.model || 'Unknown Model'}
                              </Link>
                            </h3>
                            <em className="vehicle-listing__subtitle">
                              <Link
                                to={`/vehicle/${vehicle.brand?.toLowerCase()}/${vehicle.id}`}
                                title={getVehicleTitle(vehicle)}
                                className="primary-colour"
                              >
                                {getVehicleVariant(vehicle)}
                              </Link>
                            </em>
                            <em
                              className="vehicle-listing__price accent-colour"
                              style={{
                                display: 'block',
                                fontSize: '20px',
                                fontWeight: 400,
                                color: '#555',
                              }}
                            >
                              {formatPrice(vehicle.price)}
                            </em>
                            <div
                              className="vehicle-listing__finance primary-colour"
                              style={{
                                fontSize: '13px',
                                lineHeight: 1,
                                margin: '5px 0 0 0',
                                color: '#555',
                              }}
                            >
                              {formatFinance(vehicle.financeMonthly)
                                ? `${formatFinance(vehicle.financeMonthly)} per month`
                                : '£0 per month'}
                            </div>
                            {/* <div className="vehicle-listing__favourites">
                                <FavoriteButton vehicle={vehicle} />
                              </div> */}
                          </div>
                          <div className="vehicle-listing__summary">
                            <em>
                              <span>{vehicle.bodyStyle || 'N/A'}</span>
                              <span>{vehicle.fuelType || 'N/A'}</span>
                              <span>{vehicle.transmission || 'N/A'}</span>
                            </em>
                          </div>
                          <div className="vehicle-listing__info">
                            <ul className="vehicle-info">
                              <li className="vehicle-info__stat vehicle-info__stat--mileage">
                                <span className="label">Mileage:</span>
                                <span className="stat">
                                  {vehicle.mileage
                                    ? `${vehicle.mileage.toLocaleString()} Miles`
                                    : 'N/A'}
                                </span>
                              </li>
                              <li className="vehicle-info__stat vehicle-info__stat--engine_l">
                                <span className="label">Engine size:</span>
                                <span className="stat">
                                  {vehicle.engineSize ? `${vehicle.engineSize}L` : 'N/A'}
                                </span>
                              </li>
                              <li className="vehicle-info__stat vehicle-info__stat--mpg">
                                <span className="label">MPG (Avg):</span>
                                <span className="stat">{vehicle.combinedMpg || 'N/A'}</span>
                              </li>
                              <li className="vehicle-info__stat vehicle-info__stat--registered">
                                <span className="label">Year:</span>
                                <span className="stat">{vehicle.year || 'N/A'}</span>
                              </li>
                              <li className="vehicle-info__stat vehicle-info__stat--body_colour">
                                <span className="label">Color:</span>
                                <span className="stat">{vehicle.color || 'N/A'}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="vehicle-listing__button-block">
                            <div className="view-vehicle-cta">
                              <Link
                                to={`/vehicle/${vehicle.brand?.toLowerCase()}/${vehicle.id}`}
                                title={getVehicleTitle(vehicle)}
                                className="button button-white"
                              >
                                Vehicle Details
                              </Link>
                            </div>
                            <div className="engage-cta">
                              <Link to="/contact" className="button button-engage">
                                Secure Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="no-vehicles"
                      style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '60px 20px',
                        background: '#f2f2f2',
                        borderRadius: '10px',
                      }}
                    >
                      <h3 style={{ color: '#555', marginBottom: '20px' }}>
                        No vehicles added to compare
                      </h3>
                      <p style={{ color: '#888', marginBottom: '30px' }}>
                        Add vehicles to your favorites to compare them side by side.
                      </p>
                      <Link
                        to="/used-cars"
                        style={{
                          display: 'inline-block',
                          marginTop: '20px',
                          padding: '10px 20px',
                          background: '#171717',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '3px',
                        }}
                      >
                        Browse Used Cars
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebarLayout>
  );
};

export default Compare;
