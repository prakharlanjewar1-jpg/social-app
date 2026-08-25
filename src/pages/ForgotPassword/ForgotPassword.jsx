import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <h1>CommunityHub</h1>
        <h3>Forgot Password</h3>
        <p>Enter your email to receive reset instructions.</p>

        <form>

          <input
            type="email"
            placeholder="Enter your Email"
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

        <Link to="/login" className="back-link">
          ← Back to Login
        </Link>

      </div>
    </div>
  );
}

export default ForgotPassword;