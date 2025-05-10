// Mock user data
export const users = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    userType: "host",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
    verified: true,
    hostInfo: {
      description: "Hello! I'm Priya, a proud Goa native who loves sharing the beauty of my hometown with travelers. I've been hosting for over 3 years and take pride in offering authentic experiences in my beachfront properties.",
      responseRate: 98,
      responseTime: "within an hour",
      isSuperhost: true,
      verified: true,
      joinedDate: new Date("2020-01-15")
    },
    address: {
      street: "123 Beach Road",
      city: "Baga",
      state: "Goa",
      zipCode: "403516",
      country: "India"
    },
    savedProperties: [3, 5],
    createdAt: new Date("2020-01-15"),
    updatedAt: new Date("2023-06-20")
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 87654 32109",
    userType: "host",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    verified: true,
    hostInfo: {
      description: "Greetings from the Himalayas! I'm Rajesh, a mountain enthusiast who converted my ancestral properties into cozy retreats for travelers. I love sharing local hiking trails and stories around the bonfire.",
      responseRate: 95,
      responseTime: "within a day",
      isSuperhost: true,
      verified: true,
      joinedDate: new Date("2021-03-10")
    },
    address: {
      street: "45 Pine View",
      city: "Manali",
      state: "Himachal Pradesh",
      zipCode: "175131",
      country: "India"
    },
    savedProperties: [1],
    createdAt: new Date("2021-03-10"),
    updatedAt: new Date("2023-08-15")
  },
  {
    id: 3,
    name: "Anita Desai",
    email: "anita.desai@example.com",
    phone: "+91 76543 21098",
    userType: "host",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
    verified: true,
    hostInfo: {
      description: "Hello, I'm Anita! I manage a collection of heritage properties in Rajasthan that have been in my family for generations. Each stay offers a glimpse into royal Rajasthani lifestyle with modern comforts.",
      responseRate: 100,
      responseTime: "within a few hours",
      isSuperhost: false,
      verified: true,
      joinedDate: new Date("2019-11-20")
    },
    address: {
      street: "78 Lake Palace Road",
      city: "Udaipur",
      state: "Rajasthan",
      zipCode: "313001",
      country: "India"
    },
    savedProperties: [2, 4],
    createdAt: new Date("2019-11-20"),
    updatedAt: new Date("2023-05-10")
  },
  {
    id: 4,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 65432 10987",
    userType: "traveler",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    verified: true,
    travelPreferences: {
      preferredLocations: ["Goa", "Kerala", "Himachal Pradesh"],
      preferredPropertyTypes: ["Villa", "Cabin", "Beach House"],
      preferredAmenities: ["Pool", "WiFi", "Mountain View"],
      priceRange: {
        min: 5000,
        max: 15000
      },
      travelStyle: ["Adventure", "Relaxation", "Culture"]
    },
    address: {
      street: "56 Corporate Park",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India"
    },
    savedProperties: [1, 2, 5],
    createdAt: new Date("2021-05-05"),
    updatedAt: new Date("2023-09-12")
  },
  {
    id: 5,
    name: "Meera Reddy",
    email: "meera.reddy@example.com",
    phone: "+91 54321 09876",
    userType: "traveler",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    verified: true,
    travelPreferences: {
      preferredLocations: ["Rajasthan", "Kerala", "Goa"],
      preferredPropertyTypes: ["Heritage Home", "Houseboat", "Villa"],
      preferredAmenities: ["Cultural Experience", "Local Food", "Unique Architecture"],
      priceRange: {
        min: 8000,
        max: 20000
      },
      travelStyle: ["Culture", "Photography", "Luxury"]
    },
    address: {
      street: "123 Film City Road",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India"
    },
    savedProperties: [3, 4],
    createdAt: new Date("2020-08-12"),
    updatedAt: new Date("2023-07-22")
  }
];

export const getHosts = () => {
  return users.filter(user => user.userType === "host");
};

export const getTravelers = () => {
  return users.filter(user => user.userType === "traveler");
};

export const getUserById = (id: string | number) => {
  return users.find(user => user.id.toString() === id.toString());
};

export const getUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
}; 