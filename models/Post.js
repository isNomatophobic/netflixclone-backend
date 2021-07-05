import mongoose from "mongoose"

const PostSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

export default mongoose.model('posts',PostSchema)