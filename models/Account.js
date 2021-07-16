import mongoose from "mongoose"

const AccountSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    accountName:{
        type:String,
        required:true,
    },
    accountImage:{
        type:String,
        required:true,
    }
})

export default mongoose.model('account',AccountSchema)