'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Sample experiences data - same as in the experiences page
const experiencesList = [
  {
    id: 1,
    title: "Cooking Class in Delhi",
    description: "Learn authentic North Indian cuisine from expert local chefs. Master the art of spice blending and traditional cooking techniques in this hands-on experience.",
    longDescription: "Dive into the rich culinary heritage of North India with our immersive cooking class in Delhi. Under the guidance of experienced local chefs, you'll discover the secrets of authentic Indian cuisine. From selecting the perfect spices to mastering traditional cooking techniques, this hands-on experience offers a deep understanding of Indian flavors. You'll prepare a complete meal including appetizers, main courses, and desserts using fresh, locally sourced ingredients. At the end of the class, enjoy the meal you've prepared in a traditional setting. Take home recipe cards and a small spice kit to recreate these dishes in your own kitchen.",
    price: "₹2,500",
    duration: "3 hours",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1556911073-a517e752729c?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596797038530-2c107aa7ad9c?w=800&auto=format&fit=crop&q=80"
    ],
    location: "Delhi, India",
    host: {
      name: "Chef Priya Sharma",
      image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=800&auto=format&fit=crop&q=80",
      bio: "Professional chef with 15 years of experience in authentic North Indian cuisine. Trained at the Culinary Institute of India and has worked in several 5-star hotels."
    },
    categories: ["Cooking", "Cultural"],
    availableDates: ["Mon", "Wed", "Fri", "Sat"],
    includes: [
      "All cooking ingredients and equipment",
      "Recipe booklet to take home",
      "Small spice starter kit",
      "Full meal of what you cook",
      "Refreshments during the class"
    ],
    requirements: [
      "No prior cooking experience required",
      "Comfortable standing for 2-3 hours",
      "Please inform of any food allergies in advance"
    ]
  },
  {
    id: 2,
    title: "Yoga Retreat in Rishikesh",
    description: "Experience traditional yoga in the spiritual capital of India. Daily sessions by the Ganges River with certified yoga masters in a peaceful ashram setting.",
    longDescription: "Immerse yourself in a transformative yoga experience in Rishikesh, known as the Yoga Capital of the World. This retreat takes place at a serene ashram nestled on the banks of the sacred Ganges River. Led by certified yoga masters with decades of experience, you'll practice asanas, pranayama (breathing techniques), and meditation in the traditional Hatha and Ashtanga styles. The session begins with a spiritual ritual honoring the ancient yoga traditions, followed by physical postures and concludes with deep meditation. Suitable for all levels from beginners to advanced practitioners, this experience offers personalized guidance to enhance your practice. The peaceful natural surroundings and the spiritual atmosphere of Rishikesh make this an unforgettable journey toward physical wellness and inner peace.",
    price: "₹3,800",
    duration: "4 hours",
    rating: 5.0,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1532798442725-41036acc7489?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80"
    ],
    location: "Rishikesh, Uttarakhand",
    host: {
      name: "Guru Anand",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&auto=format&fit=crop&q=80",
      bio: "Certified yoga instructor with 20+ years of experience. Trained in traditional Hatha and Ashtanga yoga at prestigious institutes in Rishikesh."
    },
    categories: ["Wellness", "Spiritual"],
    availableDates: ["Daily"],
    includes: [
      "Yoga mat and props",
      "Herbal tea after session",
      "Certificate of participation",
      "Sacred Ganges ritual",
      "Meditation guidance"
    ],
    requirements: [
      "Suitable for all levels",
      "Wear comfortable clothing",
      "Bring a water bottle",
      "Come with an empty stomach (light meal 2 hours before)"
    ]
  },
  {
    id: 3,
    title: "Wildlife Safari in Ranthambore",
    description: "Explore the wilderness of Ranthambore National Park in an open jeep safari. Spot tigers, leopards, and diverse wildlife in their natural habitat.",
    longDescription: "Embark on an exhilarating wildlife adventure in Ranthambore National Park, one of India's most renowned tiger reserves. This guided safari takes you deep into the diverse ecosystems of the park in a comfortable open-top 4x4 jeep, offering unobstructed views of the spectacular landscape. Led by experienced naturalists with extensive knowledge of the local flora and fauna, you'll track the elusive Bengal tiger while learning about conservation efforts and the park's rich biodiversity. Beyond tigers, the park is home to leopards, sloth bears, various deer species, and over 270 bird species. The park's dramatic terrain, featuring ancient ruins, lakes, and forested hills, provides a stunning backdrop for wildlife photography. Each safari is unique, with wildlife sightings changing with the seasons, making this an unforgettable experience for nature enthusiasts and wildlife photographers alike.",
    price: "₹4,500",
    duration: "6 hours",
    rating: 4.8,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543039625-14cbd3802e7d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566208541738-35e657b6dca9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590170842594-1e0fdb2f6d66?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&auto=format&fit=crop&q=80"
    ],
    location: "Ranthambore, Rajasthan",
    host: {
      name: "Rajesh Singh",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80",
      bio: "Wildlife expert and conservationist with 12 years of experience in Ranthambore National Park. Passionate about tiger conservation and educating visitors about wildlife protection."
    },
    categories: ["Adventure", "Wildlife"],
    availableDates: ["Tue", "Thu", "Sat", "Sun"],
    includes: [
      "Open jeep safari",
      "Professional wildlife guide",
      "Park entry fees",
      "Binoculars for wildlife viewing",
      "Bottled water and light snacks"
    ],
    requirements: [
      "Early morning start (5:30 AM)",
      "Wear neutral colored clothing",
      "Bring sunscreen and hat",
      "Photography equipment welcome"
    ]
  },
  {
    id: 4,
    title: "Boat Tour of Varanasi Ghats",
    description: "Witness the spiritual rituals and breathtaking views of the ancient ghats of Varanasi from a traditional wooden boat on the sacred Ganges River.",
    longDescription: "Experience the spiritual heart of India with a mesmerizing boat tour along the sacred Ganges River in Varanasi, one of the world's oldest continuously inhabited cities. Aboard a traditional wooden boat, you'll glide along the shoreline at sunrise or sunset when the city is at its most enchanting. Witness the ancient rituals at the numerous ghats (stone steps) leading to the river, where pilgrims perform ceremonial bathing and prayers that have remained unchanged for centuries. Your knowledgeable local guide will share insights into the religious significance of the various ghats and rituals, the history of this 3,000-year-old city, and its importance in Hindu cosmology. The tour culminates with viewing the mesmerizing Ganga Aarti ceremony, where priests perform elaborate fire rituals with oil lamps, incense, and flowers, creating an unforgettable spectacle of light and spirituality.",
    price: "₹1,800",
    duration: "2 hours",
    rating: 4.7,
    reviews: 102,
    image: "https://images.unsplash.com/photo-1561731157-3a5764859d92?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590077242387-73cc2449c8fa?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1567416661873-45d83830749d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1627301516038-fcbafc355594?w=800&auto=format&fit=crop&q=80"
    ],
    location: "Varanasi, Uttar Pradesh",
    host: {
      name: "Arun Mishra",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800&auto=format&fit=crop&q=80",
      bio: "Lifelong resident of Varanasi with deep knowledge of the city's spiritual traditions. Has been guiding river tours for over 15 years, sharing the rich cultural heritage of the holy city."
    },
    categories: ["Cultural", "Spiritual"],
    availableDates: ["Daily"],
    includes: [
      "Private boat ride",
      "Local guide",
      "Flower offering ceremony",
      "Photography opportunities",
      "Refreshments on board"
    ],
    requirements: [
      "Modest dress recommended",
      "Comfortable walking shoes",
      "Early morning or evening departure"
    ]
  }
];

