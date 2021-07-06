import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv/config"
import postsRoute from "./routes/posts.js"
import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"
import bodyParser from "body-parser"
import cors from "cors"
const app = express()

app.use(cors())
app.use(express.json())
app.use('/posts',postsRoute)
app.use('/register',registerRoute)
app.use('/login',loginRoute)



app.get('/',(req,res)=>{
    res.status(200).json({'Netflix':'Backend'})
})


mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("connected");
})


app.listen(process.env.PORT || 4000,()=>{
    console.log(`listening to port 4000...`);
})
