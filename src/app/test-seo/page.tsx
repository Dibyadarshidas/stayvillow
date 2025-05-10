'use client';
import { useState } from 'react';
import SEO from '@/app/components/SEO';
import Link from 'next/link';

export default function TestSEOPage() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <SEO 
        title="SEO Test Page"
        description="A simple test page to verify that our SEO component works correctly"
        keywords={['test', 'seo', 'next.js']}
      />
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">SEO Test Page</h1>
        <p className="mb-4">This page tests that our SEO component works correctly with the App Router.</p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p>If you inspect the page source, you should see proper metadata tags in the head section.</p>
        </div>
        
        <div className="mb-6">
          <p className="mb-2">Counter: {count}</p>
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Increment
          </button>
        </div>
        
        <Link href="/" className="text-blue-500 hover:underline">
          Go back home
        </Link>
      </div>
    </>
  );
} 