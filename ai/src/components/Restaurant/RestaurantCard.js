import React from 'react'
import { Star, Clock, MapPin } from 'lucide-react'

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div className="card cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 text-sm font-semibold">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          {restaurant.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">
          {restaurant.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2 truncate">
          {restaurant.cuisine}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.distance}</span>
          </div>
          
          <span>{restaurant.price}</span>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard