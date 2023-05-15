import { Router } from "express";
import auth from "../controller/auth";
import verifyToken from "../middlewares/auth";

const router: Router = Router();

// Signup Route
router.route("/signup").post(auth.signUp.user);

// Login Route
router.route("/login").post(auth.login.user);
// router.route("/home").get(verifyToken,auth.logout.user);   

export default router;
