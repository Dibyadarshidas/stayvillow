'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Luxury Pool Villa',
      location: 'Goa, India',
      price: 12000,
      rating: 4.9,
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      title: 'Mountain View Cabin',
      location: 'Manali, Himachal Pradesh',
      price: 8500,
      rating: 4.6,
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60',
    },
    {
      id: 3,
      title: 'Hilltop Retreat',
      location: 'Lonavala, Maharashtra',
      price: 9000,
      rating: 4.7,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60',
    },
    {
      id: 4,
      title: 'Beachfront Cottage',
      location: 'Kovalam, Kerala',
      price: 10500,
      rating: 4.8,
      reviews: 32,
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=60',
    },
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <div className="w-full">
      <div className="glass-card mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Saved Properties</h1>
          <p className="text-[var(--color-text-light)]">{favorites.length} properties saved</p>
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💭</div>
            <h3 className="text-xl font-semibold mb-2">No saved properties yet</h3>
            <p className="text-[var(--color-text-light)] mb-6">Properties you save will appear here</p>
            <Link href="/search" className="btn btn-primary">
              Explore properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-[var(--color-border)]">
                <div className="relative h-48 w-full">
                  <Image
                    src={favorite.image}
                    alt={favorite.title}
                    fill
                    className="object-cover"
                  />
                  <button 
                    onClick={() => removeFavorite(favorite.id)}
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm"
                    aria-label="Remove from favorites"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 truncate">{favorite.title}</h3>
                  <p className="text-[var(--color-text-light)] text-sm mb-2">{favorite.location}</p>
                  <div className="flex items-center text-sm mb-3">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{favorite.rating}</span>
                    <span className="text-[var(--color-text-light)] ml-1">({favorite.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[var(--color-primary)] font-bold">₹{favorite.price.toLocaleString()}<span className="text-xs font-normal text-[var(--color-text-light)]">/night</span></p>
                    <Link href={`/property/${favorite.id}`} className="btn btn-secondary text-sm px-3 py-1.5">
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 