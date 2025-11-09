import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, DollarSign, Trash2 } from 'lucide-react';

const TripCard = ({ trip, onDelete, showActions = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      onDelete(trip.id);
    }
  };

  return (
    <div className="card group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            {trip.title}
          </h3>
          <div className="flex items-center text-2xl font-bold text-primary-600">
            <DollarSign size={20} />
            <span>{trip.price}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-2" />
          <span>{trip.location}</span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2 text-primary-500" />
            <span className="text-sm">{trip.duration} days</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users size={16} className="mr-2 text-primary-500" />
            <span className="text-sm">{trip.availableSeats} seats</span>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-center text-gray-700">
            <Calendar size={16} className="mr-2 text-primary-500" />
            <span className="text-sm font-medium">
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link 
            to={`/trips/${trip.id}`} 
            className="btn btn-primary flex-1 justify-center"
          >
            View Details
          </Link>
          {showActions && (
            <button 
              onClick={handleDelete}
              className="btn btn-danger px-3"
              title="Delete Trip"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Availability Badge */}
      {trip.availableSeats <= 5 && trip.availableSeats > 0 && (
        <div className="absolute top-4 right-4">
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
            Only {trip.availableSeats} left!
          </span>
        </div>
      )}
      
      {trip.availableSeats === 0 && (
        <div className="absolute top-4 right-4">
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            Sold Out
          </span>
        </div>
      )}
    </div>
  );
};

export default TripCard;