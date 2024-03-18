const jwt = require("jsonwebtoken");
const JWT_secret = "hellomylife$code";

const fatchuser = (req, res, next) => {
  // Get token from the request headers
  const token = req.header("JWT_secret");
  console.log(token);
  // Check if token exists
  if (!token) {
    return res.status(401).send("Please provide a valid authentication token");
  }

  try {
    // Verify the token and extract user data
    const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    // Call next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).send("Invalid or expired authentication token");
  }
};

module.exports = fatchuser;
