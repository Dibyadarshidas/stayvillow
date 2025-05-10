'use client';
import { useState } from "react";

const mockProperties = [
  { id: 1, title: "Luxury Pool Villa in Goa", host: "Amit", status: "pending" },
  { id: 2, title: "Hilltop Retreat in Lonavala", host: "Priya", status: "approved" },
  { id: 3, title: "Seaside Cottage in Alibaug", host: "John", status: "rejected" }
];

export default function AdminProperties() {
  const [properties, setProperties] = useState(mockProperties);

  function approve(id: number) {
    setProperties(properties.map(p => p.id === id ? { ...p, status: "approved" } : p));
  }
  function reject(id: number) {
    setProperties(properties.map(p => p.id === id ? { ...p, status: "rejected" } : p));
  }
  function deleteProperty(id: number) {
    setProperties(properties.filter(p => p.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-serif font-bold mb-8 text-center tracking-tight">Manage Properties</h1>
      <div className="glass-card p-0 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-primary)]/5 border-b aqua-border">
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Title</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Host</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Status</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p.id} className="border-b aqua-border transition-all hover:bg-[var(--color-primary)]/5">
                <td className="p-4 font-medium">{p.title}</td>
                <td className="p-4 text-[var(--color-text-light)]">{p.host}</td>
                <td className="p-4">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${p.status === "approved" 
                        ? "bg-green-100 text-green-800" 
                        : p.status === "pending" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="btn btn-primary px-3 py-1 text-sm" aria-label="View Property">View</button>
                  <button 
                    className="btn btn-primary px-3 py-1 text-sm" 
                    onClick={() => approve(p.id)} 
                    aria-label="Approve Property"
                  >
                    Approve
                  </button>
                  <button 
                    className="btn btn-secondary px-3 py-1 text-sm" 
                    onClick={() => reject(p.id)} 
                    aria-label="Reject Property"
                  >
                    Reject
                  </button>
                  <button 
                    className="px-3 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all" 
                    onClick={() => deleteProperty(p.id)} 
                    aria-label="Delete Property"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 