
import { useState } from "react";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "https://i.pravatar.cc/100?img=12",
    message: "liked your post.",
    time: "2 minutes ago",
    icon: "❤️",
    unread: true,
  },
  {
    id: 2,
    name: "Priya Verma",
    avatar: "https://i.pravatar.cc/100?img=47",
    message: "started following you.",
    time: "15 minutes ago",
    icon: "👤",
    unread: true,
  },
  {
    id: 3,
    name: "Aman Patel",
    avatar: "https://i.pravatar.cc/100?img=11",
    message: "commented: Great post! 🔥",
    time: "1 hour ago",
    icon: "💬",
    unread: true,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    avatar: "https://i.pravatar.cc/100?img=44",
    message: "mentioned you in a comment.",
    time: "3 hours ago",
    icon: "🔔",
    unread: false,
  },
  {
    id: 5,
    name: "CommunityHub",
    avatar: "https://i.pravatar.cc/100?img=68",
    message: "Welcome to your community! Explore and connect.",
    time: "Yesterday",
    icon: "🎉",
    unread: false,
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );
  const [filter, setFilter] = useState("all");

  const markAllRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const markRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = notifications.filter(
    (notification) =>
      filter === "all" ||
      (filter === "unread" && notification.unread)
  );

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with your community activity.</p>
        </div>

        <button
          className="mark-all-btn"
          onClick={markAllRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </div>

      <div className="notifications-card">
        <div className="notifications-toolbar">
          <div className="notification-filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "unread" ? "active" : ""}
              onClick={() => setFilter("unread")}
            >
              Unread
              {unreadCount > 0 && (
                <span className="notification-count">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          <button
            className="clear-notifications-btn"
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            Clear all
          </button>
        </div>

        <div className="notification-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${
                  notification.unread ? "unread" : ""
                }`}
                onClick={() => markRead(notification.id)}
              >
                <div className="notification-avatar-wrapper">
                  <img
                    src={notification.avatar}
                    alt={notification.name}
                    className="notification-avatar"
                  />
                  <span className="notification-type-icon">
                    {notification.icon}
                  </span>
                </div>

                <div className="notification-content">
                  <p>
                    <strong>{notification.name}</strong>{" "}
                    {notification.message}
                  </p>
                  <span className="notification-time">
                    {notification.time}
                  </span>
                </div>

                {notification.unread && (
                  <span
                    className="unread-dot"
                    title="Unread notification"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="notifications-empty">
              <span>🔔</span>
              <h3>No notifications</h3>
              <p>
                {filter === "unread"
                  ? "You're all caught up!"
                  : "Your notifications will appear here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
