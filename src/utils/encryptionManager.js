import CryptoJS from "crypto-js";
import { getKey } from "./secretKeyManager.js";

const key = getKey();

// Encrypt function
export const encrypt = (data) => {
  const encryptData = CryptoJS.AES.encrypt(data, key).toString();
  return encryptData;
};

// Decrypt function
export const decrypt = (data) => {
  const decryptData = CryptoJS.AES.decrypt(data, key).toString(
    CryptoJS.enc.Utf8
  );
  return decryptData;
};
