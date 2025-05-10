// Mock location data
export const locations = [
  {
    id: 1,
    name: "Goa",
    state: "Goa",
    country: "India",
    description: "Goa is a coastal paradise known for its stunning beaches, vibrant nightlife, and Portuguese-influenced architecture. From the bustling shores of Baga to the serene sands of Palolem, Goa offers diverse experiences for every traveler.",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1451440063999-77a8b2a5c387?w=800&auto=format&fit=crop&q=80"
    ],
    propertyCount: 243,
    coordinates: {
      type: "Point",
      coordinates: [73.9852, 15.2993]
    },
    popularityScore: 95,
    featured: true,
    seasonality: [
      {
        season: "winter",
        startMonth: 10, // November
        endMonth: 1, // February
        description: "Peak season with perfect weather, clear skies, and comfortable temperatures. Ideal for beach activities and water sports.",
        isRecommended: true,
        averagePricing: 12000
      },
      {
        season: "summer",
        startMonth: 2, // March
        endMonth: 4, // May
        description: "Hot and humid with fewer tourists. Good deals on accommodation but very warm for outdoor activities.",
        isRecommended: false,
        averagePricing: 8000
      },
      {
        season: "monsoon",
        startMonth: 5, // June
        endMonth: 9, // October
        description: "Lush green landscapes with occasional heavy rains. Many beach shacks close, but nature is at its most beautiful.",
        isRecommended: false,
        averagePricing: 6500
      }
    ],
    travelTips: [
      "Rent a scooter or motorbike to explore the state easily",
      "Visit the spice plantations in the hinterland for a different experience",
      "Try the local Goan cuisine, especially seafood and vindaloo",
      "Beach hopping is best done early morning or evening to avoid the midday heat"
    ],
    localEvents: [
      {
        name: "Goa Carnival",
        description: "Vibrant street festival with parades, music, and dancing",
        startDate: "February 10, 2024",
        endDate: "February 14, 2024"
      },
      {
        name: "Sunburn Festival",
        description: "One of Asia's biggest electronic dance music festivals",
        startDate: "December 28, 2024",
        endDate: "December 30, 2024"
      }
    ]
  },
  {
    id: 2,
    name: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    description: "Nestled in the mountains of Himachal Pradesh, Manali is a picturesque hill station offering stunning views of the Himalayas. Popular for adventure activities, ancient temples, and its proximity to Rohtang Pass, it's a year-round destination with something to offer in every season.",
    images: [
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590051933219-5e22dd31c44b?w=800&auto=format&fit=crop&q=80"
    ],
    propertyCount: 175,
    coordinates: {
      type: "Point",
      coordinates: [77.1892, 32.2432]
    },
    popularityScore: 90,
    featured: true,
    seasonality: [
      {
        season: "summer",
        startMonth: 3, // April
        endMonth: 5, // June
        description: "Pleasant weather perfect for outdoor activities, trekking, and sightseeing. The flower-filled valleys are especially beautiful.",
        isRecommended: true,
        averagePricing: 9500
      },
      {
        season: "monsoon",
        startMonth: 6, // July
        endMonth: 8, // September
        description: "Occasional landslides may disrupt travel, but the lush green landscape offers a unique experience with fewer tourists.",
        isRecommended: false,
        averagePricing: 6000
      },
      {
        season: "winter",
        startMonth: 9, // October
        endMonth: 2, // March
        description: "Snowfall transforms Manali into a winter wonderland. Perfect for snow sports, though some roads may be closed due to heavy snow.",
        isRecommended: true,
        averagePricing: 8000
      }
    ],
    travelTips: [
      "Check road conditions during monsoon and winter seasons",
      "Pack layers as temperature can vary significantly between day and night",
      "Visit Solang Valley for adventure activities like paragliding and zorbing",
      "Try local Himachali dishes like Siddu and Dham"
    ],
    localEvents: [
      {
        name: "Winter Carnival",
        description: "Celebration with cultural performances, winter sports, and local crafts",
        startDate: "January 2, 2024",
        endDate: "January 6, 2024"
      },
      {
        name: "Hadimba Devi Festival",
        description: "Traditional festival at the ancient Hadimba Temple",
        startDate: "May 14, 2024",
        endDate: "May 14, 2024"
      }
    ]
  },
  {
    id: 3,
    name: "Udaipur",
    state: "Rajasthan",
    country: "India",
    description: "Known as the 'City of Lakes', Udaipur is celebrated for its romantic setting, royal heritage, and Rajput-era palaces. The city's lakes, marble palaces, and vibrant bazaars make it one of India's most beautiful and culturally rich destinations.",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524501047859-4443b2633db5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590077317380-8429aec2cfb4?w=800&auto=format&fit=crop&q=80"
    ],
    propertyCount: 210,
    coordinates: {
      type: "Point",
      coordinates: [73.7125, 24.5854]
    },
    popularityScore: 88,
    featured: true,
    seasonality: [
      {
        season: "winter",
        startMonth: 9, // October
        endMonth: 2, // March
        description: "The most pleasant season with cool temperatures, perfect for exploring palaces and outdoor sightseeing.",
        isRecommended: true,
        averagePricing: 14000
      },
      {
        season: "summer",
        startMonth: 3, // April
        endMonth: 5, // June
        description: "Very hot temperatures make outdoor activities challenging, but lower prices and fewer tourists are advantages.",
        isRecommended: false,
        averagePricing: 9000
      },
      {
        season: "monsoon",
        startMonth: 6, // July
        endMonth: 8, // September
        description: "Moderate rainfall brings lush greenery to the surrounding hills, and the lakes fill up. A beautiful time to visit despite occasional rain.",
        isRecommended: true,
        averagePricing: 10000
      }
    ],
    travelTips: [
      "Take a boat ride on Lake Pichola for the best views of the City Palace",
      "Visit the nearby Kumbhalgarh Fort for a day trip",
      "Shop for traditional Rajasthani handicrafts and textiles",
      "Experience a cultural performance at Bagore Ki Haveli"
    ],
    localEvents: [
      {
        name: "Mewar Festival",
        description: "Traditional festival celebrating the arrival of spring with cultural performances and processions",
        startDate: "March 22, 2024",
        endDate: "March 24, 2024"
      },
      {
        name: "Shilpgram Crafts Fair",
        description: "Annual crafts fair showcasing traditional arts and crafts from all over India",
        startDate: "December 21, 2024",
        endDate: "December 30, 2024"
      }
    ]
  },
  {
    id: 4,
    name: "Kerala",
    state: "Kerala",
    country: "India",
    description: "Known as 'God's Own Country', Kerala offers a tranquil escape with its serene backwaters, lush tea plantations, pristine beaches, and wildlife sanctuaries. Famous for Ayurvedic treatments, houseboat stays, and diverse cultural heritage.",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590123668638-e5b608fdf333?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=80"
    ],
    propertyCount: 186,
    coordinates: {
      type: "Point",
      coordinates: [76.2711, 10.8505]
    },
    popularityScore: 93,
    featured: true,
    seasonality: [
      {
        season: "winter",
        startMonth: 10, // November
        endMonth: 1, // February
        description: "The best time to visit with pleasant, dry weather perfect for all activities, from beach visits to backwater cruises.",
        isRecommended: true,
        averagePricing: 11000
      },
      {
        season: "summer",
        startMonth: 2, // March
        endMonth: 4, // May
        description: "Hot and humid, but good for hill station visits to Munnar and Wayanad where temperatures are cooler.",
        isRecommended: false,
        averagePricing: 8500
      },
      {
        season: "monsoon",
        startMonth: 5, // June
        endMonth: 9, // October
        description: "Heavy rainfall with occasional breaks. The landscape turns incredibly green, and it's the ideal time for Ayurvedic treatments.",
        isRecommended: true,
        averagePricing: 7000
      }
    ],
    travelTips: [
      "Experience a houseboat stay in the backwaters of Alleppey",
      "Try traditional Kerala cuisine served on banana leaves",
      "Book an Ayurvedic wellness package for rejuvenation",
      "Attend a Kathakali dance performance to experience traditional culture"
    ],
    localEvents: [
      {
        name: "Onam",
        description: "Kerala's harvest festival with boat races, flower arrangements, and feasts",
        startDate: "September 10, 2024",
        endDate: "September 20, 2024"
      },
      {
        name: "Theyyam",
        description: "Ancient ritual dance form performed at local temples in North Kerala",
        startDate: "November 15, 2024",
        endDate: "May 30, 2025"
      }
    ]
  }
];

export const getFeaturedLocations = () => {
  return locations.filter(location => location.featured);
};

export const getLocationById = (id: string | number) => {
  return locations.find(location => location.id.toString() === id.toString());
};

export const getLocationByName = (name: string) => {
  return locations.find(location => 
    location.name.toLowerCase() === name.toLowerCase()
  );
};

export const getSeasonalRecommendations = (month: number = new Date().getMonth()) => {
  return locations
    .flatMap(location => 
      location.seasonality
        .filter(season => 
          (season.startMonth <= month && month <= season.endMonth) || 
          (season.startMonth > season.endMonth && (month >= season.startMonth || month <= season.endMonth))
        )
        .filter(season => season.isRecommended)
        .map(season => ({
          location: location.name,
          state: location.state,
          season: season.season,
          description: season.description,
          images: location.images
        }))
    );
}; 