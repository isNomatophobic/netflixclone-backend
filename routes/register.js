import express from "express"
import RegData from "../models/RegData.js"
import Account from "../models/Account.js"

import bcrypt from "bcryptjs"
const router = express.Router()

router.post('/',async (req,res)=>{
    console.log(req.body)
    const emailExists = await RegData.findOne({email:req.body.email})
    if(!req.body.email) return res.status(400).send("No Email Provided")
    if(!req.body.password) return res.status(400).send("No Password Provided")

    if(emailExists) return res.status(406).send("Email already exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password , salt)

    const regData = new RegData({
        email:req.body.email,
        password:hashedPassword
    });
    const accountData= new Account({
        email:req.body.email,
        accountName:'Kids',
        accountImage:'156 - p19PL8P'
})
    try{
        const savedData = await regData.save()
        const savedAccount = await accountData.save();
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