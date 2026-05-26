import jwt from "jsonwebtoken";

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];         // Bearer TOKEN with split() to isolate the token

  if (!token) return res.status(401).json({ error: "Access denied" }); // No token provided

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;                                     // Attached decoded user info to request object
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });       // Token verification failed
  }
};

export default authenticateToken;