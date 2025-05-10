export default function ListPage() {
  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">List Your Property</h1>
      <form className="card flex flex-col gap-6">
        <input type="text" placeholder="Property Name" required />
        <input type="text" placeholder="Location" required />
        <textarea placeholder="Description" rows={4} className="resize-none" required />
        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload Images</label>
          <input type="file" multiple disabled className="opacity-60 cursor-not-allowed" />
          <span className="text-xs text-gray-400">(Image upload coming soon)</span>
        </div>
        <button className="btn bg-blue-600 hover:bg-blue-700 text-lg">Submit Property</button>
      </form>
    </div>
  );
} 