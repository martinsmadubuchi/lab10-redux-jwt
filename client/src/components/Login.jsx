// Login.jsx - sends username/password to the server, gets a JWT, DISPATCHES it to Redux
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../store/authSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(loginFailure(data.message)); // 4 - DISPATCH (failure)
        return;
      }
      dispatch(loginSuccess(data)); // 4 - DISPATCH (token + user go into STATE)
    } catch {
      dispatch(loginFailure("Cannot reach the server. Is it running on port 5000?"));
    }
  };

  return (
    <div className="card">
      <h2>JWT Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="hint">Demo account: student / password123</p>
    </div>
  );
}