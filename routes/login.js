import express from "express"
import RegData from "../models/RegData.js"
import Account from "../models/Account.js"

import bcrypt from "bcryptjs"
import jwt from  "jsonwebtoken"
const router = express.Router()

router.post('/',async (req,res)=>{
                const user = await RegData.findOne({email:req.body.email})
        if(!user) return res.status(404).json({Auth:false,data:'Email not found'})
        
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword) return res.status(404).json({Auth:false,data:'Invalid Password'})


        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.json({email:user.email,jwt:token})
        
        // res.status(200).json(user)
})
//Get Accounts
router.get('/accounts',async (req,res)=>{
        const accounts = await Account.find({email:req.query.email})
        console.log(accounts)
        res.json(accounts)
})
//Create Account 
router.post('/accounts',async (req,res)=>{
        const accounts = await Account.find({email:req.body.email})
        const matching = accounts.filter((account)=>{
                return account.accountName==req.body.accountName
        })
        console.log(matching)
        if(matching.length>0) return res.status(409).json({error:"Account name already taken"})
        try{
         const token = req.body.jwt
         const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        }
        catch(e){
                return res.status(400).json({error:"Invalid JWT"})
        }

        try{
        const accountData= new Account({
                email:req.body.email,
                accountName:req.body.accountName,
                accountImage:req.body.accountImage
        })
        
        const savedAccount = await accountData.save();
        res.status(200).send(accountData)
        }
        catch(e)
        {
        res.status(400).send(e)

        }       


})
//Delete Account 
router.delete('/accounts',async (req,res)=>{
        const account = await Account.findOne({email:req.body.email,accountName:req.body.accountName})
        console.log(account)
        try{
        const token = req.body.jwt
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
       }
       catch(e){
               return res.status(400).json({error:"Invalid JWT"})
        }
        if(account)
        {
         const deletedAccount = await Account.remove(account);
         res.status(200).json(deletedAccount)
        }
        else
        res.status(404).json({Error:"not found"})

        
})

export default router