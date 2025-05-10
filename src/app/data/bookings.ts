// Mock booking data
export const bookings = [
  {
    id: 1,
    property: 1, // Luxury Beach Villa
    guest: 4, // Amit Patel
    host: 1, // Priya Sharma
    dates: {
      checkIn: new Date("2024-10-15"),
      checkOut: new Date("2024-10-20"),
      numberOfNights: 5
    },
    guests: {
      adults: 3,
      children: 1,
      infants: 0,
      total: 4
    },
    pricing: {
      nightlyRate: 12000,
      numberOfNights: 5,
      basePriceTotal: 60000,
      cleaningFee: 5000,
      serviceFee: 6000,
      taxes: 7100,
      discount: 0,
      totalAmount: 78100,
      currencyCode: "INR"
    },
    status: "confirmed",
    paymentStatus: "paid",
    payments: [
      {
        amount: 78100,
        method: "credit_card",
        status: "completed",
        transactionId: "txn_12345678",
        timestamp: new Date("2024-08-10T14:30:00")
      }
    ],
    specialRequests: "We'd like early check-in if possible, arriving around 11 AM.",
    guestItinerary: {
      arrivalTime: "11:00 AM",
      departureTime: "10:00 AM",
      travelMethod: "Car rental"
    },
    seasonalContext: {
      season: "winter",
      localEvents: ["Goa Carnival (Feb 10-14)"],
      weatherForecast: "Sunny with temperatures between 24-32°C",
      travelTips: [
        "Perfect beach weather",
        "Book water sports activities in advance",
        "Visit the Saturday Night Market at Arpora"
      ]
    },
    createdAt: new Date("2024-08-10T14:30:00"),
    updatedAt: new Date("2024-08-10T14:30:00")
  },
  {
    id: 2,
    property: 2, // Mountain View Cabin
    guest: 5, // Meera Reddy
    host: 2, // Rajesh Kumar
    dates: {
      checkIn: new Date("2024-12-05"),
      checkOut: new Date("2024-12-10"),
      numberOfNights: 5
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      total: 2
    },
    pricing: {
      nightlyRate: 8500,
      numberOfNights: 5,
      basePriceTotal: 42500,
      cleaningFee: 3000,
      serviceFee: 4500,
      taxes: 5000,
      discount: 0,
      totalAmount: 55000,
      currencyCode: "INR"
    },
    status: "pending",
    paymentStatus: "partially_paid",
    payments: [
      {
        amount: 27500,
        method: "upi",
        status: "completed",
        transactionId: "txn_23456789",
        timestamp: new Date("2024-09-15T10:15:00")
      }
    ],
    specialRequests: "We would appreciate some firewood for the fireplace during our stay.",
    guestItinerary: {
      arrivalTime: "3:00 PM",
      departureTime: "10:00 AM",
      travelMethod: "Taxi from Manali bus station"
    },
    seasonalContext: {
      season: "winter",
      localEvents: ["Winter Carnival (Jan 2-6)"],
      weatherForecast: "Cold with possible snowfall, temperatures between -2°C to 10°C",
      travelTips: [
        "Pack warm clothes and sturdy shoes",
        "Road to Rohtang Pass may be closed",
        "Try the local apple cider and Himachali cuisine"
      ]
    },
    createdAt: new Date("2024-09-15T10:15:00"),
    updatedAt: new Date("2024-09-15T10:15:00")
  },
  {
    id: 3,
    property: 3, // Lakeside Retreat
    guest: 4, // Amit Patel
    host: 3, // Anita Desai
    dates: {
      checkIn: new Date("2025-01-15"),
      checkOut: new Date("2025-01-18"),
      numberOfNights: 3
    },
    guests: {
      adults: 4,
      children: 2,
      infants: 0,
      total: 6
    },
    pricing: {
      nightlyRate: 15000,
      numberOfNights: 3,
      basePriceTotal: 45000,
      cleaningFee: 4000,
      serviceFee: 4900,
      taxes: 5400,
      discount: 0,
      totalAmount: 59300,
      currencyCode: "INR"
    },
    status: "confirmed",
    paymentStatus: "paid",
    payments: [
      {
        amount: 59300,
        method: "credit_card",
        status: "completed",
        transactionId: "txn_34567890",
        timestamp: new Date("2024-10-20T12:45:00")
      }
    ],
    specialRequests: "We would like to arrange a boat tour of Lake Pichola during our stay.",
    guestItinerary: {
      arrivalTime: "2:00 PM",
      departureTime: "11:00 AM",
      travelMethod: "Private car from Udaipur airport"
    },
    seasonalContext: {
      season: "winter",
      localEvents: ["Shilpgram Crafts Fair (Dec 21-30)"],
      weatherForecast: "Pleasant with temperatures between 10-25°C",
      travelTips: [
        "Perfect weather for sightseeing",
        "Book cultural performances in advance",
        "Visit the City Palace early in the morning to avoid crowds"
      ]
    },
    createdAt: new Date("2024-10-20T12:45:00"),
    updatedAt: new Date("2024-10-20T12:45:00")
  },
  {
    id: 4,
    property: 4, // Heritage Haveli Suite
    guest: 5, // Meera Reddy
    host: 3, // Anita Desai (assuming this property also belongs to her)
    dates: {
      checkIn: new Date("2024-11-02"),
      checkOut: new Date("2024-11-05"),
      numberOfNights: 3
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      total: 2
    },
    pricing: {
      nightlyRate: 18000,
      numberOfNights: 3,
      basePriceTotal: 54000,
      cleaningFee: 5000,
      serviceFee: 5900,
      taxes: 6500,
      discount: 0,
      totalAmount: 71400,
      currencyCode: "INR"
    },
    status: "completed",
    paymentStatus: "paid",
    payments: [
      {
        amount: 71400,
        method: "credit_card",
        status: "completed",
        transactionId: "txn_45678901",
        timestamp: new Date("2024-09-05T09:30:00")
      }
    ],
    specialRequests: "We are interested in a guided tour of Jaipur's historical sites.",
    guestItinerary: {
      arrivalTime: "1:00 PM",
      departureTime: "11:00 AM",
      travelMethod: "Private transfer from Jaipur airport"
    },
    seasonalContext: {
      season: "winter",
      localEvents: ["Jaipur Literature Festival (Jan 19-23)"],
      weatherForecast: "Pleasant with temperatures between 15-28°C",
      travelTips: [
        "Visit Amber Fort in the morning",
        "Shop for textiles and jewelry in the old city bazaars",
        "Try the local Rajasthani thali at LMB Restaurant"
      ]
    },
    reviewId: 2, // Linked to review ID
    createdAt: new Date("2024-09-05T09:30:00"),
    updatedAt: new Date("2024-11-06T14:20:00")
  }
];

export const getUserBookings = (userId: string | number) => {
  return bookings.filter(booking => booking.guest.toString() === userId.toString());
};

export const getHostBookings = (hostId: string | number) => {
  return bookings.filter(booking => booking.host.toString() === hostId.toString());
};

export const getPropertyBookings = (propertyId: string | number) => {
  return bookings.filter(booking => booking.property.toString() === propertyId.toString());
};

export const getBookingById = (id: string | number) => {
  return bookings.find(booking => booking.id.toString() === id.toString());
};

export const getBookingsByStatus = (status: string) => {
  return bookings.filter(booking => booking.status.toLowerCase() === status.toLowerCase());
}; 