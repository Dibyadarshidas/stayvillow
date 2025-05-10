// Mock review data
export const reviews = [
  {
    id: 1,
    property: 1, // Luxury Beach Villa
    booking: 1,
    reviewer: 4, // Amit Patel
    host: 1, // Priya Sharma
    rating: 5,
    comment: "This villa exceeded all our expectations! The location right on Anjuna Beach is unbeatable, and the infinity pool overlooking the ocean was magical, especially at sunset. Priya was an amazing host who arranged everything from airport transfers to in-villa massages. The villa itself is beautifully designed with spacious rooms and top-notch amenities. We'll definitely be coming back!",
    aspects: {
      cleanliness: 5,
      communication: 5,
      checkIn: 5,
      accuracy: 5,
      location: 5,
      value: 4
    },
    tags: ["Amazing view", "Great pool", "Perfect location", "Responsive host"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520251185620-2d966d305ea5?w=800&auto=format&fit=crop&q=80"
    ],
    hostResponse: {
      comment: "Thank you so much for your wonderful review, Amit! It was a pleasure hosting you and your family. I'm delighted that you enjoyed the villa and the amenities we prepared. The sunsets from the infinity pool are indeed special, and I'm glad you got to experience them. Looking forward to welcoming you back soon!",
      timestamp: new Date("2023-10-25T14:30:00")
    },
    helpful: 12,
    status: "published",
    createdAt: new Date("2023-10-22T09:15:00"),
    updatedAt: new Date("2023-10-25T14:30:00")
  },
  {
    id: 2,
    property: 4, // Heritage Haveli Suite
    booking: 4,
    reviewer: 5, // Meera Reddy
    host: 3, // Anita Desai
    rating: 5,
    comment: "Staying at this heritage haveli was like stepping back in time to the royal era of Rajasthan, but with all modern comforts. The hand-painted frescoes and intricate jharokha windows were absolutely stunning - a photographer's dream! The location near the City Palace made it easy to explore Jaipur's main attractions. Anita arranged a private tour guide who was incredibly knowledgeable about local history. The traditional Rajasthani breakfast served in the courtyard was a highlight every morning. Truly a magical experience!",
    aspects: {
      cleanliness: 5,
      communication: 5,
      checkIn: 4,
      accuracy: 5,
      location: 5,
      value: 5
    },
    tags: ["Historical property", "Beautiful architecture", "Great location", "Cultural experience"],
    images: [
      "https://images.unsplash.com/photo-1566618515190-8bb4166bb305?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585264550248-1778be3b6368?w=800&auto=format&fit=crop&q=80"
    ],
    hostResponse: {
      comment: "Thank you for your beautiful review, Meera! I'm so pleased that you appreciated the historical details of our haveli and enjoyed the authentic Rajasthani experience we try to create for our guests. Your photos are stunning and really capture the essence of the property. We hope to welcome you back for another stay when you return to Jaipur!",
      timestamp: new Date("2024-11-07T10:45:00")
    },
    helpful: 9,
    status: "published",
    createdAt: new Date("2024-11-06T14:20:00"),
    updatedAt: new Date("2024-11-07T10:45:00")
  },
  {
    id: 3,
    property: 2, // Mountain View Cabin
    booking: null, // No linked booking as this is from before booking system
    reviewer: 4, // Amit Patel
    host: 2, // Rajesh Kumar
    rating: 4,
    comment: "This mountain cabin was the perfect winter getaway. Waking up to snow-capped Himalayan views from the bedroom window was incredible. The fireplace kept us warm and cozy during the chilly evenings. Rajesh was very helpful and arranged for snow equipment rental. The only small issue was that the hot water was a bit inconsistent, but that's understandable given the remote location. Overall, we had a wonderful stay and would recommend this cabin to anyone looking for a peaceful mountain retreat.",
    aspects: {
      cleanliness: 4,
      communication: 5,
      checkIn: 5,
      accuracy: 4,
      location: 5,
      value: 4
    },
    tags: ["Mountain views", "Cozy fireplace", "Peaceful", "Great hiking"],
    hostResponse: {
      comment: "Thank you for your review, Amit! I'm glad you enjoyed your stay at our mountain cabin. I appreciate your feedback about the hot water - we've since upgraded our water heating system to be more reliable even in peak winter. Hope to host you again, perhaps during spring when the wildflowers are in bloom!",
      timestamp: new Date("2023-02-10T17:30:00")
    },
    helpful: 7,
    status: "published",
    createdAt: new Date("2023-02-05T11:20:00"),
    updatedAt: new Date("2023-02-10T17:30:00")
  },
  {
    id: 4,
    property: 3, // Lakeside Retreat
    booking: null, // No linked booking
    reviewer: 5, // Meera Reddy
    host: 3, // Anita Desai
    rating: 5,
    comment: "This lakeside property in Udaipur is absolutely magical! Watching the sunset over Lake Pichola from the private rooftop terrace was the highlight of our trip. The property beautifully blends traditional Rajasthani architecture with modern amenities. The staff arranged a private boat tour of the lake which gave us stunning views of the City Palace and Jag Mandir. The rooms are spacious and elegantly decorated with local textiles and artwork. The location is perfect - quiet but just a short walk to main attractions. Highly recommended for a luxurious stay in Udaipur!",
    aspects: {
      cleanliness: 5,
      communication: 5,
      checkIn: 5,
      accuracy: 5,
      location: 5,
      value: 4
    },
    tags: ["Lake views", "Rooftop terrace", "Historical area", "Luxurious"],
    hostResponse: {
      comment: "Thank you for your lovely review, Meera! We're delighted that you enjoyed the unique location and the cultural experience we strive to provide. The sunset views from our terrace are indeed special, and I'm glad you had the chance to experience them. We hope to welcome you back to our lakeside retreat on your next visit to Udaipur!",
      timestamp: new Date("2023-11-18T09:15:00")
    },
    helpful: 11,
    status: "published",
    createdAt: new Date("2023-11-15T18:45:00"),
    updatedAt: new Date("2023-11-18T09:15:00")
  },
  {
    id: 5,
    property: 5, // Beachfront Cottage
    booking: null, // No linked booking
    reviewer: 4, // Amit Patel
    host: 5, // Thomas Jacob
    rating: 4,
    comment: "This beachfront cottage in Kovalam offers a perfect blend of simplicity and comfort. Falling asleep to the sound of waves and waking up to direct views of the Arabian Sea was therapeutic. The private veranda is a perfect spot for morning coffee or evening sundowners. Thomas was a great host who arranged a traditional Kerala cooking class for us. The cottage itself is tastefully decorated with local elements and has all essential amenities. Beach access is just steps away, and the location is quiet yet close enough to restaurants and shops. A wonderful laid-back beach experience!",
    aspects: {
      cleanliness: 4,
      communication: 4,
      checkIn: 5,
      accuracy: 4,
      location: 5,
      value: 5
    },
    tags: ["Beachfront", "Peaceful", "Great value", "Local experience"],
    hostResponse: {
      comment: "Thanks for your kind review, Amit! I'm happy you enjoyed the cottage and the beachfront location. The cooking class is something we love to arrange for guests who want to learn about Kerala cuisine. We've noted your feedback and hope to host you again for another relaxing stay by the sea!",
      timestamp: new Date("2023-08-28T15:30:00")
    },
    helpful: 6,
    status: "published",
    createdAt: new Date("2023-08-25T10:15:00"),
    updatedAt: new Date("2023-08-28T15:30:00")
  }
];

export const getPropertyReviews = (propertyId: string | number) => {
  return reviews.filter(review => review.property.toString() === propertyId.toString());
};

export const getHostReviews = (hostId: string | number) => {
  return reviews.filter(review => review.host.toString() === hostId.toString());
};

export const getUserReviews = (userId: string | number) => {
  return reviews.filter(review => review.reviewer.toString() === userId.toString());
};

export const getReviewById = (id: string | number) => {
  return reviews.find(review => review.id.toString() === id.toString());
};

export const getAverageRating = (propertyId: string | number) => {
  const propertyReviews = getPropertyReviews(propertyId);
  if (propertyReviews.length === 0) return 0;
  
  const total = propertyReviews.reduce((sum, review) => sum + review.rating, 0);
  return total / propertyReviews.length;
}; 