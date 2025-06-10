import jwt from "jsonwebtoken"
import User from "../models/users.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(400).json({message:"UnAuthourised - No token is provided"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decode){
            return res.status(400).json({message:"UnAuthourised - Token is invalid"});
        }

        const user =  await User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(400).json({message:"UnAuthourised - User Not Found"});
        }

        req.user = user;

        next()
    } catch (error) {
        console.log("error in Protect Route Middleware", error);
        return res.status(500).json({message:"Interval Server Error"});
    }
}