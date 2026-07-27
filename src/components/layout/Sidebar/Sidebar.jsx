import { Link } from "react-router-dom";
import "./Sidebar.css"
function Sidebar() {
  return (
    <aside className="sidebar">

      <Link to="/">Home</Link>

      <Link to="/profile">
        Profile
      </Link>

      <Link to="/communities">
        Communities
      </Link>

      <Link to="/messages">
        Messages
      </Link>

      <Link to="/settings">
        Settings
      </Link>

    </aside>
  );
}

export default Sidebar;