import jwt from "jsonwebtoken";
import { getKey } from "./secretKeyManager.js";

const key = getKey();
export const encodeToken = (payload) => {
  const token = jwt.sign(payload, key, { expiresIn: "24h" });
  return token;
};

export const decodeToken = (token) => {
  const decoded = jwt.verify(token, key);
  return decoded;
};
