import { useSelector } from "react-redux";
import Counter from "./components/Counter";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "./App.css";

export default function App() {
  const counter = useSelector((state) => state.counter);
  const auth = useSelector((state) => state.auth);

  return (
    <div className="app">
      <h1>Lab 10: React Redux + JWT</h1>
      <p className="subtitle">State · Store · Reducer · Action · Dispatch · Subscribe</p>

      <div className="grid">
        <Counter />
        {auth.token ? <Profile /> : <Login />}
      </div>

      <div className="card">
        <h2>Live Redux STATE (from the STORE)</h2>
        <pre>
          {JSON.stringify(
            {
              counter,
              auth: { ...auth, token: auth.token ? auth.token.slice(0, 25) + "..." : null },
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}