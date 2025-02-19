import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // use secure cookies in production
    sameSite: "strict", // prevent CSRF attacks
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  });
};

export default generateToken;
