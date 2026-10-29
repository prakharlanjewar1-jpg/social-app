
import { useState } from "react";
import "./Search.css";

const searchData = [
  {
    id: 1,
    type: "People",
    name: "Aarav Sharma",
    subtitle: "@aaravsharma · React Developer",
    avatar: "AS",
    color: "#6366f1",
    description: "Building web applications with React and JavaScript.",
  },
  {
    id: 2,
    type: "People",
    name: "Priya Verma",
    subtitle: "@priyaverma · UI/UX Designer",
    avatar: "PV",
    color: "#ec4899",
    description: "Designer who loves creating simple user experiences.",
  },
  {
    id: 3,
    type: "People",
    name: "Rahul Patel",
    subtitle: "@rahulpatel · Full Stack Developer",
    avatar: "RP",
    color: "#14b8a6",
    description: "Learning, building, and sharing coding projects.",
  },
  {
    id: 4,
    type: "Communities",
    name: "React Developers",
    subtitle: "12.5K members",
    avatar: "⚛️",
    color: "#eef0ff",
    description: "Learn React, share projects, and discuss frontend development.",
  },
  {
    id: 5,
    type: "Communities",
    name: "UI/UX Designers",
    subtitle: "8.4K members",
    avatar: "🎨",
    color: "#fce7f3",
    description: "Explore design inspiration and share creative ideas.",
  },
  {
    id: 6,
    type: "Posts",
    name: "Getting started with React",
    subtitle: "Posted by Aarav Sharma · 2 hours ago",
    avatar: "📝",
    color: "#dbeafe",
    description: "My top tips for beginners learning components, props, and hooks!",
  },
  {
    id: 7,
    type: "Posts",
    name: "My new portfolio project",
    subtitle: "Posted by Priya Verma · Yesterday",
    avatar: "💡",
    color: "#fef3c7",
    description: "Sharing my latest design project. Feedback is always welcome!",
  },
];

const categories = ["All", "People", "Posts", "Communities"];

function Search() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [followed, setFollowed] = useState([]);
  const [joined, setJoined] = useState([]);
  const [saved, setSaved] = useState([]);

  const results = searchData.filter((item) => {
    const matchesCategory =
      category === "All" || item.type === category;

    const searchableText =
      `${item.name} ${item.subtitle} ${item.description}`.toLowerCase();

    return matchesCategory &&
      searchableText.includes(query.trim().toLowerCase());
  });

  function toggleItem(id, list, setList) {
    setList((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  }

  return (
    <div className="search-page">
      <header className="search-header">
        <span className="search-eyebrow">DISCOVER COMMUNITYHUB</span>
        <h1>Search & Explore</h1>
        <p>Find people, posts, and communities that interest you.</p>
      </header>

      <div className="search-box">
        <span className="search-icon">⌕</span>
        <input
          type="search"
          placeholder="Search people, posts, communities..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search CommunityHub"
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => setQuery("")}
          >
            Clear
          </button>
        )}
      </div>

      <div className="search-categories">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="search-results-heading">
        <div>
          <h2>{query ? "Search Results" : "Explore"}</h2>
          <p>
            {results.length} {results.length === 1 ? "result" : "results"} found
          </p>
        </div>
      </div>

      <div className="search-results">
        {results.map((item) => (
          <article className="search-result-card" key={item.id}>
            <div
              className={`search-result-avatar ${
                item.type === "People" ? "person-avatar" : ""
              }`}
              style={{ backgroundColor: item.color }}
            >
              {item.avatar}
            </div>

            <div className="search-result-info">
              <span className="search-result-type">{item.type}</span>
              <h3>{item.name}</h3>
              <span className="search-result-subtitle">
                {item.subtitle}
              </span>
              <p>{item.description}</p>
            </div>

            <div className="search-result-actions">
              {item.type === "People" && (
                <button
                  type="button"
                  className={
                    followed.includes(item.id)
                      ? "search-action following"
                      : "search-action primary"
                  }
                  onClick={() =>
                    toggleItem(item.id, followed, setFollowed)
                  }
                >
                  {followed.includes(item.id) ? "✓ Following" : "+ Follow"}
                </button>
              )}

              {item.type === "Communities" && (
                <button
                  type="button"
                  className={
                    joined.includes(item.id)
                      ? "search-action following"
                      : "search-action primary"
                  }
                  onClick={() =>
                    toggleItem(item.id, joined, setJoined)
                  }
                >
                  {joined.includes(item.id) ? "✓ Joined" : "+ Join"}
                </button>
              )}

              {item.type === "Posts" && (
                <button
                  type="button"
                  className={
                    saved.includes(item.id)
                      ? "search-action following"
                      : "search-action secondary"
                  }
                  onClick={() =>
                    toggleItem(item.id, saved, setSaved)
                  }
                >
                  {saved.includes(item.id) ? "✓ Saved" : "☆ Save"}
                </button>
              )}
            </div>
          </article>
        ))}

        {results.length === 0 && (
          <div className="search-empty">
            <span>🔎</span>
            <h3>No results found</h3>
            <p>Try a different keyword or category.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
