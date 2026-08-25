import "./Settings.css";

function Settings() {
  return (
    <div className="settings-page">

      <div className="settings-card">

        <h1>Settings</h1>

        {/* Profile Section */}
        <div className="settings-section">
          <h2>Profile Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            defaultValue="Admin User"
          />

          <input
            type="email"
            placeholder="Email"
            defaultValue="admin@communityhub.com"
          />

          <input
            type="text"
            placeholder="Location"
            defaultValue="Nagpur, India"
          />
        </div>

        {/* Password Section */}
        <div className="settings-section">
          <h2>Change Password</h2>

          <input
            type="password"
            placeholder="Current Password"
          />

          <input
            type="password"
            placeholder="New Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        {/* Notifications */}
        <div className="settings-section">

          <h2>Notifications</h2>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span>Email Notifications</span>
          </label>

          <label className="switch">
            <input type="checkbox" />
            <span>SMS Notifications</span>
          </label>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span>Push Notifications</span>
          </label>

        </div>

        {/* Appearance */}

        <div className="settings-section">

          <h2>Appearance</h2>

          <label className="switch">
            <input type="checkbox" />
            <span>Dark Mode</span>
          </label>

        </div>

        <button className="save-btn">
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Settings;