import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtPars } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.get("/", jwtCheck, jwtPars, MyUserController.getCurrentUser);
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtPars,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);

export default router;
