const express = require("express");
const admin = require("firebase-admin");
const authenticate = require("./authenticate");
require("dotenv").config();

let serviceAccount;
try {
  const jsonKeys = process.env.FIREBASE_SERVICE_ACCOUNT
    ? process.env.FIREBASE_SERVICE_ACCOUNT
    : "";
  const decodedJsonKeys = Buffer.from(jsonKeys, "base64").toString("utf-8");
  serviceAccount = JSON.parse(decodedJsonKeys);
} catch (error) {
  console.error(
    "Erreur lors du décodage ou du parsing des clés Firebase :",
    error
  );
  process.exit(1);
}
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
