import User from "../models/users.js"
import FriendRequest from "../models/friendRequest.js";
import jwt from "jsonwebtoken"

export async function getRecommendedUser(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user

        const recommendedUsers = await User.find({
            $and: [
                {_id: {$ne: currentUserId}},
                {_id: {$nin: currentUser.friends}},
                {isOnboarded: true}
            ]
        })

        return res.status(200).json({recommendedUsers})
    } catch (error) {
        console.log(`Something went wrong while getting recommended users -- ${error}`)
        return res.status(500).json({ message: " Something went wrong " });
    }
}

export async function getMyUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
        return res.status(200).json(user.friends)
    } catch (error) {
        console.log(`Something went wrong while getting my friends -- ${error}`)
        return res.status(500).json({ message: " Something went wrong " });
    }
}

export async function sendFriendRequest(req, res){
    try {
        const myId = req.user.id
        const {id:recipientId} =req.params

        //prevent sending to request to self

        if (myId === recipientId) {
            return res.status(400).json({ message: " You can't send friend request to youself " });
        }
        const recipient = await User.findById(recipientId)

        if(!recipient){
            return res.status(404).json({ message: " User Not Found " });
        }

        if(recipient.friends.includes(myId)){
            return res.status(400).json({ message: " You are already friends with this user " });
        }

        const exisiting_friends = await FriendRequest.findOne({
            $or:[
                { sender: myId, recipient:recipientId},
                { sender: recipientId, recipient:myId},
            ]
        })

        if(exisiting_friends){
            return res.status(400).json({ message: " A friend already exist between you and this user. " });
        }

        const friendrequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        return res.status(201).json(friendrequest)
    } catch (error) {
        console.log(`Something went wrong while sending friend request -- ${error}`)
        return res.status(500).json({ message: " Something went wrong " });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const {id:requestId} =req.params

        const friendrequest = await FriendRequest.findById(requestId);

        if(!friendrequest){
            return res.status(404).json({ message: " Friend Request Not Found " });
        }

        if(friendrequest.recipient.toString() !== req.user.id){
            return res.status(403).json({ message: " You are not authorised to accept this request " });
        }

        friendrequest.status = "accepted"
        await friendrequest.save();

        await User.findByIdAndUpdate(friendrequest.sender, {
            $addToSet: { friends: friendrequest.recipient},
        });

        await User.findByIdAndUpdate(friendrequest.recipient, {
            $addToSet: { friends: friendrequest.sender},
        });

        return res.status(200).json({ message: " Friend request Accepted. " });
    } catch (error) {
        console.log(`Something went wrong while accepting friend request -- ${error}`)
        return res.status(500).json({ message: " Something went wrong " });
    }
}

export async function FriendRequests(req, res) {
    try {
        const incoming_request = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const already_accepted = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic ");

        res.status(200).json({
            incoming_request, 
            already_accepted
        })
    } catch (error) {
        console.log(`Something went wrong while showing all friend request -- ${error}`)
        return res.status(500).json({ message: " Something went wrong " });
    }
}

export async function OutgoingFriendRequests(req, res) {
    try {
        const outgoing_req =  FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json({
            outgoing_req
        })
    } catch (error) {
        console.log(`Something went wrong while showing all outgoing friend request -- ${error}`)
        return res.status(500).json({ message: " Something went wrong " });
    }
}