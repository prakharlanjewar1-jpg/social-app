import "./Profile.css";

function Profile() {
  const posts = [
    {
      id: 1,
      content: "Built my first React Social Media App 🚀",
      likes: 120,
      comments: 15,
    },
    {
      id: 2,
      content: "Learning React Router and Context API today!",
      likes: 95,
      comments: 10,
    },
  ];

  return (
    <div className="profile-page">

      {/* Cover */}
      <div className="cover-photo"></div>

      {/* Profile Info */}
      <div className="profile-card">

        <img
          src="https://i.pravatar.cc/200"
          alt="Profile"
          className="profile-avatar"
        />

        <h2>Admin User</h2>

        <p className="bio">
          Frontend Developer • React Enthusiast • UI Designer
        </p>

        <button className="edit-btn">
          Edit Profile
        </button>

        <div className="stats">

          <div>
            <h3>120</h3>
            <span>Posts</span>
          </div>

          <div>
            <h3>2.5K</h3>
            <span>Followers</span>
          </div>

          <div>
            <h3>450</h3>
            <span>Following</span>
          </div>

        </div>

      </div>

      {/* About */}
      <div className="about-card">
        <h3>About</h3>

        <p><strong>Email:</strong> admin@communityhub.com</p>
        <p><strong>Location:</strong> Nagpur, India</p>
        <p><strong>Profession:</strong> Frontend Developer</p>
      </div>

      {/* Posts */}
      <div className="posts-section">

        <h3>My Posts</h3>

        {posts.map((post) => (
          <div className="post-card" key={post.id}>

            <p>{post.content}</p>

            <div className="post-footer">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Profile;