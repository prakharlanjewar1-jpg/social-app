import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">CommunityHub</h2>

        <input
          className="search-box"
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="nav-right">
        <span className="notification">🔔</span>

        <div className="profile">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
          />

          <div className="profile-info">
            <h4>{user?.name}</h4>
            <p>{user?.role}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;