import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullname:{
    type : String,
    required:true
  },
  email:{
    type : String,
    required:true
  },
  phonenumber:{
    type : Number,
    
  },
  password:{
    type : String,
    required:true
  },
  role:{
    type : String,
    enum:["student","recruiter"],
    required:true
  },
  profile:{
    bio : {type : String},
    skills : [{type : String}],
    resume : {type : String},
    resumeoriginalname : {type : String},
    company : {type :mongoose.Types.ObjectId , ref:"Company"},
    profilePhoto:{
      type : String,
      default : ""
    }
  }
},{timestamps : true})

export const User = mongoose.model("User",userSchema)



