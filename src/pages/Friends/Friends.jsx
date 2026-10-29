
import React, { useEffect, useState } from "react";
import "./Friends.css";

const FRIENDS_KEY = "communityHubFriends";
const REQUESTS_KEY = "communityHubFriendRequests";

const initialFriends = [
  {
    id: 1,
    name: "Aarav Sharma",
    username: "@aaravsharma",
    role: "Frontend Developer",
    initials: "AS",
    color: "purple",
    online: true,
  },
  {
    id: 2,
    name: "Priya Verma",
    username: "@priyaverma",
    role: "UI/UX Designer",
    initials: "PV",
    color: "pink",
    online: true,
  },
  {
    id: 3,
    name: "Rahul Patil",
    username: "@rahulpatil",
    role: "Software Engineer",
    initials: "RP",
    color: "blue",
    online: false,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    username: "@snehagupta",
    role: "Content Creator",
    initials: "SG",
    color: "orange",
    online: true,
  },
  {
    id: 5,
    name: "Aditya Singh",
    username: "@adityasingh",
    role: "Full Stack Developer",
    initials: "AS",
    color: "green",
    online: false,
  },
  {
    id: 6,
    name: "Ananya Joshi",
    username: "@ananyajoshi",
    role: "Digital Marketer",
    initials: "AJ",
    color: "cyan",
    online: true,
  },
];

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function MyFriends() {
  const [friends, setFriends] = useState(() =>
    readStorage(FRIENDS_KEY, initialFriends)
  );

  const [requests, setRequests] = useState(() =>
    readStorage(REQUESTS_KEY, [])
  );

  const [activeTab, setActiveTab] = useState("Friends");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  }, [requests]);

  const filteredFriends = friends.filter((friend) =>
    `${friend.name} ${friend.username} ${friend.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const acceptRequest = (request) => {
    setFriends((current) => {
      if (current.some((friend) => friend.id === request.id)) {
        return current;
      }

      return [
        ...current,
        {
          ...request,
          online: false,
        },
      ];
    });

    setRequests((current) =>
      current.filter((item) => item.id !== request.id)
    );

    setNotice(`${request.name} added to your friends.`);
  };

  const declineRequest = (id) => {
    setRequests((current) =>
      current.filter((request) => request.id !== id)
    );
    setNotice("Friend request declined.");
  };

  const removeFriend = (friend) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${friend.name} from your friends?`
    );

    if (!confirmed) return;

    setFriends((current) =>
      current.filter((item) => item.id !== friend.id)
    );
    setNotice(`${friend.name} removed from your friends.`);
  };

  const sendMessage = (friend) => {
    setNotice(`Messaging for ${friend.name} can be connected to your Messages module.`);
  };

  return (
    <main className="my-friends-page">
      <header className="my-friends-header">
        <div>
          <span className="my-friends-eyebrow">YOUR COMMUNITY</span>
          <h1>My Friends</h1>
          <p>Connect with people, grow your network and stay in touch.</p>
        </div>

        <div className="my-friends-header-icon" aria-hidden="true">
          👥
        </div>
      </header>

      <section className="friends-stats">
        <div className="friends-stat-card">
          <div className="friends-stat-icon purple">♧</div>
          <div>
            <span>Total Friends</span>
            <h2>{friends.length}</h2>
          </div>
        </div>

        <div className="friends-stat-card">
          <div className="friends-stat-icon green">●</div>
          <div>
            <span>Online Friends</span>
            <h2>{friends.filter((friend) => friend.online).length}</h2>
          </div>
        </div>

        <div className="friends-stat-card">
          <div className="friends-stat-icon orange">✉</div>
          <div>
            <span>Friend Requests</span>
            <h2>{requests.length}</h2>
          </div>
        </div>
      </section>

      <section className="friends-content">
        <div className="friends-toolbar">
          <div className="friends-tabs">
            {["Friends", "Requests"].map((tab) => (
              <button
                type="button"
                key={tab}
                className={`friends-tab ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === "Requests" && requests.length > 0 && (
                  <span className="request-count">{requests.length}</span>
                )}
              </button>
            ))}
          </div>

          <label className="friends-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder={
                activeTab === "Friends"
                  ? "Search friends..."
                  : "Search requests..."
              }
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        {notice && (
          <div className="friends-notice" role="status">
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
            >
              ✕
            </button>
          </div>
        )}

        {activeTab === "Friends" ? (
          filteredFriends.length > 0 ? (
            <div className="friends-grid">
              {filteredFriends.map((friend) => (
                <article className="friend-card" key={friend.id}>
                  <div className="friend-card-top">
                    <div className="friend-avatar-wrap">
                      <div
                        className={`friend-avatar ${friend.color || "purple"}`}
                      >
                        {friend.initials ||
                          friend.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                      </div>

                      <span
                        className={`friend-online-dot ${
                          friend.online ? "online" : "offline"
                        }`}
                        title={friend.online ? "Online" : "Offline"}
                      />
                    </div>

                    <span
                      className={`friend-status ${
                        friend.online ? "is-online" : "is-offline"
                      }`}
                    >
                      {friend.online ? "Online" : "Offline"}
                    </span>
                  </div>

                  <h3 className="friend-name">{friend.name}</h3>
                  <p className="friend-username">{friend.username}</p>
                  <p className="friend-role">
                    {friend.role || "Community member"}
                  </p>

                  <div className="friend-card-actions">
                    <button
                      type="button"
                      className="friend-message-btn"
                      onClick={() => sendMessage(friend)}
                    >
                      ✉ Message
                    </button>

                    <button
                      type="button"
                      className="friend-remove-btn"
                      onClick={() => removeFriend(friend)}
                      aria-label={`Remove ${friend.name}`}
                      title="Remove friend"
                    >
                      ⋯
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="friends-empty">
              <div className="friends-empty-icon">👥</div>
              <h3>No friends found</h3>
              <p>
                {friends.length === 0
                  ? "Your friends will appear here when you connect with people."
                  : "Try searching with a different name."}
              </p>
            </div>
          )
        ) : (
          requests.filter((request) =>
            `${request.name} ${request.username || ""}`
              .toLowerCase()
              .includes(search.toLowerCase())
          ).length > 0 ? (
            <div className="friend-requests-list">
              {requests
                .filter((request) =>
                  `${request.name} ${request.username || ""}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((request) => (
                  <article className="friend-request-card" key={request.id}>
                    <div className="friend-avatar blue">
                      {request.initials ||
                        request.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                    </div>

                    <div className="friend-request-info">
                      <h3>{request.name}</h3>
                      <p>{request.username || "@communitymember"}</p>
                    </div>

                    <div className="friend-request-actions">
                      <button
                        type="button"
                        className="accept-request-btn"
                        onClick={() => acceptRequest(request)}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="decline-request-btn"
                        onClick={() => declineRequest(request.id)}
                      >
                        Decline
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          ) : (
            <div className="friends-empty">
              <div className="friends-empty-icon">✉</div>
              <h3>No friend requests</h3>
              <p>New friend requests will appear here.</p>
            </div>
          )
        )}
      </section>
    </main>
  );
}

export default MyFriends;
