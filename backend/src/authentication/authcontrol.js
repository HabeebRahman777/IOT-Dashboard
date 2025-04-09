import User from "../model/user.js"
import { generateToken } from "../lib/token.js"

export const login= async (req,res)=>{
    const{email,password}=req.body
    try {
      const user = await User.findOne({email})
  
      if(!user){
        return res.status(400).json({message:"Invalid credentials"})
      }
      generateToken(user._id,res)
      
      const { password, ...userWithoutPassword } = user._doc;
      res.status(201).json(userWithoutPassword)
  
    } catch (error) {
      console.log("Error in login controller",error.message)
      res.status(500).json({message:"Inernal Server Error"})
    }
  }
  
export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout = async(req,res)=>{
  try {
    res.cookie("dbd","",{maxAge:0})
    res.status(200).json({message:"Logged Out successfully"})

  } catch (error) {
    console.log("Error in logout controller",error.message)
    res.status(500).json({message:"Internal Server Error"})
  }
}