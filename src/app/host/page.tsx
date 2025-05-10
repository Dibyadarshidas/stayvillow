'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const benefits = [
  {
    title: "Earn More",
    description: "Turn your property into a source of passive income. Our hosts earn up to ₹50,000 per month.",
    icon: "💰",
    stats: "42% higher earnings than traditional rentals"
  },
  {
    title: "Flexible Hosting",
    description: "Choose your own schedule and pricing. Host as much or as little as you want.",
    icon: "📅",
    stats: "100% control over your availability"
  },
  {
    title: "Professional Support",
    description: "24/7 support team to help you with everything from listing to guest management.",
    icon: "🤝",
    stats: "4.9/5 host satisfaction rating"
  },
  {
    title: "Property Enhancement",
    description: "Get expert guidance on how to improve your property and increase its value.",
    icon: "🏠",
    stats: "30% increase in property value"
  }
];

const features = [
  {
    title: "Smart Pricing",
    description: "Our AI-powered pricing tool helps you maximize your earnings by suggesting optimal rates based on demand, season, and local events.",
    icon: "📊"
  },
  {
    title: "Guest Screening",
    description: "Advanced verification system ensures you only host verified guests with positive reviews.",
    icon: "✅"
  },
  {
    title: "Property Management",
    description: "Easy-to-use dashboard to manage bookings, communicate with guests, and track your earnings.",
    icon: "📱"
  },
  {
    title: "Marketing Support",
    description: "Professional photography, SEO optimization, and social media promotion to increase your visibility.",
    icon: "📸"
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Goa",
    text: "Since listing my villa on Stayvillow, my monthly income has increased by 60%. The platform's support team has been incredible in helping me optimize my listing.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    earnings: "₹65,000/month"
  },
  {
    name: "Priya Sharma",
    location: "Manali",
    text: "The property enhancement suggestions from Stayvillow helped me transform my mountain cottage into a premium stay. Now I'm fully booked throughout the season!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
    earnings: "₹45,000/month"
  }
];

const techFeatures = [
  {
    title: "AI-Powered Analytics",
    description: "Get real-time insights and predictions about your property's performance using advanced machine learning algorithms.",
    icon: "🤖",
    tech: ["TensorFlow", "PyTorch", "Real-time Analytics"]
  },
  {
    title: "Smart Home Integration",
    description: "Control your property remotely with our IoT-enabled smart home system. Monitor and manage everything from your phone.",
    icon: "🏠",
    tech: ["IoT", "Smart Locks", "Energy Management"]
  },
  {
    title: "Blockchain Security",
    description: "Your transactions and property data are secured using enterprise-grade blockchain technology.",
    icon: "🔒",
    tech: ["Ethereum", "Smart Contracts", "Zero Trust"]
  },
  {
    title: "AR Property Tours",
    description: "Offer immersive virtual tours of your property using augmented reality technology.",
    icon: "👓",
    tech: ["AR", "3D Scanning", "Real-time Rendering"]
  }
];

const stats = [
  { value: "₹2.5Cr+", label: "Total Host Earnings", icon: "💰" },
  { value: "98%", label: "Host Satisfaction", icon: "⭐" },
  { value: "24/7", label: "AI Support", icon: "🤖" },
  { value: "50K+", label: "Active Properties", icon: "🏠" }
];

const cityOptions = [
  { label: 'Bhubaneswar', value: 'bhubaneswar', center: { lat: 20.2961, lng: 85.8245 } },
  { label: 'Goa', value: 'goa', center: { lat: 15.2993, lng: 74.124 } },
  { label: 'Manali', value: 'manali', center: { lat: 32.2432, lng: 77.1892 } },
];
const propertyTypes = ['Entire place', 'Private room', 'Shared room'];
const bedroomOptions = [1, 2, 3, 4];

const nightlyRates = {
  bhubaneswar: [2306, 2475, 2936, 4675, 2419, 3802, 1778, 2678, 3720],
  goa: [4500, 5200, 6100, 3900, 4800, 5300, 4200, 5700, 6000],
  manali: [3200, 3500, 4100, 2900, 3700, 4300, 3900, 4100, 4500],
};

function getAverageRate(city, bedrooms) {
  const base = nightlyRates[city] || [2000];
  // Increase rate for more bedrooms
  return Math.round((base.reduce((a, b) => a + b, 0) / base.length) * (1 + (bedrooms - 1) * 0.25));
}

