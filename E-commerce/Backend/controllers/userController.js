import validator from "validator"
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}




//Route for user Login 
const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body

        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


//Route for user Login 
const registerUser = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        
        // Checking user Already Existed or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:"false",msg:"User Already Exists"})
        }

        // Validation Email and  Password
        if (!validator.isEmail(email)) {
            return res.json({success:"false",msg:"Please Enter a valid Email"})
        }
        if (password.length<8) {
            return res.json({success:"false",msg:"Password must be more than 8 character"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hasedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//Route for admin login
const adminLogin = async (req,res) =>{

}

export {loginUser,registerUser,adminLogin}