const admin = require("firebase-admin");

const authenticate = async (req, res, next) => {
  const { email,password} = req.body;

  if (!email && !password) {
    return res.status(401).send("Unauthorized: No email provided");
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    req.user = userRecord;
    next();
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return res.status(404).send("Unauthorized: User not found");
    }

    console.error("Error verifying user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authenticate;
