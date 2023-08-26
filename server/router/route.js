import express from 'express'
import appController from '../controller/appController.js';

import { registerMail } from '../controller/mailer.js';
import Auth , { localVariables } from '../middleware/auth.js';

const route = express.Router();

// post routes
route.post('/register' , appController.register )
route.post('/registerMail' , registerMail ) //send the email
route.post('/authenticate' , appController.verifyUserMiddleware , (req, res)=> { res.end()} ) // authenticate user
route.post('/login' , appController.verifyUserMiddleware ,appController.login ) // login in app

// get route
route.get('/user/:username' , appController.getUser ) // user with username
route.get('/generateOTP' , appController.verifyUserMiddleware  , localVariables ,  appController.generateOTP ) // generate random OTP..
route.get('/verifyOTP' , appController.verifyUserMiddleware , appController.verifyOTP ) // verify generated OTP
route.get('/createResetSession' , appController.createReset ) // reset all the variable 

// put route 
route.put('/updateUser' ,Auth , appController.updateUser ) // is use to update the user profile
route.put('/resetPwd' ,appController.verifyUserMiddleware , appController.resetPwd ) // use to reset password


export default route