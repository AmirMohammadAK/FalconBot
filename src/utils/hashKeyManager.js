import { createHmac } from "crypto";
import { getKey } from "./secretKeyManager.js";

const key = getKey();
export function hashKey(data) {
  const hmac = createHmac("sha256", key);
  hmac.update(data);
  return hmac.digest("hex");
}

export function compareKey(data, hashedData) {
  const hmac = createHmac("sha256", key);
  hmac.update(data);
  return hashedData === hmac.digest("hex");
};
