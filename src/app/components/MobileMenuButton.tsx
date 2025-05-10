'use client';

import { useState, useEffect } from 'react';

export default function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
      setIsOpen(!isOpen);
    }
  };
  
  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
          setIsOpen(false);
        }
      }
    };
    
    // Close menu when overlay is clicked
    const handleOverlayClick = () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    const overlay = document.querySelector('.menu-overlay');
    if (overlay) {
      overlay.addEventListener('click', handleOverlayClick);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (overlay) {
        overlay.removeEventListener('click', handleOverlayClick);
      }
    };
  }, []);
  
  return (
    <button 
      className="mobile-menu-button lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md border border-cyan-100 p-2 rounded-lg hover:bg-gray-50 transition-colors" 
      onClick={toggleMenu}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      ) : (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      )}
    </button>
  );
} 