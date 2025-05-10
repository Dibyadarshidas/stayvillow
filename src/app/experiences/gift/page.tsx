'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample experiences for gifting
const giftableExperiences = [
  {
    id: 1,
    title: "Cooking Class in Delhi",
    price: "₹2,500",
    image: "https://images.unsplash.com/photo-1556911073-a517e752729c?w=800&auto=format&fit=crop&q=80",
    location: "Delhi, India",
    category: "Cooking"
  },
  {
    id: 2,
    title: "Yoga Retreat in Rishikesh",
    price: "₹3,800",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=80",
    location: "Rishikesh, Uttarakhand",
    category: "Wellness"
  },
  {
    id: 3,
    title: "Wildlife Safari in Ranthambore",
    price: "₹4,500",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    location: "Ranthambore, Rajasthan",
    category: "Adventure"
  },
  {
    id: 4,
    title: "Boat Tour of Varanasi Ghats",
    price: "₹1,800",
    image: "https://images.unsplash.com/photo-1561731157-3a5764859d92?w=800&auto=format&fit=crop&q=80",
    location: "Varanasi, Uttar Pradesh",
    category: "Cultural"
  }
];

export default function GiftExperiencePage() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Gift experience request submitted! This would typically process payment and send an email to the recipient.');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-cyan-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/experiences" className="hover:text-cyan-600">Experiences</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Gift an Experience</span>
        </nav>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Gift an Unforgettable Experience</h1>
      <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
        Share the joy of exploration and discovery with your loved ones. Our gift experiences are perfect for birthdays, anniversaries, or just to show someone you care.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Gift Form */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Gift Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Select an Experience</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {giftableExperiences.map((exp) => (
                  <div 
                    key={exp.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedExperience?.id === exp.id 
                        ? 'border-cyan-600 bg-cyan-50' 
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                    onClick={() => setSelectedExperience(exp)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <Image 
                          src={exp.image} 
                          alt={exp.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{exp.title}</h3>
                        <p className="text-cyan-600 text-xs font-semibold">{exp.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <Link href="/experiences" className="text-sm text-cyan-600 hover:underline">
                  Browse more experiences →
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Recipient's Name</label>
                <input 
                  type="text" 
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Recipient's Email</label>
                <input 
                  type="email" 
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input 
                type="text" 
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Personal Message (Optional)</label>
              <textarea 
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Add a personal message to your gift..."
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Delivery Date</label>
              <input 
                type="date" 
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll email the gift voucher on this date
              </p>
            </div>
            
            <button 
              type="submit"
              disabled={!selectedExperience}
              className={`w-full py-3 rounded-lg font-medium ${
                selectedExperience 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedExperience ? 'Continue to Payment' : 'Select an Experience'}
            </button>
          </form>
        </div>
        
        {/* Gift Information */}
        <div>
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 md:p-8 rounded-xl border border-cyan-100 mb-8">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-cyan-100 text-cyan-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h3 className="font-medium">Select an Experience</h3>
                  <p className="text-gray-600 text-sm">Choose from our curated collection of experiences across India</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-cyan-100 text-cyan-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h3 className="font-medium">Personalize Your Gift</h3>
                  <p className="text-gray-600 text-sm">Add a personal message and select when to deliver the gift voucher</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-cyan-100 text-cyan-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h3 className="font-medium">We'll Deliver the Gift</h3>
                  <p className="text-gray-600 text-sm">We'll email a beautiful digital voucher to the recipient on your chosen date</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-cyan-100 text-cyan-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                <div>
                  <h3 className="font-medium">They Book When Ready</h3>
                  <p className="text-gray-600 text-sm">The recipient can redeem their gift and book the experience at their convenience</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Gift FAQs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">How long is the gift voucher valid?</h3>
                <p className="text-gray-600 text-sm">Gift vouchers are valid for 12 months from the date of purchase.</p>
              </div>
              <div>
                <h3 className="font-medium">Can the recipient change the experience?</h3>
                <p className="text-gray-600 text-sm">Yes, recipients can exchange their voucher for another experience of equal or lesser value. If they choose a more expensive experience, they can pay the difference.</p>
              </div>
              <div>
                <h3 className="font-medium">What if the experience is unavailable?</h3>
                <p className="text-gray-600 text-sm">In the rare event that an experience becomes unavailable, we'll offer a suitable alternative or a full refund.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I get a physical gift card?</h3>
                <p className="text-gray-600 text-sm">We currently only offer digital gift vouchers, which are more environmentally friendly and can be delivered instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Gift Experiences */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Popular Gift Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftableExperiences.map((exp) => (
            <div key={exp.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100">
              <div className="relative h-48">
                <Image 
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {exp.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{exp.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{exp.location}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-600">{exp.price}</span>
                  <button 
                    onClick={() => setSelectedExperience(exp)}
                    className="text-sm font-medium text-cyan-700 hover:underline"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 