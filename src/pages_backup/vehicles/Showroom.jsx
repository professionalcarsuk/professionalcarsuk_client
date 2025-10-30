import React from "react";
import { useParams } from "react-router-dom";

const Showroom = () => {
  const { brand } = useParams();
  const getBrandDisplayName = (brandSlug) => {
    const brandMap = {
      audi: "Audi",
      bmw: "BMW",
      mercedes: "Mercedes-Benz",
      porsche: "Porsche",
      "land-rover": "Land Rover",
      jaguar: "Jaguar",
      ferrari: "Ferrari",
      lamborghini: "Lamborghini",
      bentley: "Bentley",
      "rolls-royce": "Rolls-Royce",
      maserati: "Maserati",
      "aston-martin": "Aston Martin",
    };
    return (
      brandMap[brandSlug] ||
      brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1)
    );
  };

  const brandName = getBrandDisplayName(brand);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {brandName} Showroom
        </h1>
        <p className="text-lg text-gray-600">
          Discover our exclusive collection of {brandName} vehicles
        </p>
      </div>

      {/* Brand showcase section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 rounded-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Premium {brandName} Selection
            </h2>
            <p className="text-gray-300">
              Hand-picked {brandName} vehicles with exceptional quality and
              service
            </p>
          </div>
          <div className="text-6xl opacity-20">
            {/* Future: Brand logo will go here */}
            {brandName.charAt(0)}
          </div>
        </div>
      </div>

      {/* Vehicle categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">New {brandName}</h3>
          <p className="text-gray-600">Latest models and specifications</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Used {brandName}</h3>
          <p className="text-gray-600">Certified pre-owned vehicles</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">{brandName} Finance</h3>
          <p className="text-gray-600">Specialized financing options</p>
        </div>
      </div>

      {/* Future: Dynamic vehicle listings will go here */}
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-semibold mb-4">Coming Soon</h3>
        <p className="text-gray-600 mb-4">
          Our {brandName} showroom is currently under development. Vehicle
          listings will be dynamically loaded from our backend API.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Placeholder cards */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4">
              <div className="h-32 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Showroom;
