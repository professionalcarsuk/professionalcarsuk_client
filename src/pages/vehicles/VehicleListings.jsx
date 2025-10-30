import React from "react";
import { useParams } from "react-router-dom";

const VehicleListings = () => {
  const { type, brand } = useParams();

  // Handle legacy routes that don't have type/brand params
  const getVehicleType = () => {
    if (type) return type;
    // For legacy routes like /used-cars, extract from pathname
    const path = window.location.pathname;
    if (path.includes("/used-cars") || path.includes("/cars")) return "cars";
    if (path.includes("/used-vans") || path.includes("/vans")) return "vans";
    return "cars"; // default
  };

  const getBrand = () => {
    if (brand) return brand;
    // For legacy routes like /used/cars/audi, extract from pathname
    const path = window.location.pathname;
    const parts = path.split("/");
    const brandIndex = parts.findIndex(
      (part) => part === "cars" || part === "vans"
    );
    if (brandIndex !== -1 && parts[brandIndex + 1]) {
      return parts[brandIndex + 1];
    }
    return null;
  };

  const vehicleType = getVehicleType();
  const vehicleBrand = getBrand();
  const getTitle = () => {
    if (vehicleBrand) {
      return `${vehicleBrand.charAt(0).toUpperCase() + vehicleBrand.slice(1)} ${
        vehicleType === "cars" ? "Cars" : "Vans"
      }`;
    }
    return vehicleType === "cars" ? "Used Cars" : "Used Vans";
  };

  const getSubtitle = () => {
    if (vehicleBrand) {
      return `Browse our selection of ${vehicleBrand} ${
        vehicleType === "cars" ? "cars" : "vans"
      }`;
    }
    return `Find your perfect ${
      vehicleType === "cars" ? "car" : "van"
    } from our extensive collection`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{getTitle()}</h1>
        <p className="text-lg text-gray-600">{getSubtitle()}</p>
      </div>

      {/* Future: Filters and search will go here */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <p className="text-gray-500">
          Advanced filtering options will be available here...
        </p>
        {/* Price range, mileage, year, etc. */}
      </div>

      {/* Future: Vehicle grid/list will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
            <span className="text-gray-500">Vehicle Image</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Sample Vehicle</h3>
          <p className="text-gray-600 mb-2">Year • Mileage • Fuel Type</p>
          <p className="text-2xl font-bold text-blue-600">£XX,XXX</p>
        </div>
        {/* More vehicle cards will be dynamically generated */}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500">
          🚧 This page is under development. Vehicle listings will be loaded
          from the backend API.
        </p>
      </div>
    </div>
  );
};

export default VehicleListings;
