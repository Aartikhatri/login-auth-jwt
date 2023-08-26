import axios from 'axios';
import jwtDecode from 'jwt-decode'

const url = "http://localhost:8080" 
//note instead of passing url like this we can also do this
//   ** axios.defaults.baseURL = "http://localhost:8080" **



// get user details from decode token.. this function callng inside useFetch custom hook
export const getUserFromToken =  async () => {
    const token = localStorage.getItem("token");
    if(!token) return "Not a valid token"
    const decodedToken = jwtDecode(token);
    return decodedToken ;
}

// for authentication route
export const authentication = async (username)=> {
      try {
       return await axios.post(`${url}/authenticate` , {username})
      } catch (error) {
        return { error : "Username doesnt exist..!"}
      }
}

// for getting data of user
export const getUser = async({username})=> {
    try {
    const data = await axios.get(`${url}/user/${username}`)
    return { data}
    } catch (error) {
        return {error : "Password not match...!"}
    }
}

// for register user 
export const registerUser = async (credential) => {
    try {
        
        const { data : { message } , status } = await axios.post(`${url}/register` , credential);
        const { username , useremail } = credential;
        if(status === 200){
            await axios.post(`${url}/registerMail` ,  {username , useremail  , text : message })
        };
        return {message : "User register successfully...!"}

    } catch (error) {
        return { error : "REgistration failed...!"}
    }
};


// login function
export const login = async ( { username , password})=> {
    try {
       if( username ){
        const { data } = await axios.post(`${url}/login` , { username , password});
        return { data }
       }
    } catch (error) {
       
        return { error}
    }
}


// for update function
export const updateUser = async ( response)=> {
    try {
        const token =  localStorage.getItem("token");
        const data = await axios.put(`${url}/updateUser` , response , {
            headers : {
                Authorization : `Barear ${token}`
            }
        } );
        return Promise.resolve({data});
    } catch (error) {
        return { error : "Couldnt update profile..!"}
    }
}


// for generate OTP
export const generateOTP = async(username)=> {
    try {
        const { data : { code } ,status} = await axios.get(`${url}/generateOTP` , {params : { username }} , )

        // send mail with otp ;
        if(status === 200 && code) {
  
            const {data : { data }} = await getUser({username});
            const text = `You requested to reset the password for your account with the e-mail address ${data?.useremail} . Please click this link to reset your password.
            Your 6 digit OTP is : ${code}             
            Verify and recover your password`;
          await axios.post(`${url}/registerMail` , { username , useremail : data?.useremail , text , subject : "Password recovery OTP " });       
         
        }
        return  code
    } catch (error) {
        return { error }
    }
}


// verify OTP function
export const verifyOTP = async ({username , code } )=> {
    try {
        const { data , status } = await axios.get(`${url}/verifyOTP` , {params : { username , code}} )
        return { data , status}
    } catch (error) {
        // console.log( error?.response?.data , error?.response?.status);
        alert("incorrect OTP...!")
        return error?.response
    }
}


// for the reset password
export const resetPassword = async ( { username , password })=> {
    try {
        const { data , status } = await axios.put(`${url}/resetPwd` , { username , password});
        return { data , status};
    } catch (error) {
        console.log("err" , "124" , error);
        return { error }
    }
}