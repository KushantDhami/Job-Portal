import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/userRoute.js'
import companyRoute from './routes/companyRoute.js'
import jobRoute from './routes/jobRoute.js'
import applicationRoute from './routes/applicationRoute.js'

     dotenv.config({});

  
const app=express()
const PORT= process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
 origin: "http://localhost:5173",
 optionsSuccessStatus: 200,
  credentials : true
}

app.use(cors(corsOptions))

app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`the port is running on ${PORT}`) 
})