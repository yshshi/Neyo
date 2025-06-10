import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getRecommendedUser, getMyUser, sendFriendRequest, acceptFriendRequest, FriendRequests, OutgoingFriendRequests } from "../controllers/user.controller.js"


const router = express.Router()

router.use(protectRoute)

router.get("/", getRecommendedUser)
router.get("/friends", getMyUser)

router.post("/friend-request/:id", sendFriendRequest)

router.put("/friend-request/:id/accept", acceptFriendRequest)

router.get("/friend-requests", FriendRequests)

router.get("/outgoing-friend-requests", OutgoingFriendRequests)

export default router