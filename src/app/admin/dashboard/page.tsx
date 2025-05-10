import Link from "next/link";

const mockStats = {
  users: 128,
  properties: 34,
  bookings: 210
};

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center tracking-tight">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        <div className="glass-card flex flex-col items-center py-8 hover-lift transition-all duration-300">
          <span className="text-4xl font-bold text-[var(--color-primary)]">{mockStats.users}</span>
          <span className="text-[var(--color-text-light)] font-medium">Users</span>
        </div>
        <div className="glass-card flex flex-col items-center py-8 hover-lift transition-all duration-300">
          <span className="text-4xl font-bold text-[var(--color-primary)]">{mockStats.properties}</span>
          <span className="text-[var(--color-text-light)] font-medium">Properties</span>
        </div>
        <div className="glass-card flex flex-col items-center py-8 hover-lift transition-all duration-300">
          <span className="text-4xl font-bold text-[var(--color-primary)]">{mockStats.bookings}</span>
          <span className="text-[var(--color-text-light)] font-medium">Bookings</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link href="/admin/users" className="btn btn-primary">
          Manage Users
        </Link>
        <Link href="/admin/properties" className="btn btn-primary">
          Manage Properties
        </Link>
        <Link href="/admin/bookings" className="btn btn-primary">
          Manage Bookings
        </Link>
      </div>
    </div>
  );
} 