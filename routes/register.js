import express from "express"
import RegData from "../models/RegData.js"
import bcrypt from "bcryptjs"
const router = express.Router()

router.post('/',async (req,res)=>{

    const emailExists = await RegData.findOne({email:req.body.email})
    if(emailExists) return res.status(406).send("Email already exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password , salt)

    const regData = new RegData({
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedData = await regData.save()
        res.status(200).send(regData)
    }
    catch(e)
    {
        res.status(400).json(e)
    }
})

router.get('/',async (req,res)=>{
        const regData = await RegData.findOne({email:req.body.email,
        password:req.body.password})
        if(regData==null)
        res.status(404).json({Auth:false,data:'User not found'})
        else
        res.status(200).json(regData)
})


export default router