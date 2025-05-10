'use client';
import { useState } from "react";

const bookings = [
  {
    id: 1,
    title: "Kantiang View Resort",
    location: "Krabi, Thailand",
    dates: "12-15 June 2024",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Ocean front villa with private pool",
    location: "Koa Lanta Yai",
    dates: "20-22 July 2024",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  }
];

const favorites = [
  {
    id: 3,
    title: "Petra - Gloryio Hillside Villa",
    location: "Krabi, Thailand",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Sunset Beach House",
    location: "Phuket, Thailand",
    image: "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80"
  }
];

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full">
      <div className="glass-card">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 