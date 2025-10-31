// Mock API data
const mockRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    cuisine: "North Indian, Chinese",
    rating: 4.3,
    deliveryTime: "25-30 min",
    price: "₹300 for one",
    distance: "1.2 km"
  },
  {
    id: 2,
    name: "Burger Palace",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=300&fit=crop",
    cuisine: "American, Fast Food",
    rating: 4.1,
    deliveryTime: "20-25 min",
    price: "₹200 for one",
    distance: "0.8 km"
  },
  {
    id: 3,
    name: "Pizza Heaven",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop",
    cuisine: "Italian, Pizza",
    rating: 4.5,
    deliveryTime: "30-35 min",
    price: "₹400 for one",
    distance: "1.5 km"
  },
  {
    id: 4,
    name: "Sushi Master",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop",
    cuisine: "Japanese, Sushi",
    rating: 4.7,
    deliveryTime: "35-40 min",
    price: "₹600 for one",
    distance: "2.1 km"
  },
  {
    id: 5,
    name: "Mexican Fiesta",
    image:
      "https://images.unsplash.com/photo-1565299585323-38174c13fae8?w=500&h=300&fit=crop",
    cuisine: "Mexican, Tex-Mex",
    rating: 4.2,
    deliveryTime: "25-30 min",
    price: "₹350 for one",
    distance: "1.8 km"
  }
];

export const restaurantAPI = {
  getNearbyRestaurants: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: mockRestaurants,
          status: "success"
        });
      }, 1000);
    });
  },

  getRestaurantById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const restaurant = mockRestaurants.find((r) => r.id === parseInt(id));
        if (restaurant) {
          resolve({ data: restaurant, status: "success" });
        } else {
          reject({ error: "Restaurant not found" });
        }
      }, 500);
    });
  }
};
