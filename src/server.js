import express from "express";
import cors from "cors";

// Import route controllers and middleware
import { router as clientRouter } from "./clients/clientsControllers.js";
import panelsControllers from "./panels/panelsControllers.js";
import auth from "./auth/authControllers.js";
import ErrorHandlingMiddleware from "./middlewares/errorMiddleware.js";

// Create an Express application
const app = express();

// Apply middlewares
app.use(cors());
app.use(express.json());

// Define routes
app.use("/falconPanel/api/auth", auth);
app.use("/falconPanel/api/clients", clientRouter);
app.use("/falconPanel/api/panels", panelsControllers);

// Error handling middleware should be added last
app.use(ErrorHandlingMiddleware);

// Start the server
app.listen(5000, () => {});
