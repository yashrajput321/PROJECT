import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'

//App Config
const app = express()
const port = process.env.PORT || 4000
connectDb()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints

app.get(('/'),(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log("Server start on PORT",+ port)
})