import React from 'react'
import RestaurantCard from './RestaurantCard'
import { Search, Filter } from 'lucide-react'

const RestaurantList = ({ restaurants, loading, error, onRestaurantClick }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Nearby Restaurants
        </h1>
        <p className="text-gray-600">
          Discover the best food around you
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for restaurants or cuisines..."
            className="input-field pl-10"
          />
        </div>
        <button className="btn btn-secondary">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => onRestaurantClick(restaurant)}
          />
        ))}
      </div>

      {restaurants.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No restaurants found in your area.
          </p>
        </div>
      )}
    </div>
  )
}

export default RestaurantList