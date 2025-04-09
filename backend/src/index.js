import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/routecontrol.js"
import deviceRoutes from "./routes/deviceroutecontrol.js"
import dotenv from "dotenv";


const app=express()

dotenv.config();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
  }));

app.use("/api/auth",authRoutes)
app.use("/api/devices",deviceRoutes)


app.listen(3050,()=>{
    console.log("server is running on port 3050");
    connectDB()
})