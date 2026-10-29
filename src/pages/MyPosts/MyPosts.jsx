
import React, { useEffect, useState } from "react";
import "./MyPosts.css";

const STORAGE_KEY = "communityHubPosts";

function getPosts() {
  try {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

function MyPosts() {
  const [posts, setPosts] = useState(getPosts);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const deletePost = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    setPosts((current) => current.filter((post) => post.id !== id));
  };

  const filteredPosts =
    filter === "All"
      ? posts
      : posts.filter((post) =>
          filter === "With Images" ? Boolean(post.image) : !post.image
        );

  const formatDate = (date) => {
    const parsed = new Date(date);

    return Number.isNaN(parsed.getTime())
      ? "Date unavailable"
      : parsed.toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        });
  };

  return (
    <main className="my-posts-page">
      <header className="my-posts-header">
        <div>
          <span className="my-posts-eyebrow">YOUR CONTENT</span>
          <h1>My Posts</h1>
          <p>Manage your posts and see everything you have shared.</p>
        </div>

        <div className="my-posts-header-icon" aria-hidden="true">
          📝
        </div>
      </header>

      <section className="my-posts-stats">
        <div className="my-post-stat-card">
          <div className="my-post-stat-icon purple">▤</div>
          <div>
            <span>Total Posts</span>
            <h2>{posts.length}</h2>
          </div>
        </div>

        <div className="my-post-stat-card">
          <div className="my-post-stat-icon blue">▧</div>
          <div>
            <span>Posts with Images</span>
            <h2>{posts.filter((post) => post.image).length}</h2>
          </div>
        </div>

        <div className="my-post-stat-card">
          <div className="my-post-stat-icon orange">Aa</div>
          <div>
            <span>Text Posts</span>
            <h2>{posts.filter((post) => !post.image).length}</h2>
          </div>
        </div>
      </section>

      <section className="my-posts-content">
        <div className="my-posts-toolbar">
          <div>
            <h2>Your Activity</h2>
            <p>All your locally saved posts in one place.</p>
          </div>

          <div className="my-posts-filters">
            {["All", "With Images", "Text Only"].map((option) => (
              <button
                type="button"
                key={option}
                className={`my-post-filter ${
                  filter === option ? "active" : ""
                }`}
                onClick={() => setFilter(option)}
                aria-pressed={filter === option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="my-posts-empty">
            <div className="my-posts-empty-icon">✎</div>
            <h3>
              {posts.length === 0 ? "No posts yet" : "No matching posts"}
            </h3>
            <p>
              {posts.length === 0
                ? "Your published posts will appear here. Head to Create Post to share your first update."
                : "Try another filter to see your posts."}
            </p>
          </div>
        ) : (
          <div className="my-posts-grid">
            {filteredPosts.map((post) => (
              <article className="my-post-card" key={post.id}>
                {post.image && (
                  <div className="my-post-image-wrap">
                    <img
                      className="my-post-image"
                      src={post.image}
                      alt="Post attachment"
                    />
                  </div>
                )}

                <div className="my-post-card-body">
                  <div className="my-post-card-top">
                    <span className="my-post-community">
                      #{(post.community || "General").replace(/\s+/g, "")}
                    </span>

                    <button
                      type="button"
                      className="my-post-delete"
                      onClick={() => deletePost(post.id)}
                      aria-label="Delete post"
                      title="Delete post"
                    >
                      🗑
                    </button>
                  </div>

                  <p className="my-post-content">
                    {post.content || "Image post"}
                  </p>

                  <div className="my-post-meta">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="my-post-visibility">
                      {post.visibility || "Everyone"}
                    </span>
                  </div>

                  <div className="my-post-card-footer">
                    <span>♡ {post.likes || 0} likes</span>
                    <span className="my-post-status">
                      <span className="my-post-status-dot" />
                      Published
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MyPosts;
