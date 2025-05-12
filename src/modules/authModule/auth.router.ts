import { Router } from "express";
import { authServices } from "./auth.controller";

const router = Router();

router.post(
    "/sign-up",
    authServices.signUp
);

router.post(
    "/log-in",
    authServices.login
);

export default router;