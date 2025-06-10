import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/users.js"
import jwt from "jsonwebtoken"

export async function signup(req, res) {
    const {email,password,fullName} = req.body

    try {
        if (!email || !password || !fullName){
            return res.status(400).json({message:"All fields are required"})
        }

        if (password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        const exisiting_user = await User.findOne({ email });
        if (exisiting_user){
            return res.status(400).json({ message: " Email already exists, please use a different email " });
        }

        const idx = Math.floor(Math.random() * 100) + 1;

        const random_profile_pic = `https://avatar.iran.liara.run/public/${idx}.png`

        const add_user = await User.create({
            email,
            password,
            fullName,
            profilePic: random_profile_pic,
        })

        try {
            await upsertStreamUser({
                id:add_user._id.toString(),
                name:add_user.fullName,
                image:add_user.profilePic || "",
            });
            console.log(`new user created in Stream -- ${add_user._id}`)
        } catch (error) {
            console.error(`error while creating the new user in stream --- ${error}`)
        }

        const jwt_token = jwt.sign({userId:add_user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn:"7d"
        })

        res.cookie("jwt", jwt_token, {
            maxAge: 7 * 24 * 60 * 1000,
            httpOnly: true,
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success:true, user:add_user})
    } catch (error) {
        console.log(`Something went wrong while signup -- ${error}`)
        res.status(500).json({ message: " Something went wrong " });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({message:"All fields are required"})
        }

        const exisiting_user = await User.findOne({ email });
        if (!exisiting_user){
            return res.status(401).json({message:"User with this email doesnot exist!"})
        }

        const is_password_correct = await exisiting_user.matchPassword(password)
        if(!is_password_correct){
            return res.status(401).json({message:"Invalid Password"})
        }

        const jwt_token = jwt.sign({userId:exisiting_user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn:"7d"
        })

        res.cookie("jwt", jwt_token, {
            maxAge: 7 * 24 * 60 * 1000,
            httpOnly: true,
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({success:true, exisiting_user})
    } catch (error) {
        console.log(`Something went wrong while login -- ${error}`)
        res.status(500).json({ message: " Something went wrong " });
    }
}

export async function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({success:true, message:"Logout successfull"})
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id
        const {fullName, bio, nativeLanguage , learningLanguage , location} = req.body
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({message:"All fields are required", 
                missingFields:[
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean),
            })
        }

        const updated_user = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded:true
        } , {new:true})

        if (!updated_user){
            res.status(404).json({ message: " User not found " });
        }

        try {
            await upsertStreamUser({
                id: updated_user._id.toString(),
                name: updated_user.fullName,
                image: updated_user.profilePic || "",
            })
            console.log(` user updated in Stream -- ${updated_user._id}`)
        } catch (error) {
            console.error(`error while updating the new user in stream --- ${error}`)
        }
        res.status(200).json({success:true, updated_user})
    } catch (error) {
        console.log(`Something went wrong while onboarding -- ${error}`)
        res.status(500).json({ message: " Something went wrong " });
    }
}