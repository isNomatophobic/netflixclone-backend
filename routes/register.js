import express from "express"
import RegData from "../models/RegData.js"
const router = express.Router()

router.post('/',async (req,res)=>{
    const regData = new RegData({
        email:req.body.email,
        password:req.body.password
    });
    const savedData = await regData.save()
    res.status(200).send(regData)
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