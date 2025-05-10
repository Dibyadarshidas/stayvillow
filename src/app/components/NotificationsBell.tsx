import { useState } from "react";

const mockNotifications = [
  { id: 1, text: "Your booking for Pool Villa #1 is confirmed!", read: false },
  { id: 2, text: "You received a new review on your property.", read: false },
  { id: 3, text: "Booking #1234 is pending payment.", read: true }
];

export default function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  }

  return (
    <div className="relative">
      <button
        className="relative text-2xl p-2 hover:text-blue-600"
        onClick={() => setOpen(o => !o)}
        aria-label="Notifications"
      >
        <span>🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{unreadCount}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Notifications</span>
            <button className="text-xs text-blue-600 hover:underline" onClick={markAllRead}>Mark all as read</button>
          </div>
          <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="text-gray-400 text-sm">No notifications</li>
            ) : notifications.map(n => (
              <li key={n.id} className={`rounded px-2 py-1 ${n.read ? 'bg-gray-50 text-gray-500' : 'bg-blue-50 text-blue-700 font-medium'}`}>{n.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 