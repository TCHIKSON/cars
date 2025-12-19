const jwt = require("jsonwebtoken");

const generateJWT = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const validateJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateJWT,
  validateJWT,
};
