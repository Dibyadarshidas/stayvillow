'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <Link href="/signin" className="btn btn-primary text-sm px-4 py-2">
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-medium">{user.name.charAt(0)}</span>
          )}
        </div>
        <span className="text-sm font-medium hidden sm:block">{user.name}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-lg bg-white z-50 glass-card"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-2">
            <div className="px-3 py-2 border-b aqua-border">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-[var(--color-text-light)]">{user.email}</p>
            </div>
            <ul className="mt-2">
              <li>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-primary)]/5"
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.75 4.75a4 4 0 1 1-8 0 4 4 0 0 1 8 0m-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                  </svg>
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/dashboard" 
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-primary)]/5"
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="4" height="4" />
                    <rect x="9" y="3" width="4" height="4" />
                    <rect x="9" y="9" width="4" height="4" />
                    <rect x="3" y="9" width="4" height="4" />
                  </svg>
                  <span>Admin Dashboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/settings" 
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-primary)]/5"
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7.77 13.36a5.72 5.72 0 0 1-7.13-7.13c1.74-1.74 4.54-1.74 6.28 0a4.4 4.4 0 0 0 6.22 6.22c1.74 1.74 1.74 4.54 0 6.28a5.72 5.72 0 0 1-7.13-7.13" />
                  </svg>
                  <span>Settings</span>
                </Link>
              </li>
              <li className="border-t aqua-border mt-2 pt-2">
                <button 
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-primary)]/5 w-full text-left text-red-600"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 15H3.6a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 3.6 0H6M10 11l4-4-4-4M13.8 7H4" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 