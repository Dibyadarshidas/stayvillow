import Image from "next/image";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Explore Stays</h1>
      <div className="flex gap-4 mb-8 justify-center">
        <input className="min-w-[200px] p-2 rounded border" type="text" placeholder="Search by location or villa" />
        <select className="p-2 rounded border">
          <option>All Destinations</option>
          <option>Goa</option>
          <option>Lonavala</option>
          <option>Alibaug</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Search</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1,2,3,4,5,6].map((id) => (
          <div key={id} className="flex flex-col shadow-lg rounded-xl overflow-hidden">
            <div className="relative h-52 w-full">
              <Image 
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" 
                alt="Stay" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="font-semibold text-lg mb-2">Pool Villa #{id}</div>
              <div className="text-gray-500 mb-4">Goa, India</div>
              <Link href={`/property/${id}`} className="block w-full text-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 