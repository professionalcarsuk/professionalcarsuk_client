import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const vehicleType = searchParams.get("type") || "all";

  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getTitle = () => {
    switch (vehicleType) {
      case "cars":
        return "Search Cars";
      case "vans":
        return "Search Vans";
      default:
        return "Search All Vehicles";
    }
  };

  const getSubtitle = () => {
    switch (vehicleType) {
      case "cars":
        return "Find your perfect car with our advanced search filters";
      case "vans":
        return "Find your perfect van with our advanced search filters";
      default:
        return "Search across our entire inventory of cars and vans";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{getTitle()}</h1>
        <p className="text-lg text-gray-600">{getSubtitle()}</p>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Search Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Make */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Make
            </label>
            <select
              value={filters.make}
              onChange={(e) => handleFilterChange("make", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Make</option>
              <option value="audi">Audi</option>
              <option value="bmw">BMW</option>
              <option value="mercedes">Mercedes-Benz</option>
              <option value="ford">Ford</option>
              {/* More options will be loaded dynamically */}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <input
              type="text"
              value={filters.model}
              onChange={(e) => handleFilterChange("model", e.target.value)}
              placeholder="Enter model"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={filters.minYear}
                onChange={(e) => handleFilterChange("minYear", e.target.value)}
                placeholder="From"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={filters.maxYear}
                onChange={(e) => handleFilterChange("maxYear", e.target.value)}
                placeholder="To"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Mileage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Mileage
            </label>
            <select
              value={filters.mileage}
              onChange={(e) => handleFilterChange("mileage", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Mileage</option>
              <option value="10000">Up to 10,000 miles</option>
              <option value="25000">Up to 25,000 miles</option>
              <option value="50000">Up to 50,000 miles</option>
              <option value="75000">Up to 75,000 miles</option>
              <option value="100000">Up to 100,000 miles</option>
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Type
            </label>
            <select
              value={filters.fuelType}
              onChange={(e) => handleFilterChange("fuelType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold">
            Search Vehicles
          </button>
        </div>
      </div>

      {/* Search Results Placeholder */}
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-semibold mb-4">Search Results</h3>
        <p className="text-gray-600 mb-4">
          🚧 Advanced search functionality is under development. Results will be
          dynamically loaded from the backend API based on your filters.
        </p>
        <div className="text-sm text-gray-500">
          Current filters will be applied:{" "}
          {Object.entries(filters).filter(([_, value]) => value).length} active
          filters
        </div>
      </div>
    </div>
  );
};

export default Search;
