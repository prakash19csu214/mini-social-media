import axios from "axios";
import { useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();

    const userCredentials = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("http://localhost:5001/api/auth/login", userCredentials);
      alert("User Successfully LoggedIn");
      navigate(`/profile/${usernameRef.current.value}`);

    } catch (error) {
      console.error("Login Failed failed:", error);
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
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="registration-input"
          required
        />
        <button type="submit" className="registration-button registerLoginButton">
          Login In 
        </button>
        <button onClick={() => navigate("/")} className="registration-button registerLoginButton">
        Sign Up
        </button>
      </form>
    </div>
  );
}
