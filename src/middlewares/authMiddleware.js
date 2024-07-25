import { decodeToken } from "../utils/jwtManager.js";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const AuthMiddlware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    
    token = token.split(" ")[1];
    
    // Decode the token
    const data = decodeToken(token);
    
    // Check if the token is expired or invalid
    if (!data) {
      return res.status(401).send({ message: "Token invalid" });
    }
    
    // Check if username exists in the database
    const user = await prisma.user.findUnique({
      where: { username: data.username },
    });
    
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    
    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      // Handle expired token
      return res.status(401).send({ message: "Token expired" });
    }
    // Handle other errors
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default AuthMiddlware;
