// Mock property data
export const properties = [
  {
    id: 1,
    title: "Luxury Beach Villa",
    location: "Goa, India",
    price: "₹12,000",
    pricePerNight: "₹12,000",
    rating: 4.9,
    reviews: 86,
    description: "This stunning beachfront villa offers panoramic ocean views and direct access to Anjuna Beach. Enjoy the infinity pool, spacious living areas, and luxury amenities throughout. Perfect for families or groups looking for an unforgettable beach vacation.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Private Pool", "Beach Access", "4 Bedrooms", "5 Bathrooms", "Air Conditioning", "Fully Equipped Kitchen", "WiFi", "Garden", "BBQ Area", "Parking"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 5,
    hasVirtualTour: true,
    coordinates: {
      lat: 15.5937,
      lng: 73.7424
    },
    propertyType: "Villa",
    host: {
      id: 1,
      name: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
      responseRate: "98%",
      responseTime: "within an hour",
      rating: 4.9,
      isSuperhost: true,
      joinedDate: "January 2020"
    },
    rules: {
      checkInTime: "2:00 PM",
      checkOutTime: "11:00 AM",
      allowPets: false,
      allowParties: false,
      allowSmoking: false,
      cancellationPolicy: "Flexible"
    },
    availability: {
      minStay: 2,
      maxStay: 30,
      blockedDates: []
    },
    metrics: {
      views: 1240,
      bookmarks: 78,
      avgRating: 4.9
    }
  },
  {
    id: 2,
    title: "Mountain View Cabin",
    location: "Manali, Himachal Pradesh",
    price: "₹8,500",
    pricePerNight: "₹8,500",
    rating: 4.8,
    reviews: 64,
    description: "Cozy wooden cabin with breathtaking views of the Himalayan mountains. Surrounded by pine forests and located just 5km from Mall Road. Features a fireplace, outdoor deck, and modern amenities while maintaining rustic charm.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Mountain View", "Fireplace", "3 Bedrooms", "2 Bathrooms", "Heating", "Fully Equipped Kitchen", "WiFi", "Private Deck", "Parking", "Hiking Trails"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    hasVirtualTour: true,
    coordinates: {
      lat: 32.2432,
      lng: 77.1892
    },
    propertyType: "Cabin",
    host: {
      id: 2,
      name: "Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
      responseRate: "95%",
      responseTime: "within a day",
      rating: 4.8,
      isSuperhost: true,
      joinedDate: "March 2021"
    },
    rules: {
      checkInTime: "3:00 PM",
      checkOutTime: "10:00 AM",
      allowPets: true,
      allowParties: false,
      allowSmoking: false,
      cancellationPolicy: "Moderate"
    },
    availability: {
      minStay: 2,
      maxStay: 14,
      blockedDates: []
    },
    metrics: {
      views: 980,
      bookmarks: 56,
      avgRating: 4.8
    }
  },
  {
    id: 3,
    title: "Lakeside Retreat",
    location: "Udaipur, Rajasthan",
    price: "₹15,000",
    pricePerNight: "₹15,000",
    rating: 4.7,
    reviews: 78,
    description: "Elegant lakeside property with traditional Rajasthani architecture and modern amenities. Enjoy beautiful sunset views over Lake Pichola from the private rooftop terrace. Located just minutes from the City Palace and other attractions.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Lake View", "Rooftop Terrace", "5 Bedrooms", "4 Bathrooms", "Air Conditioning", "Fully Equipped Kitchen", "WiFi", "Pool", "Garden", "Parking"],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    hasVirtualTour: false,
    coordinates: {
      lat: 24.5854,
      lng: 73.7125
    },
    propertyType: "Heritage Home",
    host: {
      id: 3,
      name: "Anita Desai",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
      responseRate: "100%",
      responseTime: "within a few hours",
      rating: 4.7,
      isSuperhost: false,
      joinedDate: "November 2019"
    },
    rules: {
      checkInTime: "2:00 PM",
      checkOutTime: "12:00 PM",
      allowPets: false,
      allowParties: true,
      allowSmoking: false,
      cancellationPolicy: "Strict"
    },
    availability: {
      minStay: 3,
      maxStay: 21,
      blockedDates: []
    },
    metrics: {
      views: 1420,
      bookmarks: 92,
      avgRating: 4.7
    }
  },
  {
    id: 4,
    title: "Heritage Haveli Suite",
    location: "Jaipur, Rajasthan",
    price: "₹18,000",
    pricePerNight: "₹18,000",
    rating: 4.9,
    reviews: 42,
    description: "Experience royal Rajasthani living in this beautifully restored heritage haveli. Featuring hand-painted frescoes, traditional jharokha windows, and luxurious furnishings. Centrally located near Hawa Mahal and City Palace.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80", 
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Heritage Architecture", "Royal Décor", "2 Bedrooms", "2 Bathrooms", "Air Conditioning", "Private Courtyard", "WiFi", "Breakfast Included", "Airport Transfer", "Tour Guides"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    hasVirtualTour: true,
    coordinates: {
      lat: 26.9124,
      lng: 75.7873
    },
    propertyType: "Heritage Haveli",
    host: {
      id: 4,
      name: "Vikram Singh",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
      responseRate: "97%",
      responseTime: "within an hour",
      rating: 4.9,
      isSuperhost: true,
      joinedDate: "February 2018"
    },
    rules: {
      checkInTime: "2:00 PM",
      checkOutTime: "11:00 AM",
      allowPets: false,
      allowParties: false,
      allowSmoking: false,
      cancellationPolicy: "Strict"
    },
    availability: {
      minStay: 2,
      maxStay: 14,
      blockedDates: []
    },
    metrics: {
      views: 856,
      bookmarks: 68,
      avgRating: 4.9
    }
  },
  {
    id: 5,
    title: "Beachfront Cottage",
    location: "Kovalam, Kerala",
    price: "₹10,500",
    pricePerNight: "₹10,500",
    rating: 4.8,
    reviews: 56,
    description: "Charming cottage with direct beach access and panoramic views of the Arabian Sea. Enjoy the sound of waves from your private veranda. Traditional Kerala architecture combined with modern comforts. Perfect for a peaceful getaway.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517541866997-7c5d29dd7947?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Beachfront", "Sea View", "2 Bedrooms", "1 Bathroom", "Air Conditioning", "Kitchen", "WiFi", "Private Veranda", "Hammock", "Beach Chairs"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    hasVirtualTour: false,
    coordinates: {
      lat: 8.3988,
      lng: 76.9821
    },
    propertyType: "Cottage",
    host: {
      id: 5,
      name: "Thomas Jacob",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80",
      responseRate: "92%",
      responseTime: "within a day",
      rating: 4.8,
      isSuperhost: false,
      joinedDate: "June 2020"
    },
    rules: {
      checkInTime: "3:00 PM",
      checkOutTime: "11:00 AM",
      allowPets: false,
      allowParties: false,
      allowSmoking: true,
      cancellationPolicy: "Moderate"
    },
    availability: {
      minStay: 3,
      maxStay: 21,
      blockedDates: []
    },
    metrics: {
      views: 724,
      bookmarks: 45,
      avgRating: 4.8
    }
  }
];

export const getFeaturedProperties = () => {
  return properties.slice(0, 3);
};

export const getPropertyById = (id: string | number) => {
  return properties.find(property => property.id.toString() === id.toString());
};

export const getPropertiesByLocation = (location: string) => {
  return properties.filter(property => 
    property.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getPropertiesByAmenity = (amenity: string) => {
  return properties.filter(property => 
    property.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
  );
};

export const getPropertiesByType = (type: string) => {
  return properties.filter(property => 
    property.propertyType.toLowerCase().includes(type.toLowerCase())
  );
}; 