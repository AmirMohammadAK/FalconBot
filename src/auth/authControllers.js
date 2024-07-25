import { loginSchema } from "../middlewares/validationsMiddleware.js";
import { validationResult } from "express-validator";
import { login } from "./authServices.js";
import { Router } from "express";

const router = Router();

router.post("/login", loginSchema, async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const body = req.body;
      const result = await login(body);
      res.send(result);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(422).json({ errors: errors.array() });
  }
});

export default router;
