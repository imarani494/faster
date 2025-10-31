import { useState, useEffect } from 'react'
import { restaurantAPI } from '../services/api'

export const useRestaurants = (location) => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await restaurantAPI.getNearbyRestaurants()
        setRestaurants(response.data)
      } catch (err) {
        setError(err.message || 'Failed to fetch restaurants')
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [location])

  return { restaurants, loading, error }
}