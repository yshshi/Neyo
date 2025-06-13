import express from "express"
import "dotenv/config"
import AuthRoutes from "./routes/auth.routes.js"
import UserRoutes from "./routes/user.routes.js"
import ChatRoutes from "./routes/chat.routes.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express()
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , AuthRoutes);
app.use("/api/user" , UserRoutes);
app.use("/api/chat" , ChatRoutes);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dict", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`);
    connectDB();
})