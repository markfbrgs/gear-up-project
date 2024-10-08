import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import AuthLayout from '../../components/auth-layout/auth-layout';
import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');  // State to hold the email input
  const [password, setPassword] = useState('');  // State to hold the password input
  const [error, setError] = useState(null);  // Local error handling state
  const { loginAdmin, loading } = useContext(AuthContext);  // Get loading state from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(email, password);  // Pass navigate to redirect after login
      navigate("/");
    } catch (err) {
      setError('Login failed. Please check your credentials.');  // Handle login errors locally
    }
  };

  return (
    <div className='login'>
      <AuthLayout formData={
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}  // Ensure value comes from state
                onChange={(e) => setEmail(e.target.value)}  // Update state on change
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}  // Ensure value comes from state
                onChange={(e) => setPassword(e.target.value)}  // Update state on change
                required
              />
            </div>
            {error && <p className="error">{error}</p>}  {/* Display local error message */}
            <button type="submit" className="submit-btn" disabled={loading}>  {/* Disable button when loading */}
              {loading ? 'Loading...' : 'Login'}  {/* Show loading text when loading */}
            </button>
          </form>
          <p className="toggle-text">
            <Link to="/login-pos">Login as POS</Link>
          </p>
        </div>
      } />
    </div>
  );
};

export default Login;
