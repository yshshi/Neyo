import express from "express"
import "dotenv/config"
import AuthRoutes from "./routes/auth.routes.js"
import UserRoutes from "./routes/user.routes.js"
import ChatRoutes from "./routes/chat.routes.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express()
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , AuthRoutes)
app.use("/api/user" , UserRoutes)
app.use("/api/chat" , ChatRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`);
    connectDB();
})