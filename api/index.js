const express = require("express");
const admin = require("firebase-admin");
const authenticate = require("./authenticate");
require("dotenv").config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/route-secured", authenticate, (req, res) => {
  res.send(`Hello, ${req.user.email}! You are authenticated.`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
