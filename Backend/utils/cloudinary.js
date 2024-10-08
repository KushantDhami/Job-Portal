import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
// const {CloudinaryStorage}=require("multer-storage-cloudinary")

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'wanderlust_DEV',
//       allowedformats:["png","jpg","jpeg","pdf"],
//     },
//   });

  // module.exports={
  //   cloudinary,
  //   // storage
  // } 

export default cloudinary