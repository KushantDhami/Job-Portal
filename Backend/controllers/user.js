import {User} from "../Models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cloudinary.js'
export const register = async (req,res) =>{
 try{

   const {fullname,email,phonenumber,password,role} = req.body
   
   if(!fullname || !email || !phonenumber || !password || !role)
    {
      res.status(400).json({
        message:"Something is missing",
        success:false
      })
    }
    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    let user = await User.findOne({email})
    if(user)
    {
      res.status(400).json({
        message:"User already exist",
        success:false
      })
    }

    const hashpassword = await bcrypt.hash(password,10)
    await User.create({
      fullname,
      email,
      phonenumber,
      password:hashpassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    })
    return res.status(201).json({
      message:"Account created successfully",
      success:true
    })
  }
  catch(error)
  {
   console.log(error)
    
  }

}


export const login = async (req,res) =>{
  try
  {
    const { email, password , role }= req.body
    if(!email || !password || !role)
    {
      return res.status(400).json({
        message:"Something is missing",
        success:false
      })
    }
    let user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        message:"Incorrect email or password",
        success:false
      })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if(!isPasswordMatch)
    {
      return res.status(400).json({
        message:"Incorrect email or password",
        success:false
      })
    }

    if(role !== user.role)
    {
      return res.status(400).json({
        message:"Your role is not matching with this account",
        success:false
    })
  }

  const tokenData = {
    userId : user._id
  }
  const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: "1d"})

  user = {
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phonenumber:user.phonenumber,
    role:user.role,
    profile:user.profile
  }

  return res.status(200).cookie("token",token,{maxAge : 1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
    message:`welcome ${user.fullname}`,
    user,
    success:true
  })

  }catch(error)
  {
      console.log(error)
  }
}

export const logout= async (req,res) => {
  try{
    return res.status(200).cookie("token","",{maxAge:0}).json({
      message:"Logout successfully",
      success:true
    })
  }
  catch(error)
  {
    console.log(error)
  }
}

export const updateProfile = async (req,res) => {
  try
  {
    const { fullname , email , phonenumber , bio , skills } = req.body
    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    let skillArray
    if(skills)
    {
       skillArray = skills.split(",")
    }
    
      const userId = req.id
      let user = await User.findById(userId)

      if(!user)
      {  
          return res.status(400).json({
              message:"User not found",
              success:false
            })     
      }

     if(fullname) user.fullname = fullname 
     if(email) user.email = email
     if(phonenumber) user.phonenumber = phonenumber
     if(bio) user.profile.bio = bio
     if(skills) user.profile.skills = skillArray

      if(cloudResponse)
      {
        user.profile.resume = cloudResponse.secure_url
        user.profile.resumeoriginalname= file.originalname
      }

      await user.save() 

      user = {
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phonenumber:user.phonenumber,
        role:user.role,
        profile:user.profile
      }

      return res.status(200).json({
        message:"Profile Updated Successfully",
        user,
        success:true
      })    
  }
  catch(error)
  {
    console.log(error)
  }
}