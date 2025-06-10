import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async () =>{
    try {
        console.log(process.env.MONGO_URL)
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected successfully -- ${conn.connection.host}`)
    } catch (error) {
        console.log("error connecting MOngoDB",error)
        process.exit(1);
    }
}