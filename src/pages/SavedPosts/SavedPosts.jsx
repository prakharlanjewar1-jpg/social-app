
import React, { useState } from "react";
import "./SavedPosts.css";

const initialPosts = [
  {
    id: 1,
    author: "Rahul Sharma",
    username: "@rahul_dev",
    avatar: "https://i.pravatar.cc/100?img=12",
    category: "Technology",
    date: "2 hours ago",
    content:
      "Just completed my React project! Learning by building real-world applications is one of the best ways to improve your frontend skills.",
    tags: ["React", "JavaScript", "WebDevelopment"],
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    author: "Priya Verma",
    username: "@priya_designs",
    avatar: "https://i.pravatar.cc/100?img=47",
    category: "Design",
    date: "Yesterday",
    content:
      "Good UI design is not just about colors and animations. It is about making the experience simple, useful, and accessible for everyone.",
    tags: ["UIDesign", "UX", "Design"],
    likes: 86,
    comments: 12,
  },
  {
    id: 3,
    author: "Aman Patel",
    username: "@aman_career",
    avatar: "https://i.pravatar.cc/100?img=11",
    category: "Career",
    date: "2 days ago",
    content:
      "A small reminder for students: keep learning, build projects, maintain your portfolio, and stay consistent. Progress takes time.",
    tags: ["Career", "Students", "Motivation"],
    likes: 205,
    comments: 31,
  },
];

function SavedPosts() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(initialPosts.map((post) => post.category)),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const removePost = (id) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== id)
    );
  };

  return (
    <section className="saved-posts-page">
      <div className="saved-posts-header">
        <div>
          <span className="saved-eyebrow">YOUR COLLECTION</span>
          <h1>Saved Posts</h1>
          <p>Keep useful ideas and posts in one place.</p>
        </div>

        <div className="saved-count">
          <span>🔖</span>
          <div>
            <strong>{posts.length}</strong>
            <small>Saved posts</small>
          </div>
        </div>
      </div>

      <div className="saved-search">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search saved posts, people or tags..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="saved-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="saved-posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article className="saved-post-card" key={post.id}>
              <div className="saved-post-top">
                <div className="saved-author">
                  <img src={post.avatar} alt={post.author} />
                  <div>
                    <h3>{post.author}</h3>
                    <span>
                      {post.username} · {post.date}
                    </span>
                  </div>
                </div>

                <span className="saved-label">🔖 Saved</span>
              </div>

              <span className="saved-category">{post.category}</span>

              <p className="saved-post-content">{post.content}</p>

              <div className="saved-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>

              <div className="saved-post-footer">
                <div className="saved-engagement">
                  <span>♥ {post.likes} likes</span>
                  <span>💬 {post.comments} comments</span>
                </div>

                <button
                  className="remove-saved-btn"
                  onClick={() => removePost(post.id)}
                >
                  Remove bookmark
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="saved-empty-state">
            <span className="empty-bookmark">🔖</span>
            <h3>No saved posts found</h3>
            <p>
              {posts.length === 0
                ? "You have removed all saved posts."
                : "Try another search term or category."}
            </p>
            {posts.length > 0 && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedPosts;
