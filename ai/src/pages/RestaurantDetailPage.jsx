import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restaurantAPI } from "../services/api";
import { useAuth } from "../services/auth";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await restaurantAPI.getRestaurantById(id);
        setRestaurant(response.data);
      } catch (err) {
        console.error("Restaurant not found");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !e.currentTarget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setLogoPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${restaurant.name} on Fastor!`,
          text: `I found ${restaurant.name} on Fastor app`,
          url: window.location.href
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      alert("Share functionality is available in supported browsers");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="error">Restaurant not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate("/")} className="btn btn-secondary">
              ← Back
            </button>

            <div className="flex items-center space-x-4">
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Restaurant Info */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {restaurant.name}
          </h1>
          <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>⭐ {restaurant.rating}</span>
            <span>•</span>
            <span>{restaurant.deliveryTime}</span>
            <span>•</span>
            <span>{restaurant.distance}</span>
          </div>
        </div>

        {/* Image Superimpose */}
        <div className="max-w-4xl mx-auto">
          <div className="card p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image Container */}
              <div className="flex-1">
                <div
                  className="relative bg-gray-100 rounded-lg overflow-hidden cursor-move"
                  style={{ paddingBottom: "75%" }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    src={restaurant.image}
                    alt="Restaurant"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Fastor Logo Overlay */}
                  <div
                    className="absolute cursor-move select-none"
                    style={{
                      left: `${logoPosition.x}%`,
                      top: `${logoPosition.y}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="bg-red-600 text-white rounded-lg px-3 py-2 font-bold text-sm shadow-lg">
                      FASTOR
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="lg:w-64 space-y-4">
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-lg mb-2">
                    Customize & Share
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Drag the Fastor logo to reposition it
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="btn btn-primary w-full"
                  >
                    Share Image
                  </button>

                  <button
                    onClick={() =>
                      alert("Download functionality would be implemented here")
                    }
                    className="btn btn-secondary w-full"
                  >
                    Download
                  </button>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> Drag the Fastor logo to any position,
                    then share it!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
