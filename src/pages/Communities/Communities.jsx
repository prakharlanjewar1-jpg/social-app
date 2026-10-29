import { useState } from "react";
import "./Communities.css";

const initialCommunities = [
  {
    id: 1,
    name: "React Developers",
    category: "Technology",
    description: "Learn React, share projects, and discuss modern frontend development.",
    members: "12.5K",
    icon: "⚛️",
    color: "purple",
  },
  {
    id: 2,
    name: "JavaScript Community",
    category: "Technology",
    description: "Everything about JavaScript, ES6+, web development, and coding.",
    members: "18.2K",
    icon: "💻",
    color: "yellow",
  },
  {
    id: 3,
    name: "UI/UX Designers",
    category: "Design",
    description: "Share creative designs, discuss user experience, and get feedback.",
    members: "8.4K",
    icon: "🎨",
    color: "pink",
  },
  {
    id: 4,
    name: "Photography Club",
    category: "Photography",
    description: "A place for photography lovers to share their favorite captures.",
    members: "6.7K",
    icon: "📸",
    color: "blue",
  },
  {
    id: 5,
    name: "Startup Founders",
    category: "Business",
    description: "Connect with entrepreneurs and exchange startup ideas.",
    members: "9.1K",
    icon: "🚀",
    color: "orange",
  },
  {
    id: 6,
    name: "Gaming Zone",
    category: "Gaming",
    description: "Discuss games, share gaming experiences, and meet fellow gamers.",
    members: "15.6K",
    icon: "🎮",
    color: "green",
  },
];

const categories = [
  "All",
  "Technology",
  "Design",
  "Photography",
  "Business",
  "Gaming",
];

function Communities() {
  const [communities, setCommunities] = useState(initialCommunities);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [joinedTab, setJoinedTab] = useState(false);

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(search.toLowerCase()) ||
      community.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || community.category === category;

    const matchesJoined = !joinedTab || community.joined;

    return matchesSearch && matchesCategory && matchesJoined;
  });

  const toggleJoin = (id) => {
    setCommunities((current) =>
      current.map((community) =>
        community.id === id
          ? { ...community, joined: !community.joined }
          : community
      )
    );
  };

  return (
    <div className="communities-page">
      <header className="communities-header">
        <div>
          <span className="communities-eyebrow">YOUR PEOPLE, YOUR INTERESTS</span>
          <h1>Communities</h1>
          <p>Discover groups, share ideas, and connect with people.</p>
        </div>

        <button
          className="create-community-btn"
          onClick={() =>
            alert("Community creation will be available in a future update.")
          }
        >
          + Create Community
        </button>
      </header>

      <section className="community-stats">
        <div className="community-stat">
          <span className="stat-icon">👥</span>
          <div>
            <h3>70.5K+</h3>
            <p>Total members</p>
          </div>
        </div>

        <div className="community-stat">
          <span className="stat-icon">🌐</span>
          <div>
            <h3>{communities.length}</h3>
            <p>Communities</p>
          </div>
        </div>

        <div className="community-stat">
          <span className="stat-icon">🤝</span>
          <div>
            <h3>{communities.filter((c) => c.joined).length}</h3>
            <p>Communities joined</p>
          </div>
        </div>
      </section>

      <section className="community-discover">
        <div className="community-section-heading">
          <div>
            <h2>Explore Communities</h2>
            <p>Find your next favorite community.</p>
          </div>
        </div>

        <div className="community-search">
          <span>🔍</span>
          <input
            type="search"
            placeholder="Search communities..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="community-tabs">
          <button
            className={!joinedTab ? "active" : ""}
            onClick={() => setJoinedTab(false)}
          >
            Discover
          </button>

          <button
            className={joinedTab ? "active" : ""}
            onClick={() => setJoinedTab(true)}
          >
            My Communities
          </button>
        </div>

        <div className="community-categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="community-grid">
          {filteredCommunities.map((community) => (
            <article className="community-card" key={community.id}>
              <div className={`community-cover ${community.color}`}>
                <span className="community-emoji">{community.icon}</span>
                <span className="community-category">
                  {community.category}
                </span>
              </div>

              <div className="community-card-body">
                <h3>{community.name}</h3>

                <p className="community-description">
                  {community.description}
                </p>

                <div className="community-card-footer">
                  <span className="community-members">
                    👥 {community.members} members
                  </span>

                  <button
                    className={
                      community.joined
                        ? "join-community-btn joined"
                        : "join-community-btn"
                    }
                    onClick={() => toggleJoin(community.id)}
                  >
                    {community.joined ? "✓ Joined" : "+ Join"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="communities-empty">
            <span>🔎</span>
            <h3>No communities found</h3>
            <p>Try another search or select a different category.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setJoinedTab(false);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Communities;