import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaComments,
  FaBell,
  FaSearch,
  FaBookmark,
  FaPlusCircle,
  FaClipboardList,
  FaUserFriends,
  FaUserShield,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <Link to="/home">
        <FaHome className="icon" />
        Home
      </Link>

      <Link to="/profile">
        <FaUser className="icon" />
        Profile
      </Link>

      <Link to="/communities">
        <FaUsers className="icon" />
        Communities
      </Link>

      <Link to="/messages">
        <FaComments className="icon" />
        Messages
      </Link>

      <Link to="/notifications">
        <FaBell className="icon" />
        Notifications
      </Link>

      <Link to="/search">
        <FaSearch className="icon" />
        Search
      </Link>

      <Link to="/saved">
        <FaBookmark className="icon" />
        Saved Posts
      </Link>

      <Link to="/create-post">
        <FaPlusCircle className="icon" />
        Create Post
      </Link>

      <Link to="/my-posts">
        <FaClipboardList className="icon" />
        My Posts
      </Link>

      <Link to="/friends">
        <FaUserFriends className="icon" />
        Friends
      </Link>

      <Link to="/admin">
        <FaUserShield className="icon" />
        Admin Panel
      </Link>

      <Link to="/analytics">
        <FaChartBar className="icon" />
        Analytics
      </Link>

      <Link to="/settings">
        <FaCog className="icon" />
        Settings
      </Link>

    </aside>
  );
}

export default Sidebar;