import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getRecommendedUser, getMyUser } from "../controllers/user.controller.js"


const router = express.Router()

router.use(protectRoute)

router.post("/", getRecommendedUser)
router.post("/friends", getMyUser)

export default router