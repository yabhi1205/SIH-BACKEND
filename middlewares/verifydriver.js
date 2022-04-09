require('dotenv/config')
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const fetchmanager = (req,res,next)=>{
    const token =req.header('auth-token')
    if (!token){
        return res.status(401).send({success: false,error:"Please authentiate with correct crediantials"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        if(!data.driver){
            return res.status(401).send({success: false,error:"Please authentiate with correct crediantials"})
        }
        req.driver=data.driver
        next()
    } catch (error) {
        return res.status(401).send({success: false,error:"Please authentiate with correct crediantials"})
    }

}
module.exports= fetchmanager