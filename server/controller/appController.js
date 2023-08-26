import { userModel } from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'

class appController {

    // middle ware
    static verifyUserMiddleware = async (req, res, next) => {
      
        try {
            const { username } = req.method == "GET" ? req.query : req.body;
            const existingUser = await userModel.findOne({ username: username });
            if (!existingUser) {
                return res.status(401).json({ message: "username doesnt find " })
            };
            next();

        } catch (error) {
     
            return res.status(404).send({ error: "Authentication error" })
        }
    }

    // =================================================================================

    // for register page
    static register = async (req, res) => {

        try {

            const { username, useremail, password, profileImage } = req.body
            const existingUser = await userModel.findOne({ username: username });
            const existingEmail = await userModel.findOne({ useremail: useremail })
            if (existingUser) {
      
                return res.status(401).json({ message: "username already exist " })
            };
            if (existingEmail) {
              
                return res.status(401).json({ message: "Email already exist " })
            }

            if (!existingEmail && !existingUser) {
                if (password) {
                    const hashPassword = await bcrypt.hash(password, 10);
                    const result = new userModel({
                        username,
                        password: hashPassword,
                        useremail,
                        profileImage: profileImage || " "
                    });

                    await result.save();
                    res.status(200).json({ message: "User added successfully...!" })

                } else {
                    // alert('PassWord required');
                    return res.status(401).json({ message: "PassWord required.!" })
                }

            }

        } catch (error) {
            console.log(error , "63");
            return res.status(500).send({ error })
        }


    }

  
    static authenticate = async (req, res) => {
        res.json("3")
    }

    // =================================================================================

    static login = async (req, res) => {
        const { username, password } = req.body;
        try {
            const existingUser = await userModel.findOne({ username: username });
            if (existingUser) {
                const checkPassword = await bcrypt.compare(password, existingUser.password)
                if (!checkPassword) return res.status(400).send({ error: "password dont match...!" })

                // creating jwt token
                const token = jwt.sign({
                    userId: existingUser._id,
                    username: existingUser.username,
                }, "secret", { expiresIn: "24h" });

                return res.status(200).send({ message: "User login successfully", username: existingUser.username, token })

            } else {
                res.status(404).send({ error: "user not found" })
            }

        } catch (error) {
            console.log(error.message);
            return res.status(500).send({ error })
        }

    }

    // =================================================================================

    static getUser = async (req, res) => {

        const { username } = req.params;

        try {

            if (!username) return res.status(401).send({ error: "user dont exist" })

            const existingUser = await userModel.findOne({ username: username });

            // remove password from user data 
            // mongoose return unnecessary data with object so change it into json , 
            const { password, ...rest } = Object.assign({}, existingUser.toJSON())

            return res.status(201).send(rest)

        } catch (error) {
            return res.status(500).send({ error: "cant find user data" })
        }
    }

    // =================================================================================
    static generateOTP = async (req, res) => {
        req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        return res.status(200).send({ code: req.app.locals.OTP })
    }

    // =================================================================================

    static verifyOTP = async (req, res) => {
        const { code } = req.query;
       
        if (parseInt(req.app.locals.OTP) === parseInt(code)) {
            req.app.locals.OTP = null;
            req.app.locals.resetSession = true;
            //  console.log( " verify funv  Line 141" , req.app.locals.resetSession );
            return res.status(200).send({ msg: "Verify user successfully..!" })
        }else{

            return res.status(404).send({ msg: " User not verified..!" })
        }
        
    }

    // =================================================================================

    static createReset = async (req, res) => {
 
        if (req.app.locals.resetSession) {
            console.log("156");
            // req.app.locals.resetSession = false;
            return res.status(201).send({ flag : req.app.locals.resetSession , msg: "Access granted..!" })
        }
      
        return res.status(404).send({ error: "Session expired..!"  })
    }

    // =================================================================================

    static updateUser = async (req, res) => {
        try {

            const { userId } = req.user

            if (userId) {
                const newData = req.body
                await userModel.updateOne({ _id: userId }, newData);
                return res.status(201).send({ message: " Record updated...!" })
            }


        } catch (error) {
            return res.status(401).send({ error })
        }
    }


    // =================================================================================

    static resetPwd = async (req, res) => {
        
        if (!req.app.locals.resetSession) return res.status(404).send({ error: "Session expired....!" })

        const { username, password } = req.body;

        try {
       
            const existingUser = await userModel.findOne({ username: username });
           
            if (existingUser && password) {
        
                const hashPassword = await bcrypt.hash(password, 10);
                await userModel.updateOne({ username: existingUser.username }, { password: hashPassword });
                req.app.locals.resetSession = false;
                return res.status(201).send({ message: "Password updated successfully...!" })

            } else {
                res.status(400).send({ error: "inValid User " })
            }

        } catch (error) {
            console.log(error , "204" );
            return res.status(400).send({ error: "Somethng went wrong...!" })
        }

    }
}

export default appController