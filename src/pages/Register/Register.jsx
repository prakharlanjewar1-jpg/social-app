import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-page">
      <div className="register-card">

        <h1>CommunityHub</h1>
        <p>Create your account 🚀</p>

        <form>

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="text"
            placeholder="Username"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;