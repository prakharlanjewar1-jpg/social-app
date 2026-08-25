import "./Home.css";

function Home() {
  const posts = [
    {
      id: 1,
      name: "John Doe",
      time: "2 hours ago",
      content:
        "Excited to start working on my new React social media project! 🚀",
      likes: 124,
      comments: 18,
    },
    {
      id: 2,
      name: "Emma Watson",
      time: "5 hours ago",
      content:
        "Learning React Router today. Routing is much easier than I expected! 💙",
      likes: 89,
      comments: 11,
    },
    {
      id: 3,
      name: "Alex Smith",
      time: "Yesterday",
      content:
        "Frontend development is fun when you build real-world projects.",
      likes: 240,
      comments: 35,
    },
  ];

  return (
    <div className="home">

      {/* Create Post */}
      <div className="create-post">
        <h3>Create Post</h3>

        <textarea
          placeholder="What's on your mind?"
          rows="4"
        ></textarea>

        <button>Post</button>
      </div>

      {/* Feed */}
      <div className="feed">

        {posts.map((post) => (
          <div className="post-card" key={post.id}>

            <div className="post-header">

              <img
                src={`https://i.pravatar.cc/150?img=${post.id + 10}`}
                alt="profile"
              />

              <div>
                <h4>{post.name}</h4>
                <small>{post.time}</small>
              </div>

            </div>

            <p className="post-content">
              {post.content}
            </p>

            <div className="post-footer">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
              <span>🔄 Share</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Home;