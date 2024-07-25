import {
  addPanelSchema,
  updatePanelSchema,
} from "../middlewares/validationsMiddleware.js";
import { validationResult } from "express-validator";
import {
  addPanel,
  deletePanel,
  getPanels,
  updatePanel,
} from "./panelsServices.js";
import { Router } from "express";
import AuthMiddlware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/get", AuthMiddlware, async (req, res, next) => {
  try {
    res.send(await getPanels());
  } catch (err) {
    next(err);
  }
});

router.post("/add", AuthMiddlware, addPanelSchema, async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const body = req.body;
      res.send(await addPanel(body));
    } catch (err) {
      next(err);
    }
  } else {
    res.status(422).json({ errors: errors.array() });
  }
});

router.put(
  "/update/:host",
  AuthMiddlware,
  updatePanelSchema,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const params = req.body;
        const host = req.params.host;
        res.send(await updatePanel(host, params));
      } catch (err) {
        next(err);
      }
    } else {
      res.status(422).json({ errors: errors.array() });
    }
  }
);

router.delete("/delete/:host", AuthMiddlware, async (req, res, next) => {
  try {
    const host = req.params.host;
    res.send(await deletePanel(host));
  } catch (err) {
    next(err);
  }
});

export default router;
