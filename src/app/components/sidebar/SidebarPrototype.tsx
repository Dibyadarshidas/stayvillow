'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useAuth } from '../AuthProvider';
import { useState } from 'react';

const SidebarPrototype = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [themeMode, setThemeMode] = useState('light');
  
  // Placeholder data - would come from API in production
  const profileData = {
    completionPercentage: 75,
    verifiedItems: {
      email: true,
      phone: true,
      id: false
    }
  };
  
  const rewardsData = {
    tier: 'Gold',
    points: 750,
    nextTierThreshold: 1000,
    specialOffers: 3
  };
  
  const messageData = {
    unreadCount: 2,
    supportTickets: 1
  };
  
  const recentlyViewed = [
    { id: 1, name: 'Beachfront Villa', location: 'Malibu, CA' },
    { id: 2, name: 'Mountain Cabin', location: 'Aspen, CO' }
  ];
  
  // Role checks
  const isAdmin = user?.email?.includes('admin');
  const isHost = user?.email?.includes('host') || isAdmin;

  // Main navigation items
  const navItems = [
    { href: "/", label: "Home", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg>
    ) },
    { href: "/search", label: "Search", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    ) },
    { href: "/bookings", label: "Bookings", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>
    ) },
    { href: "/favorites", label: "Favorites", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
    ) },
  ];

  // Quick Navigation items - Recently Viewed & Saved Searches
  const quickNavItems = [
    { href: "/recently-viewed", label: "Recently Viewed", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
    ) },
    { href: "/saved-searches", label: "Saved Searches", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/><path d="M21 18l-6-6"/><path d="M9 9h4"/><path d="M11 7v4"/></svg>
    ) },
  ];

  // Host items
  const hostItems = [
    { href: "/host/dashboard", label: "Host Dashboard", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ) },
    { href: "/host/properties", label: "My Properties", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ) },
    { href: "/host/list-property", label: "List Property", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    ) },
  ];

  // Admin items
  const adminItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    ) },
    { href: "/admin/users", label: "Users", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    ) },
    { href: "/admin/properties", label: "Properties", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    ) },
    { href: "/admin/bookings", label: "Bookings", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    ) },
  ];

  // Messaging Center items
  const messagingItems = [
    { href: "/messages/inbox", label: "Inbox", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    ), badge: messageData.unreadCount },
    { href: "/messages/support", label: "Support", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    ), badge: messageData.supportTickets }
  ];

  // Travel Planning items
  const planningItems = [
    { href: "/planning/itineraries", label: "Itineraries", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    ) },
    { href: "/planning/checklist", label: "Trip Checklist", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
    ) },
    { href: "/planning/calendar", label: "Travel Calendar", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    ) }
  ];

  // Help & Resources items
  const helpItems = [
    { href: "/help/faqs", label: "FAQs", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    ) },
    { href: "/help/guides", label: "Travel Guides", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    ) },
    { href: "/help/contact", label: "Contact Support", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    ) }
  ];

  // Toggle theme mode
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    // In a real implementation, this would update the global theme
  };

  // Function to render navigation items
  const renderNavItems = (items: { href: string; label: string; icon: React.ReactNode; badge?: number }[]) => {
    return items.map((item) => (
      <li key={item.href + '-' + item.label}>
        <Link
          href={item.href}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
            pathname === item.href || pathname.startsWith(item.href + '/')
              ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] aqua-shadow'
              : 'text-[var(--color-text-light)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]'
          }`}
        >
          <span className="w-5 h-5">{item.icon}</span>
          <span>{item.label}</span>
          {typeof item.badge === 'number' && item.badge > 0 && (
            <span className="ml-auto bg-[var(--color-primary)] text-white text-xs min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
              {item.badge}
            </span>
          )}
        </Link>
      </li>
    ));
  };

  return (
    <aside className="w-64 h-screen sidebar p-6 flex flex-col z-50 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gradient tracking-tight">Stayvillow</h1>
        <p className="text-xs text-[var(--color-text-light)] mt-1 font-medium">Luxury Vacation Stays</p>
      </div>
      
      {/* User Profile Section */}
      {user && (
        <div className="mb-6 p-3 rounded-lg border aqua-border bg-[var(--color-primary)]/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-medium">{user.name.charAt(0)}</span>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-[var(--color-text-light)] truncate">{user.email}</p>
            </div>
          </div>
          
          {/* Profile Completion Progress */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--color-text-light)]">Profile Completion</span>
              <span className="text-xs font-medium">{profileData.completionPercentage}%</span>
            </div>
            <div className="h-1 w-full bg-[var(--color-primary)]/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--color-primary)] rounded-full" 
                style={{ width: `${profileData.completionPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Verification Status */}
          <div className="flex gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded-full ${profileData.verifiedItems.email ? 'bg-green-500/10 text-green-500' : 'bg-gray-200 text-gray-500'}`}>
              {profileData.verifiedItems.email ? '✓ Email' : '○ Email'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${profileData.verifiedItems.phone ? 'bg-green-500/10 text-green-500' : 'bg-gray-200 text-gray-500'}`}>
              {profileData.verifiedItems.phone ? '✓ Phone' : '○ Phone'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${profileData.verifiedItems.id ? 'bg-green-500/10 text-green-500' : 'bg-gray-200 text-gray-500'}`}>
              {profileData.verifiedItems.id ? '✓ ID' : '○ ID'}
            </span>
          </div>
          
          {/* Profile Links */}
          <div className="grid grid-cols-2 gap-2">
            <Link href="/profile" className="text-xs px-2 py-1.5 bg-white border border-gray-200 rounded-md text-center hover:bg-gray-50">
              View Profile
            </Link>
            <Link href="/profile/settings" className="text-xs px-2 py-1.5 bg-white border border-gray-200 rounded-md text-center hover:bg-gray-50">
              Settings
            </Link>
          </div>
        </div>
      )}
      
      <nav className="flex-1 space-y-6">
        {/* Main Navigation */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-2">Main Navigation</h2>
          <ul className="space-y-1">
            {renderNavItems(navItems)}
          </ul>
        </div>
        
        {/* Quick Navigation */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-2">Quick Access</h2>
          <ul className="space-y-1">
            {renderNavItems(quickNavItems)}
          </ul>
          
          {/* Recently Viewed Properties */}
          {recentlyViewed.length > 0 && (
            <div className="mt-2 pl-8">
              <h3 className="text-xs text-[var(--color-text-light)] mb-1">Recently Viewed</h3>
              <ul className="space-y-1">
                {recentlyViewed.map(property => (
                  <li key={property.id} className="text-xs">
                    <Link href={`/property/${property.id}`} className="hover:text-[var(--color-primary)] transition-colors">
                      {property.name} - {property.location}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Messaging Center */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-2">
            Messages
            {(messageData.unreadCount + messageData.supportTickets) > 0 && (
              <span className="ml-1 bg-[var(--color-primary)] text-white text-xs rounded-full px-1.5 py-0.5">
                {messageData.unreadCount + messageData.supportTickets}
              </span>
            )}
          </h2>
          <ul className="space-y-1">
            {renderNavItems(messagingItems)}
          </ul>
        </div>
        
        {/* Only show host section if user is a host */}
        {isHost && (
          <div>
            <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-2">Host</h2>
            <ul className="space-y-1">
              {renderNavItems(hostItems)}
            </ul>
          </div>
        )}

        {/* Only show admin section if user is an admin */}
        {isAdmin && (
          <div>
            <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-2">Admin</h2>
            <ul className="space-y-1">
              {renderNavItems(adminItems)}
            </ul>
          </div>
        )}
        
        {/* Travel Planning */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-2">Travel Planning</h2>
          <ul className="space-y-1">
            {renderNavItems(planningItems)}
          </ul>
        </div>
        
        {/* Rewards Program */}
        {user && (
          <div className="p-3 rounded-lg border aqua-border bg-[var(--color-primary)]/5">
            <h2 className="text-xs font-semibold uppercase mb-2">Rewards Program</h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-xs text-white font-semibold">{rewardsData.tier.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{rewardsData.tier} Member</p>
                <p className="text-xs text-[var(--color-text-light)]">{rewardsData.points} points</p>
              </div>
            </div>
            
            {/* Points Progress */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[var(--color-text-light)]">Next Tier</span>
                <span className="text-xs font-medium">{rewardsData.points}/{rewardsData.nextTierThreshold}</span>
              </div>
              <div className="h-1 w-full bg-[var(--color-primary)]/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" 
                  style={{ width: `${(rewardsData.points / rewardsData.nextTierThreshold) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <Link href="/rewards/offers" className="w-full text-xs py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-md text-amber-700 flex items-center justify-center gap-1 hover:opacity-90">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12V8H4v4M4 16v-4M20 16v-4M1 20h22M12 8V4M8 4h8"/>
              </svg>
              <span>{rewardsData.specialOffers} Special Offers</span>
            </Link>
          </div>
        )}
        
        {/* Travel Tools */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-2">Travel Tools</h2>
          
          <div className="mt-2 p-3 rounded-lg border aqua-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium">Currency</span>
              <select className="text-xs p-1 border rounded">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Weather</span>
              <Link href="/weather" className="text-xs text-[var(--color-primary)]">Check Destination</Link>
            </div>
          </div>
        </div>
        
        {/* Help & Resources */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-2">Help & Resources</h2>
          <ul className="space-y-1">
            {renderNavItems(helpItems)}
          </ul>
        </div>
      </nav>

      {/* Settings and Sign Out */}
      <div className="mt-auto pt-6 border-t aqua-border">
        <div className="flex justify-between items-center mb-3 px-3">
          <span className="text-xs font-medium">Theme</span>
          <button 
            onClick={toggleTheme}
            className="w-10 h-5 bg-gray-200 rounded-full relative flex items-center transition duration-200 focus:outline-none"
          >
            <span 
              className={`w-4 h-4 rounded-full bg-white absolute transition-all duration-300 shadow-sm ${
                themeMode === 'dark' ? 'translate-x-5' : 'translate-x-1'
              }`} 
            />
            <span className={`absolute text-[8px] ${themeMode === 'dark' ? 'right-1.5' : 'left-1.5'}`}>
              {themeMode === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>
        </div>
        
        {user ? (
          <button 
            onClick={signOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-primary)]/5 text-[var(--color-text-light)]"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 15H3.6a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 3.6 0H6M10 11l4-4-4-4M13.8 7H4" />
            </svg>
            <span>Sign Out</span>
          </button>
        ) : (
          <div className="px-3">
            <Link 
              href="/signin"
              className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium transition-all hover:bg-[var(--color-primary-dark)]"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 9l4-4-4-4M17 5H9m0 8l-4 4 4 4M5 13h8" />
              </svg>
              <span>Sign In</span>
            </Link>
            <p className="text-[10px] text-[var(--color-text-light)]/70 mt-4 text-center">© 2025 Stayvillow</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarPrototype; 