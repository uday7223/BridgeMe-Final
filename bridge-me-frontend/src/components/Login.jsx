import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "../styles/login.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      console.log(response);
      

      // Ensure response is defined and has the data property
      if (response && response.data) {
        // Extract token from response
        login(response.data);
        const token = response.data.token;
        console.log(token);
        

        // Decode the token to get user info
        const decodedToken = jwtDecode(token); // Ensure correct usage
        console.log(decodedToken);
        
        // Check the user role and redirect accordingly
        if (decodedToken.role === 'Admin') {
          navigate('/admin-dashboard'); // Redirect to AdminDashboard
          setSuccess('Login successful!');
      setError('');
        } else if (decodedToken.role === 'Employee') {
          navigate('/employee-dashboard'); // Redirect to EmployeeDashboard
          setSuccess('Login successful!');
      setError('');
        } else {
          console.error('Unknown role:', decodedToken.role);
          alert('Invalid user role. Please contact support.');
        }
      } else {
        console.error('Invalid response:', response);
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
      setError(error.response.data.message || 'Login failed');

      setSuccess('');
    }
  };
  

  return (
   <>
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>

        <div className="bar text-">
          <p>Forgot password ?</p>
          <NavLink to="/register">          <p>New user ?</p></NavLink>
        </div>

        

      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
   
   </>
  );
};

export default Login;
