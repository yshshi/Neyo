import express from "express"
import { login , signup,logout , onboard } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout) 

router.post("/onboarding", protectRoute ,onboard)

router.get("/check", protectRoute , (req, res) => {
    res.status(200).json({ sucess: true, user: req.user});
});

export default router