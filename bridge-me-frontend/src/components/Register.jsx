import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      setSuccess(response.data.message);
      setError("");
      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);

      setError(error.response.data.message || "Server error");
      setSuccess("");
    }
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User Name"
              required
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID"
              required
            />
   
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          <div className="login-drop">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit">Register</button>
          <div className="bar text-xl">
          <NavLink to="/login"><p > have an account ?</p></NavLink>
        </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </>
  );
};

export default Register;
