'use client';
import { useState } from "react";

const mockUsers = [
  { id: 1, name: "Amit", email: "amit@email.com", status: "active" },
  { id: 2, name: "Priya", email: "priya@email.com", status: "blocked" },
  { id: 3, name: "John", email: "john@email.com", status: "active" }
];

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);

  function toggleBlock(id: number) {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u));
  }
  function deleteUser(id: number) {
    setUsers(users.filter(u => u.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-serif font-bold mb-8 text-center tracking-tight">Manage Users</h1>
      <div className="glass-card p-0 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-primary)]/5 border-b aqua-border">
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Name</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Email</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Status</th>
              <th className="p-4 text-left font-semibold text-[var(--color-text)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b aqua-border transition-all hover:bg-[var(--color-primary)]/5">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4 text-[var(--color-text-light)]">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="btn btn-primary px-3 py-1 text-sm" aria-label="View User">View</button>
                  <button 
                    className={`btn px-3 py-1 text-sm ${u.status === "active" ? "btn-secondary" : "btn-primary"}`} 
                    onClick={() => toggleBlock(u.id)} 
                    aria-label={u.status === "active" ? "Block User" : "Unblock User"}
                  >
                    {u.status === "active" ? "Block" : "Unblock"}
                  </button>
                  <button 
                    className="px-3 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all" 
                    onClick={() => deleteUser(u.id)} 
                    aria-label="Delete User"
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