import express from "express"
import verify from "./verifyToken.js"
import Post from "../models/Post.js"
const router = express.Router()

router.get('/',verify,async (req,res)=>{
    res.send('user is loged')
})
router.post('/', async (req,res)=>{
    //register
    // console.log("Logged Output:: req.body", req.body)
    // const post = new Post({
    //     id:req.body.id,
    //     username:req.body.username,
    //     password:req.body.password
    // });
    // const savedPost = await post.save()  
    // res.status(200).send(post)
    // req.url="http://localhost:3000/login"

    const posts = await Post.findOne({username:req.body.username,
    password:req.body.password})
    if(posts==null)
    res.status(404).json({Auth:false,data:'User not found'})
    else
    res.status(200).json(posts)
})

    

router.get('/:postId',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)

    } catch (error) {
        console.log(error);
    }
})

router.delete('/:postId',async(req,res)=>{
    try {
        const post = await Post.remove({id:req.params.postId})
        res.json(post)

    } catch (error) {
        console.log(error);
    }
})


router.patch('/:postId',async (req,res)=>{
    try {
        const post = await Post.updateOne({id:req.params.postId},{
            $set:{
                username:req.body.username
            }
        })
        res.json(post)

    } catch (error) {
        console.log(error);
    }
})
export default router