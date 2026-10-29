import { useState } from "react";
import "./Messages.css";

const initialChats = [
  {
    id: 1,
    name: "Aarav Sharma",
    avatar: "AS",
    color: "#6366f1",
    online: true,
    messages: [
      { id: 1, sender: "other", text: "Hey! How are you?", time: "10:30 AM" },
      { id: 2, sender: "me", text: "I'm good! How about you?", time: "10:31 AM" },
      { id: 3, sender: "other", text: "Doing great! Working on the React project?", time: "10:32 AM" },
    ],
  },
  {
    id: 2,
    name: "Priya Verma",
    avatar: "PV",
    color: "#ec4899",
    online: true,
    messages: [
      { id: 1, sender: "other", text: "Did you see the new community post?", time: "Yesterday" },
    ],
  },
  {
    id: 3,
    name: "Rahul Patel",
    avatar: "RP",
    color: "#14b8a6",
    online: false,
    messages: [
      { id: 1, sender: "other", text: "Thanks for sharing those resources!", time: "Yesterday" },
    ],
  },
  {
    id: 4,
    name: "Sneha Joshi",
    avatar: "SJ",
    color: "#f59e0b",
    online: false,
    messages: [
      { id: 1, sender: "other", text: "Let's discuss the design tomorrow.", time: "Monday" },
    ],
  },
];

function Messages() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  function sendMessage(event) {
    event.preventDefault();

    const text = message.trim();

    if (!text || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    setMessage("");
  }

  return (
    <div className="messages-page">
      <div className="messages-heading">
        <div>
          <h1>Messages</h1>
          <p>Connect and chat with your community.</p>
        </div>

        <span className="messages-count">
          {chats.length} conversations
        </span>
      </div>

      <div className="messages-container">
        {/* Conversation sidebar */}
        <aside className="chat-sidebar">
          <div className="chat-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="chat-list">
            {filteredChats.map((chat) => {
              const lastMessage = chat.messages[chat.messages.length - 1];

              return (
                <button
                  type="button"
                  className={`chat-contact ${
                    activeChatId === chat.id ? "active" : ""
                  }`}
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div
                    className="chat-avatar"
                    style={{ backgroundColor: chat.color }}
                  >
                    {chat.avatar}
                    {chat.online && <span className="online-dot" />}
                  </div>

                  <div className="chat-contact-info">
                    <div className="chat-contact-top">
                      <strong>{chat.name}</strong>
                      <span>{lastMessage?.time}</span>
                    </div>

                    <p>{lastMessage?.text || "Start a conversation"}</p>
                  </div>
                </button>
              );
            })}

            {filteredChats.length === 0 && (
              <p className="no-chats">No conversations found.</p>
            )}
          </div>
        </aside>

        {/* Active conversation */}
        <section className="chat-window">
          {activeChat ? (
            <>
              <header className="chat-header">
                <div
                  className="chat-avatar"
                  style={{ backgroundColor: activeChat.color }}
                >
                  {activeChat.avatar}
                </div>

                <div>
                  <h2>{activeChat.name}</h2>
                  <span>
                    {activeChat.online ? "● Online" : "Offline"}
                  </span>
                </div>
              </header>

              <div className="chat-messages">
                <div className="chat-date">Conversation</div>

                {activeChat.messages.map((item) => (
                  <div
                    key={item.id}
                    className={`message-row ${
                      item.sender === "me" ? "sent" : "received"
                    }`}
                  >
                    <div className="message-bubble">
                      <p>{item.text}</p>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form className="message-form" onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder={`Message ${activeChat.name}...`}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  aria-label="Type a message"
                />

                <button type="submit" disabled={!message.trim()}>
                  Send <span>➤</span>
                </button>
              </form>
            </>
          ) : (
            <div className="empty-chat">
              <span>💬</span>
              <h2>Select a conversation</h2>
              <p>Choose someone from the list to start chatting.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Messages;
