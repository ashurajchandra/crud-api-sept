
const jwt = require('jsonwebtoken');
require('dotenv').config()


module.exports.verifyToken = (req, res,next) =>{
try{

    //read token value from headers
    const token = req.headers.authorization;
    console.log("token", token)
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    console.log("payload",payload)
    req.body.userId = payload.id

    next()

}catch(error){
    return res.status(401).json({
        message:'token is invalid',
        data: []
    })
}
}