// Profile.jsx - uses the JWT from Redux STATE to call the protected route
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

// Decode the middle part (payload) of the JWT so we can see what is inside
function decodePayload(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export default function Profile() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  const callProtectedRoute = async (withToken) => {
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        headers: withToken ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setResult({ ok: res.ok, text: `${res.status} - ${data.message}` });
    } catch {
      setResult({ ok: false, text: "Cannot reach the server." });
    }
  };

  const [header, payload, signature] = token.split(".");

  return (
    <div className="card">
      <h2>Logged in as {user?.username} ✅</h2>

      <p className="hint">Your JWT (header . payload . signature):</p>
      <pre>
        <span className="jwt-header">{header}</span>.
        <span className="jwt-payload">{payload}</span>.
        <span className="jwt-signature">{signature}</span>
      </pre>

      <p className="hint">Decoded payload:</p>
      <pre>{JSON.stringify(decodePayload(token), null, 2)}</pre>

      <div className="buttons">
        <button onClick={() => callProtectedRoute(true)}>Get protected data (with token)</button>
        <button onClick={() => callProtectedRoute(false)}>Try without token</button>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>

      {result && <p className={result.ok ? "success" : "error"}>{result.text}</p>}
    </div>
  );
}