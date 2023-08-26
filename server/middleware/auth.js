import jwt from "jsonwebtoken";


// middleware foe decode token
const Auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];

        // verifying token and retrived user details from the token
        const decodedToken = await jwt.verify(token, "secret")

        req.user = decodedToken

        next()

    } catch (error) {
        return res.status(400).send({ err: "authentication token error" })
    }

}


// middle ware for opt 
export  const localVariables = (req , res , next)=> {
   req.app.loacals = {
     OTP : null ,
     resetSession : false,
   }

   next();
}

export default   Auth  