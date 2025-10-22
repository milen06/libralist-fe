"use client";

import { useState } from "react";

export default function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Book Added", time: "5 minutes ago", read: false },
    { id: 2, title: "New Book Added", time: "1 hour ago", read: false },
    { id: 3, title: "New Book Added", time: "8 hours ago", read: false },
  ]);

  const markAllRead = () =>
    setNotifications((n) => n.map((item) => ({ ...item, read: true })));

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="btn-notification relative">
        <i className="far fa-bell dark:text-lightMode"></i>
        {notifications.some((n) => !n.read) && (
          <span className="notification-count">
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 bg-lightMode dark:bg-textColor w-72 rounded shadow-lg z-50">
          <li className="flex items-center justify-between px-4 py-3 border-b border-textColor/10 dark:border-lightMode/10">
            <span className="font-urbanistBold dark:text-lightMode">Notifications</span>
            <button onClick={markAllRead}>
              <i className="far fa-envelope-open text-textColor/80 dark:text-lightMode hover:text-mainColor duration-300"></i>
            </button>
          </li>
          {notifications.map((n) => (
            <li
              key={n.id}
              className="px-4 py-2 hover:bg-[#eee] dark:hover:bg-lightMode/10 flex justify-between"
            >
              <div>
                <h5 className="text-sm font-semibold dark:text-lightMode">{n.title}</h5>
                <p className="text-xs text-textColor/80 dark:text-lightMode/60">{n.time}</p>
              </div>
              {!n.read && <span className="w-2 h-2 bg-mainColor rounded-full mt-2"></span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
