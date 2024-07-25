import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

// Path to the .env file in the project root
const envFilePath = path.resolve(process.cwd(), ".env");

// Function to load environment variables
function loadEnvVariables() {
  dotenv.config({ path: envFilePath });
}

// Function to get or set the SECRET_KEY
export function getKey() {
  loadEnvVariables(); // Ensure environment variables are loaded
  let key = process.env.SECRET_KEY;

  if (!key) {
    key = bcrypt.genSaltSync(10);

    // Read existing .env file content and clean up empty lines
    let envFileContent = "";
    if (fs.existsSync(envFilePath)) {
      envFileContent = fs.readFileSync(envFilePath, "utf8").trim();
    }

    // Append the new key without adding extra empty lines
    if (envFileContent) {
      envFileContent += `\nSECRET_KEY=${key}\n`;
    } else {
      envFileContent = `SECRET_KEY=${key}\n`;
    }

    // Write back to the .env file
    fs.writeFileSync(envFilePath, envFileContent, "utf8");

    // Reload environment variables
    loadEnvVariables();
  }

  return key;
}
