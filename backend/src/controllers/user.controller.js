import User from "../models/users.js"
import jwt from "jsonwebtoken"

export async function getRecommendedUser(req, res) {
    try {
        const currentUserId = req.User.id;
        const currentUser = req.User

        const recommendedUsers = await User.find({
            $and: [
                {_id: {$ne: currentUserId}},
                {$id: {$nin: currentUser.friends}},
                {isOnboarded: true}
            ]
        })

        res.status(200).json({recommendedUsers})
    } catch (error) {
        console.log(`Something went wrong while getting recommended users -- ${error}`)
        res.status(500).json({ message: " Something went wrong " });
    }
}

export async function getMyUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends)
    } catch (error) {
        console.log(`Something went wrong while getting my friends -- ${error}`)
        res.status(500).json({ message: " Something went wrong " });
    }
}