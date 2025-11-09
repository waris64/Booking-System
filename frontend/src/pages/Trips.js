import React, { useState, useEffect } from "react";
import { Search, Filter, Plane } from "lucide-react";
import { tripAPI } from "../services/api";
import TripCard from "../components/TripCard";
import toast from "react-hot-toast";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    filterTrips();
  }, [trips, searchTerm, priceFilter, durationFilter]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await tripAPI.getAllTrips();
      setTrips(data.trips || []);
    } catch (error) {
      toast.error("Failed to fetch trips");
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTrips = () => {
    let filtered = [...trips];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (trip) =>
          trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter((trip) => {
        switch (priceFilter) {
          case "low":
            return trip.price < 200;
          case "medium":
            return trip.price >= 200 && trip.price <= 500;
          case "high":
            return trip.price > 500;
          default:
            return true;
        }
      });
    }

    // Duration filter
    if (durationFilter !== "all") {
      filtered = filtered.filter((trip) => {
        switch (durationFilter) {
          case "short":
            return trip.duration <= 3;
          case "medium":
            return trip.duration > 3 && trip.duration <= 7;
          case "long":
            return trip.duration > 7;
          default:
            return true;
        }
      });
    }

    setFilteredTrips(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceFilter("all");
    setDurationFilter("all");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12"></div>
        <h1 className="flex items-center justify-center text-4xl font-bold text-gray-900 mb-4">
          <Plane className="mr-3 text-primary-600" size={40} />
          Explore Amazing Trips
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover your next adventure from our collection of carefully curated
          travel experiences
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search trips by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Filter size={16} className="mr-2" />
              Price Range
            </label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Prices</option>
              <option value="low">Under $200</option>
              <option value="medium">$200 - $500</option>
              <option value="high">Over $500</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Durations</option>
              <option value="short">1-3 days</option>
              <option value="medium">4-7 days</option>
              <option value="long">8+ days</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={clearFilters}
              className="btn btn-secondary w-full md:w-auto"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {loading
            ? "Loading..."
            : `${filteredTrips.length} trip${
                filteredTrips.length !== 1 ? "s" : ""
              } found`}
        </h2>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing trips...</p>
        </div>
      ) : filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Plane size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No trips found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || priceFilter !== "all" || durationFilter !== "all"
              ? "Try adjusting your filters to see more results"
              : "No trips are currently available"}
          </p>
          {(searchTerm ||
            priceFilter !== "all" ||
            durationFilter !== "all") && (
            <button onClick={clearFilters} className="btn btn-primary">
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Trips;
