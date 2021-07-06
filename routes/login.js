import express from "express"
import RegData from "../models/RegData.js"
import bcrypt from "bcryptjs"
import jwt from  "jsonwebtoken"
const router = express.Router()

router.post('/',async (req,res)=>{

        const user = await RegData.findOne({email:req.body.email})
        if(!user) return res.status(404).json({Auth:false,data:'Email not found'})
        
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword) return res.status(404).json({Auth:false,data:'Invalid Password'})


        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.header('auth-token',token).json(user)
        
        // res.status(200).json(user)
})


export default router