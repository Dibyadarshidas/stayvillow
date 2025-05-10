'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import PropertyMap from "@/app/components/PropertyMap";
import SEO from "@/app/components/SEO";
import { getVacationRentalSchema, getBreadcrumbSchema } from "@/app/lib/structuredData";
import { getPropertyById, getPropertyReviews } from "@/app/data/mockData";

// For future migration to server component:
// export async function generateMetadata({ params }: { params: { id: string }}): Promise<Metadata> {
//   const property = getPropertyById(params.id);
//   if (!property) return { title: 'Property Not Found' };
//   
//   return generateMetadata({
//     title: `${property.title} in ${property.location}`,
//     description: property.description.substring(0, 160),
//     keywords: [
//       `${property.location} vacation rental`,
//       `${property.location.split(',')[0]} accommodation`,
//       ...(property.amenities || []).slice(0, 5),
//       `${property.bedrooms || property.details?.bedrooms} bedroom ${property.propertyType || 'property'}`,
//       'luxury stay'
//     ],
//     ogImage: property.images?.[0] || property.image,
//     structuredData: getVacationRentalSchema(property)
//   });
// }

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userReview, setUserReview] = useState<{ rating: number; comment: string } | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [propertyReviews, setPropertyReviews] = useState([]);

  useEffect(() => {
    // Get property data from our centralized mockData
    const propertyData = getPropertyById(id as string);
    setProperty(propertyData);
    
    if (propertyData) {
      setSelectedImage(0);
      // Also get the reviews for this property
      const reviews = getPropertyReviews(id as string);
      setPropertyReviews(reviews || []);
    }
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-20 w-20 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="h-2 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  // Calculate duration and total price
  const getDuration = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const duration = getDuration();
  const totalPrice = duration * parseInt(property.price.replace(/[^\d]/g, ''));

  // Get seasonal travel tips based on check-in date
  const getSeasonalTips = () => {
    if (!checkIn) return null;
    
    const month = new Date(checkIn).getMonth();
    
    // Summer (March to May)
    if (month >= 2 && month <= 4) {
      return "You're visiting during summer - it will be hot in most parts of India. The beaches are less crowded this time of year. Pack light clothes and plenty of sunscreen.";
    }
    // Monsoon (June to September)
    else if (month >= 5 && month <= 8) {
      return "You're visiting during monsoon season. Enjoy lush green landscapes and fewer tourists, but be prepared for occasional heavy rains. Many outdoor activities may be limited during this time.";
    }
    // Winter/Peak season (October to February)
    else {
      return "You're visiting during the peak tourist season. The weather is perfect and all attractions are open. Book activities in advance as this is a popular time to visit.";
    }
  };
  
  // Generate SEO metadata for the property
  const seoTitle = `${property.title} in ${property.location}`;
  const seoDescription = property.description.length > 160 
    ? `${property.description.substring(0, 157)}...` 
    : property.description;
  const seoKeywords = [
    `${property.location} vacation rental`,
    `${property.location.split(',')[0]} accommodation`,
    ...(property.amenities ? property.amenities.slice(0, 5) : []),
    `${property.bedrooms || property.details?.bedrooms} bedroom ${property.propertyType || 'property'}`,
    'luxury stay'
  ];
  
  // Generate structured data
  const structuredData = getVacationRentalSchema(property);
  
  // Breadcrumb structured data
  const breadcrumbItems = [
    { name: 'Home', url: 'https://stayvillow.com/' },
    { name: 'Search', url: 'https://stayvillow.com/search' },
    { name: property.location.split(',')[0], url: `https://stayvillow.com/search?location=${encodeURIComponent(property.location.split(',')[0])}` },
    { name: property.title, url: `https://stayvillow.com/property/${property.id}` }
  ];
  const breadcrumbData = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage={property.images?.[0] || property.image}
        ogType="website"
        structuredData={structuredData}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap text-sm">
              <li className="flex items-center">
                <Link href="/" className="text-gray-500 hover:text-[var(--color-primary)]">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="flex items-center">
                <Link href="/search" className="text-gray-500 hover:text-[var(--color-primary)]">Search</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="flex items-center">
                <Link 
                  href={`/search?location=${encodeURIComponent(property.location.split(',')[0])}`}
                  className="text-gray-500 hover:text-[var(--color-primary)]"
                >
                  {property.location.split(',')[0]}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="text-[var(--color-primary)]" aria-current="page">
                {property.title}
              </li>
            </ol>
          </nav>
          
          <Link href="/search" className="text-[var(--color-primary)] flex items-center gap-1 mb-4 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Back to search
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <div className="flex items-center text-sm">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-1 text-gray-500">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {property.location}
            </div>
            
            <div className="flex items-center text-sm">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-1 text-yellow-500">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
              <span>{property.rating}</span>
              <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
            </div>
            
            {property.hasVirtualTour && (
              <Link href={`/virtual-tours?property=${property.id}`} className="flex items-center gap-1 text-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                Virtual Tour Available
              </Link>
            )}
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={property.images[selectedImage]}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {property.images.slice(0, 4).map((image, index) => (
              <div 
                key={index}
                className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 ${index === selectedImage ? 'border-[var(--color-primary)]' : 'border-transparent'}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Property Details */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600 mb-6">{property.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-gray-500 text-sm mb-1">Guests</div>
                <div className="font-bold">{property.maxGuests} max</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-gray-500 text-sm mb-1">Bedrooms</div>
                <div className="font-bold">{property.bedrooms}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-gray-500 text-sm mb-1">Bathrooms</div>
                <div className="font-bold">{property.bathrooms}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-gray-500 text-sm mb-1">Price</div>
                <div className="font-bold text-[var(--color-primary)]">{property.pricePerNight}/night</div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-[var(--color-primary)]">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="mb-8">
              <PropertyMap 
                title={property.title}
                location={property.location}
                lat={property.coordinates.lat}
                lng={property.coordinates.lng}
              />
            </div>
          </div>
          
          {/* Booking Widget */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Book this property</h3>
              
              <div className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                {property.price} <span className="text-sm font-normal text-gray-500">per night</span>
              </div>
              
              <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  >
                    {Array.from({length: property.maxGuests}, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Book Now
                </button>
              </form>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{property.price} x {duration} nights</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span>₹{Math.round(totalPrice * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service fee</span>
                  <span>₹{Math.round(totalPrice * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span>₹{Math.round(totalPrice * 1.1).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 