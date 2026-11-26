// server/index.js
// Lab 10 - JWT (JSON Web Token) demo server
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());          // allow the React app (port 5173) to call this server
app.use(express.json());  // read JSON from request bodies

const SECRET_KEY = "lab10_secret_key"; // used to SIGN and VERIFY tokens (demo only)
const PORT = 5000;

// Demo user (no database needed for this lab)
const demoUser = { id: 1, username: "student", password: "password123" };

// Home route: quick check that the server works
app.get("/", (req, res) => {
  res.send("Lab 10 JWT server is running");
});

// 1) LOGIN: if the username/password are correct, create a JWT and send it back
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== demoUser.username || password !== demoUser.password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // jwt.sign(payload, secret, options) -> creates header.payload.signature
  const token = jwt.sign(
    { id: demoUser.id, username: demoUser.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token, user: { id: demoUser.id, username: demoUser.username } });
});

// 2) MIDDLEWARE: checks the token before a protected route runs
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;        // "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // the payload we put in the token
    next();
  });
}

// 3) PROTECTED ROUTE: only works with a valid token
app.get("/api/profile", verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}! This data is protected by JWT.`,
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});