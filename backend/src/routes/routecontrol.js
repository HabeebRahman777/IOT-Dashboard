import express from "express"
import { login,checkAuth, logout, signup } from "../authentication/authcontrol.js"
import { protectRoute } from "../middleware/authmiddleware.js"

const router = express.Router()

router.post("/login",login)
router.get("/check",protectRoute,checkAuth)
router.post("/logout",logout)
router.post("/signup",signup)

export default router