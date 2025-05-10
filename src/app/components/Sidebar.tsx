'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

const Sidebar = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  console.log(user, "user");

  // Check if user has admin or host role - in a real app, these would come from the user object
  // For now, I'm using placeholder checks that you should replace with actual role checks
  const isAdmin = user?.role?.includes('admin'); // Replace with actual admin check
  const isHost = user?.role?.includes('host') ; // Replace with actual host check

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
    { href: "/host", label: "Become a Host", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ), highlight: true },
  ];

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

  return (
    <aside className="w-56 h-screen sidebar p-6 flex flex-col z-50">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gradient tracking-tight">Stayvillow</h1>
          <p className="text-xs text-[var(--color-text-light)] mt-1 font-medium">Luxury Vacation Stays</p>
        </div>
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
              sidebar.classList.remove('open');
            }
          }}
          aria-label="Close menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <nav className="flex-1 space-y-8">
        <div>
          <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-3">Guest</h2>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href + '-' + item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] aqua-shadow'
                      : 'text-[var(--color-text-light)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Only show host section if user is a host */}
        {isHost && (
          <div>
            <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-3">Host</h2>
            <ul className="space-y-1">
              {hostItems.map((item) => (
                <li key={item.href + '-' + item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                      pathname === item.href
                        ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] aqua-shadow'
                        : 'text-[var(--color-text-light)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]'
                    }`}
                  >
                    <span className="w-5 h-5">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Only show admin section if user is an admin */}
        {isAdmin && (
          <div>
            <h2 className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider px-3 mb-3">Admin</h2>
            <ul className="space-y-1">
              {adminItems.map((item) => (
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
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <div className="mt-auto pt-6 border-t aqua-border">
        {user ? (
          <div className="px-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium">{user.name.charAt(0)}</span>
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-[var(--color-text-light)] truncate">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={signOut}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-primary)]/5 text-[var(--color-text-light)]"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 15H3.6a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 3.6 0H6M10 11l4-4-4-4M13.8 7H4" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
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

export default Sidebar; 