'use client';
import { useState } from "react";

const mockBookings = [
  { id: 1, property: "Luxury Pool Villa in Goa", guest: "Amit", dates: "12-15 June 2024", status: "confirmed" },
  { id: 2, property: "Hilltop Retreat in Lonavala", guest: "Priya", dates: "20-22 July 2024", status: "pending" },
  { id: 3, property: "Seaside Cottage in Alibaug", guest: "John", dates: "5-8 Aug 2024", status: "completed" }
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState(mockBookings);

  function cancel(id: number) {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "cancelled" } : b));
  }
  function complete(id: number) {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "completed" } : b));
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-serif font-bold mb-8 text-center tracking-tight">Manage Bookings</h1>
      <div className="glass-card p-0 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-primary)]/5 border-b aqua-border">
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Property</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Guest</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Dates</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Status</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="border-b aqua-border transition-all hover:bg-[var(--color-primary)]/5">
                <td className="p-4 font-medium">{b.property}</td>
                <td className="p-4 text-[var(--color-text-light)]">{b.guest}</td>
                <td className="p-4 text-[var(--color-text-light)]">{b.dates}</td>
                <td className="p-4">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${b.status === "confirmed" 
                        ? "bg-green-100 text-green-800" 
                        : b.status === "pending" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : b.status === "completed" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-red-100 text-red-800"
                      }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="btn btn-primary px-3 py-1 text-sm" aria-label="View Booking">View</button>
                  <button 
                    className="btn btn-secondary px-3 py-1 text-sm" 
                    onClick={() => cancel(b.id)} 
                    aria-label="Cancel Booking"
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary px-3 py-1 text-sm" 
                    onClick={() => complete(b.id)} 
                    aria-label="Mark as Complete"
                  >
                    Complete
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