
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

const API_URL = "http://localhost:5000/api/auth";

function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the currently authenticated user's real profile.
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        if (isMounted) {
          setError("Your login session was not found. Please log in again.");
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted && response.data.success) {
          setProfile(response.data.user);
        }
      } catch (err) {
        if (isMounted) {
          if (err.response?.status === 401) {
            setError("Your session has expired. Please log in again.");
          } else {
            setError(
              err.response?.data?.message ||
                "Unable to load your profile. Please try again."
            );
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = profile?.name || user?.name || "Community Member";
  const displayEmail = profile?.email || user?.email || "";
  const displayBio = profile?.bio || "Add a bio to tell the community about yourself.";
  const displayRole = profile?.role || user?.role || "user";
  const profileImage =
    profile?.profileImage ||
    `https://i.pravatar.cc/200?u=${encodeURIComponent(
      displayEmail || displayName
    )}`;

  const handleEditProfile = () => {
    alert("Edit Profile will be connected to the backend in the next step.");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Unable to load profile</h2>
          <p className="profile-error">{error}</p>
          <button
            type="button"
            className="edit-btn"
            onClick={() => window.location.assign("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Cover */}
      <div className="cover-photo"></div>

      {/* Profile Information */}
      <div className="profile-card">
        <img
          src={profileImage}
          alt={`${displayName}'s profile`}
          className="profile-avatar"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "https://i.pravatar.cc/200";
          }}
        />

        <h2>{displayName}</h2>

        <p className="bio">{displayBio}</p>

        <button
          type="button"
          className="edit-btn"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>

        {/* These statistics will be connected when the posts
            and follow modules have backend APIs. */}
        <div className="stats">
          <div>
            <h3>—</h3>
            <span>Posts</span>
          </div>

          <div>
            <h3>—</h3>
            <span>Followers</span>
          </div>

          <div>
            <h3>—</h3>
            <span>Following</span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="about-card">
        <h3>About</h3>

        <p>
          <strong>Email:</strong> {displayEmail || "Not provided"}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {displayRole.charAt(0).toUpperCase() + displayRole.slice(1)}
        </p>

        <p>
          <strong>Bio:</strong> {displayBio}
        </p>
      </div>

      {/* Sample posts — not fetched from the database yet */}
      <div className="posts-section">
        <h3>Sample Posts</h3>

        <div className="post-card">
          <p>Built my first React Social Media App 🚀</p>

          <div className="post-footer">
            <span>❤️ Demo likes</span>
            <span>💬 Demo comments</span>
          </div>
        </div>

        <div className="post-card">
          <p>Learning React Router and Context API today!</p>

          <div className="post-footer">
            <span>❤️ Demo likes</span>
            <span>💬 Demo comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
