import  toast  from "react-hot-toast"
import { authentication } from "../services/service.js";

// validating all data for registraion form
export async function registrationFormValidation (values) {
  const error = usernameVerify({} , values);
  emailVerify( error , values);
  passwordVerify(error , values);

  return error;
}

// validate login page username
export async function usernameValidate(values) {
  const error = usernameVerify({} , values );
  if(values.username){

     const { status } = await authentication(values.username);
  
      if( status !== 200){
        error.exist = toast.error("User does not exist")
      }
  }
  return error ;
}


// validate username 
 function usernameVerify ( error={} , values){
      if( !values.username){
        error.username = toast.error("Username Required..!")
      }else if(values.username.includes(" ") ){
        error.username = toast.error("Invalid Username..! ")
      }
      return error; 
}

// ======================================================================================================

// validate password for login
export async function passwordValidation(values){
  const error = passwordVerify({} , values);

  return error
}

// validation for reset password page 
export async function resetPasswordValidation (values){
  const error = passwordVerify({} , values);
  if(values.password !== values.confirm_pwd){
    error.exist = toast.error("Password not match..!")
  };

  return error;
}

// validate password
function passwordVerify (error ={} , values){

  const specialCharacter = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/

  if(!values.password){
    error.password = toast.error("Password Required..!")
  }else if (values.password.includes(" ")){
    error.password = toast.error("Password Invalid..!")
  }else if(values.password.length < 5 ){
    error.password = toast.error("Password must be more then 5 character ")
  }else if (!specialCharacter.test(values.password) ){
    error.password = toast.error("Password should have one special character")
  }

  return error
}

// ======================================================================================================

// validating email for registration form || also use for profile validation ..
export function emailValidation(values){
   const error = emailVerify( {} , values);

   return error;
}

// validate email
function emailVerify ( error = {} , values){

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

      if(!values.useremail) {
        error.useremail = toast.error("Email Required..!")
      }else if (values.useremail.includes(" ")) {
        error.useremail = toast.error("Wrong Email..!")
      }else if(!emailRegex.test(values.useremail) ){
        error.useremail = toast.error("Invalid email address..!!")
      }
}