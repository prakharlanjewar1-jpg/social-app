
import React, { useEffect, useRef, useState } from "react";
import "./CreatePost.css";

const STORAGE_KEY = "communityHubPosts";

function readPosts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function CreatePost() {
  const [content, setContent] = useState("");
  const [community, setCommunity] = useState("General");
  const [visibility, setVisibility] = useState("Everyone");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState(readPosts);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image size must be 2 MB or less.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(String(reader.result));
      setMessage("");
    };

    reader.onerror = () => setMessage("Could not load this image.");

    reader.readAsDataURL(file);
  };

  const handlePublish = (event) => {
    event.preventDefault();

    if (!content.trim() && !image) {
      setMessage("Write something or add an image before publishing.");
      return;
    }

    const newPost = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      author: "Admin User",
      email: "admin@communityhub.com",
      content: content.trim(),
      image,
      community,
      visibility,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setContent("");
    setImage("");
    setCommunity("General");
    setVisibility("Everyone");
    setMessage("Your post has been published!");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePost = (id) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== id)
    );
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <main className="create-post-page">
      <header className="create-post-header">
        <div>
          <span className="create-post-eyebrow">COMMUNITYHUB</span>
          <h1>Create a Post</h1>
          <p>Share your thoughts, updates and moments with your community.</p>
        </div>
        <div className="create-post-header-icon" aria-hidden="true">
          ✍️
        </div>
      </header>

      <div className="create-post-layout">
        <section className="create-post-main">
          <form className="composer-card" onSubmit={handlePublish}>
            <div className="composer-author">
              <div className="composer-avatar">AU</div>
              <div>
                <h3>Admin User</h3>
                <p>Share something with your community</p>
              </div>
            </div>

            <label className="sr-only" htmlFor="post-content">
              What's on your mind?
            </label>

            <textarea
              id="post-content"
              className="composer-textarea"
              placeholder="What's on your mind today?"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              maxLength={2000}
              rows={6}
            />

            <div className="composer-character-count">
              {content.length}/2000 characters
            </div>

            {image && (
              <div className="composer-image-preview">
                <img src={image} alt="Selected post preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => {
                    setImage("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  aria-label="Remove selected image"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="composer-options">
              <div className="composer-option">
                <label htmlFor="post-community">Community</label>
                <select
                  id="post-community"
                  value={community}
                  onChange={(event) => setCommunity(event.target.value)}
                >
                  <option>General</option>
                  <option>Technology</option>
                  <option>Education</option>
                  <option>Gaming</option>
                  <option>Photography</option>
                  <option>Announcements</option>
                </select>
              </div>

              <div className="composer-option">
                <label htmlFor="post-visibility">Visibility</label>
                <select
                  id="post-visibility"
                  value={visibility}
                  onChange={(event) => setVisibility(event.target.value)}
                >
                  <option>Everyone</option>
                  <option>Community members</option>
                  <option>Only me</option>
                </select>
              </div>
            </div>

            <div className="composer-bottom">
              <div className="composer-upload">
                <input
                  ref={fileInputRef}
                  id="post-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
                <label htmlFor="post-image" className="upload-image-btn">
                  <span aria-hidden="true">▧</span> Add image
                </label>
                <span className="upload-hint">Max 2 MB</span>
              </div>

              <button
                type="submit"
                className="publish-post-btn"
                disabled={!content.trim() && !image}
              >
                Publish Post <span aria-hidden="true">↗</span>
              </button>
            </div>

            {message && (
              <p className="create-post-message" role="status">
                {message}
              </p>
            )}
          </form>

          <section className="published-posts-section">
            <div className="published-posts-heading">
              <div>
                <h2>Your Posts</h2>
                <p>Posts created from this page</p>
              </div>
              <span className="posts-count">{posts.length}</span>
            </div>

            {posts.length === 0 ? (
              <div className="empty-posts">
                <div className="empty-posts-icon">✎</div>
                <h3>Your story starts here</h3>
                <p>Create your first post and it will appear here.</p>
              </div>
            ) : (
              <div className="published-post-list">
                {posts.map((post) => (
                  <article className="published-post-card" key={post.id}>
                    <div className="published-post-author">
                      <div className="composer-avatar">AU</div>
                      <div className="published-post-author-info">
                        <h3>{post.author}</h3>
                        <p>
                          {formatDate(post.createdAt)} · {post.visibility}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="delete-post-btn"
                        onClick={() => removePost(post.id)}
                        aria-label="Delete this post"
                        title="Delete post"
                      >
                        🗑
                      </button>
                    </div>

                    <span className="post-community-tag">
                      #{post.community.replace(/\s+/g, "")}
                    </span>

                    {post.content && (
                      <p className="published-post-content">
                        {post.content}
                      </p>
                    )}

                    {post.image && (
                      <img
                        className="published-post-image"
                        src={post.image}
                        alt="Post attachment"
                      />
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>

        <aside className="create-post-sidebar">
          <div className="post-tips-card">
            <div className="tips-icon">💡</div>
            <h3>Tips for a great post</h3>
            <ul>
              <li>Share something useful or interesting.</li>
              <li>Keep your message clear and friendly.</li>
              <li>Add an image to make your post stand out.</li>
              <li>Respect other community members.</li>
            </ul>
          </div>

          <div className="post-guidelines-card">
            <h3>Community guidelines</h3>
            <p>
              Keep conversations respectful, avoid spam, and share content
              that is appropriate for your selected community.
            </p>
            <span>Build a better community together.</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default CreatePost;
