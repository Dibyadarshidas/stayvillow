import Image from "next/image";

export default function BuyPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Buy a Vacation Property</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1,2,3].map((id) => (
          <div key={id} className="card flex flex-col items-center">
            <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Property" width={320} height={200} className="rounded-xl mb-4" />
            <div className="font-semibold text-lg mb-2">Luxury Villa #{id}</div>
            <div className="text-gray-500 mb-4">Goa, India</div>
            <button className="btn bg-blue-600 hover:bg-blue-700 w-full">View Details</button>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="btn bg-green-600 hover:bg-green-700 text-lg px-10 py-3">List Your Property</button>
      </div>
    </div>
  );
} 