// Dynamically import MapContainer and related components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function HostPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.1 });

  // Earnings calculator state
  const [city, setCity] = useState('bhubaneswar');
  const [propertyType, setPropertyType] = useState('Entire place');
  const [bedrooms, setBedrooms] = useState(2);
  const [nights, setNights] = useState(24);

  // Calculate earnings
  const avgRate = getAverageRate(city, bedrooms);
  const totalEarnings = nights * avgRate;

  // Map markers (simulate positions)
  const cityObj = cityOptions.find((c) => c.value === city);
  const mapMarkers = useMemo(() => (
    (nightlyRates[city as keyof typeof nightlyRates] || []).map((rate: number, i: number) => ({
      lat: cityObj ? cityObj.center.lat + 0.03 * Math.sin(i) : 0,
      lng: cityObj ? cityObj.center.lng + 0.03 * Math.cos(i) : 0,
      rate,
    }))
  ), [city, cityObj]);

  // Create custom DivIcons for each marker (client-only)
  const [markerIcons, setMarkerIcons] = useState<any[]>([]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const L = require('leaflet');
    setMarkerIcons(
      mapMarkers.map((marker) =>
        new L.DivIcon({
          className: 'custom-rate-icon',
          html: `<div style='background:white;padding:4px 12px;border-radius:999px;box-shadow:0 2px 8px #0001;font-weight:600;border:1px solid #eee;display:inline-block;min-width:48px;text-align:center;'>₹${marker.rate.toLocaleString()}</div>`
        })
      )
    );
  }, [mapMarkers]);

  const [floatingPositions, setFloatingPositions] = useState<{x: number, y: number}[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Only run on client
    if (typeof window !== 'undefined') {
      const positions = Array.from({ length: 5 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setFloatingPositions(positions);
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-background)]">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&auto=format&fit=crop&q=90"
            alt="Luxury villa"
            fill
            className="object-cover transform scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 border border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Join 2,500+ Successful Hosts
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Turn Your Property into a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Profitable Business
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl"
            >
              Join India&apos;s fastest-growing luxury vacation rental platform. We provide everything you need to succeed as a host.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="/host/list-property"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Start Hosting</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <button className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        {hasMounted && (
          <div className="absolute inset-0 pointer-events-none">
            {floatingPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-white/20 rounded-full"
                initial={{ x: pos.x, y: pos.y }}
                animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Earnings Calculator Section (moved below hero) */}
      <section className="w-full bg-white py-16 px-4 md:px-0 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="flex-1 max-w-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Your home could make <span className="text-[var(--color-primary)]">₹{totalEarnings.toLocaleString()}</span> on Stayvillow</h2>
          <div className="text-lg mb-2">
            <span className="font-medium underline">{nights} nights</span> · ₹{avgRate.toLocaleString()}/night
          </div>
          <div className="text-sm text-[var(--color-text-light)] mb-4">Estimate for selected city, property, and bedrooms.</div>
          <div className="mb-6">
            <input
              type="range"
              min={1}
              max={30}
              value={nights}
              onChange={e => setNights(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
            <div className="flex justify-between text-xs mt-1">
              <span>1 night</span>
              <span>30 nights</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <select value={city} onChange={e => setCity(e.target.value)} className="rounded-lg border px-3 py-2">
              {cityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="rounded-lg border px-3 py-2">
              {propertyTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select value={bedrooms} onChange={e => setBedrooms(Number(e.target.value))} className="rounded-lg border px-3 py-2">
              {bedroomOptions.map(opt => <option key={opt} value={opt}>{opt} bedroom{opt > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm bg-gray-50 rounded-full px-4 py-2 w-fit">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-primary)]"><circle cx="9" cy="9" r="8"/><path d="M9 5v4l3 2"/></svg>
            Learn how we estimate earnings
          </div>
        </div>
        <div className="flex-1 max-w-xl w-full h-[350px] relative rounded-3xl overflow-hidden shadow-xl bg-gray-100">
          {/* Leaflet Map */}
          {cityObj && (
            <MapContainer
              center={[cityObj.center.lat, cityObj.center.lng]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', zIndex: 1 }}
              dragging={true}
              doubleClickZoom={false}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markerIcons.length === mapMarkers.length && mapMarkers.map((marker, i) => (
                <Marker
                  key={i}
                  position={[marker.lat, marker.lng]}
                  icon={markerIcons[i]}
                >
                  <Popup>
                    ₹{marker.rate.toLocaleString()} per night
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow font-medium z-[2]">Explore rates near you</div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">{stat.value}</div>
                <div className="text-[var(--color-text-light)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with 3D Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Host with <span className="text-gradient">Stayvillow</span>
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto">
              We provide everything you need to succeed as a host, from property enhancement to guest management.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group p-6 rounded-2xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-xl transition-all duration-300 perspective-1000"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-[var(--color-text-light)] mb-4">{benefit.description}</p>
                <div className="text-sm font-medium text-[var(--color-primary)]">
                  {benefit.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Features Section */}
      <section className="py-20 bg-[var(--color-background)]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by <span className="text-gradient">Cutting-Edge Tech</span>
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto">
              Experience the future of property management with our advanced technology stack.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--color-text-light)] mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories from Our <span className="text-gradient">Hosts</span>
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto">
              Hear from our successful hosts who have transformed their properties into thriving businesses.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group p-8 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-[var(--color-text-light)]">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-[var(--color-text)] mb-6">{testimonial.text}</p>
                <div className="text-lg font-bold text-[var(--color-primary)]">
                  {testimonial.earnings}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/50 to-blue-600/50"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Hosting Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful hosts who are earning more with Stayvillow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/host/list-property"
              className="group px-8 py-4 bg-white text-[var(--color-primary)] rounded-xl font-medium hover:bg-white/90 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">List Your Property</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10">Schedule a Call</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 