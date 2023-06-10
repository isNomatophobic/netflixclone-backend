import jwt from "jsonwebtoken"

const verify = (req,res,next)=>{

    const token = req.header('auth-token')
    if(!token) return res.status(401).json({auth:false,error:"Access Denied"})

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified;
        next()
    }catch(e)
    {
         res.status(400).json({auth:false,error:"Invalid token"})
    }
}

export default verify