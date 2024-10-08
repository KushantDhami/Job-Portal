import jwt from 'jsonwebtoken'

export const isAuthenticated = async ( req,res,next ) => {
  try 
  {
    const token = req.cookies.token
    if(!token)
    {
      return res.status(401).json({
        message:"the user not authorised",
        success:false
      })
    }
    const decode =await jwt.verify(token,process.env.SECRET_KEY)
    if(!decode)
    {
      return res.status(401).json({
        message:"Invalid token",
        success:false
      })
    }

    req.id= decode.userId
    next()
  }
  catch(error)
  {
    console.log(error)
  }
}
