import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY || "olma";
const EXPERES = process.env.JWT_EXPIRES_IN || "1h";

export default {
  sign: (payload) => jwt.sign(payload, SECRET, { expiresIn: EXPERES }),
  verify: (token) => {
    let payload;
    jwt.verify(token, SECRET, (err, decode) => {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token received.");
      }
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error("Token expired. Try to login again.");
      }
      payload = decode;
    });
    return payload;
  },
};