// Define the Experience type
interface Experience {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  location: string;
  host: {
    name: string;
    image: string;
    bio: string;
  };
  categories: string[];
  availableDates: string[];
  includes: string[];
  requirements: string[];
}

export default function ExperiencePage() {
  const router = useRouter();
  const params = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Find the experience by ID when the component mounts
  useEffect(() => {
    if (params.id) {
      // Parse the ID as a number
      const experienceId = parseInt(params.id.toString(), 10);
      const foundExperience = experiencesList.find(exp => exp.id === experienceId);
      
      if (foundExperience) {
        setExperience(foundExperience);
        // Set the first available date as selected by default
        if (foundExperience.availableDates && foundExperience.availableDates.length > 0) {
          setSelectedDate(foundExperience.availableDates[0]);
        }
      }
      setLoading(false);
    }
  }, [params.id]);

  // Handle booking
  const handleBooking = () => {
    if (!experience) return;
    alert(`Booking ${experience.title} for ${selectedDate} with ${guests} guests`);
    // In a real app, this would navigate to a checkout page or API call
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-cyan-500 border-cyan-100 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!experience) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Experience Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the experience you're looking for.</p>
        <Link 
          href="/experiences"
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg"
        >
          Browse All Experiences
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-cyan-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/experiences" className="hover:text-cyan-600">Experiences</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{experience.title}</span>
        </nav>
      </div>
      
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{experience.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
            <span className="font-medium">{experience.rating}</span>
            <span>({experience.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{experience.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <span>{experience.duration}</span>
          </div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image 
            src={activeImageIndex === 0 ? experience.image : experience.gallery[activeImageIndex - 1]} 
            alt={experience.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {experience.gallery.map((image, index) => (
            <div 
              key={index} 
              className="relative h-[190px] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setActiveImageIndex(index + 1)}
            >
              <Image 
                src={image} 
                alt={`${experience.title} view ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="eager"
                quality={80}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2">
          {/* Host Information */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image 
                src={experience.host.image} 
                alt={experience.host.name}
                fill
                className="object-cover"
                sizes="64px"
                loading="eager"
              />
            </div>
            <div>
              <h3 className="font-semibold">Hosted by {experience.host.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{experience.host.bio}</p>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {experience.longDescription}
            </p>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {experience.categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          {/* What's Included */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">What's Included</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experience.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 mt-0.5">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">What You Need to Know</h2>
            <ul className="space-y-3">
              {experience.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500 mt-0.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4M12 16h.01"></path>
                  </svg>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Booking Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-24">
          <div className="mb-4">
            <span className="block text-2xl font-bold text-cyan-600">{experience.price}</span>
            <span className="text-gray-600">per person</span>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Dates</label>
              <select 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              >
                {experience.availableDates.map((date, index) => (
                  <option key={index} value={date}>{date}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
              <div className="flex items-center">
                <button 
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <div className="px-4 py-2 border-t border-b border-gray-300 text-center min-w-[60px]">
                  {guests}
                </div>
                <button 
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="px-3 py-2 border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center border-t border-b py-4 mb-6">
            <span>Total</span>
            <span className="font-bold">₹{parseInt(experience.price.replace('₹', '').replace(',', '')) * guests}</span>
          </div>
          
          <button 
            onClick={handleBooking}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
          >
            Book Now
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>
        </div>
      </div>
    </div>
  );
} 