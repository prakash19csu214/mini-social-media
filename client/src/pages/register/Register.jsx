import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("http://localhost:5001/api/auth/register", newUser);
      alert("User Successfully created");
      navigate(`/profile/${usernameRef.current.value}`);

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-heading">Welcome to Mini Social Media App</h1>
      <form className="registration-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          ref={usernameRef}
          className="registration-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="registration-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="registration-input"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          className="registration-input"
          required
        />
        <button type="submit" className="registration-button registerLoginButton">
          Sign Up
        </button>
        <button onClick={() => navigate("/login")} className="registration-button registerLoginButton">
          Login In 
        </button>
      </form>
    </div>
  );
}
