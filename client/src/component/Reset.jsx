
import React, { useEffect, useState } from 'react'

import { useFormik} from 'formik'
import  { useSelector  } from 'react-redux'
import   toast, { Toaster,} from 'react-hot-toast'
import { resetPasswordValidation  } from '../helperFile/validate'
import '../styles/Username.css'
import {resetPassword } from '../services/service'
import { Navigate, useNavigate } from 'react-router-dom'
import useFetch from '../customhooks/fetch.hook'

const Reset= () => {


  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userDetails);
  const username = userInfo[0]?.username
  
  const [ { isLoading, serverError, apiData , status } ] = useFetch('/createResetSession');

  // useEffect(()=> {
  //   console.log(status);
  //   console.log(apiData , serverError);
  // } )
 
  const formik = useFormik({
     initialValues : {
      password : "",
      confirm_pwd : ""
     },
     validate : resetPasswordValidation ,
    validateOnBlur  : false,
    validateOnChange : false,
    onSubmit : async (values)=> {
        let resetPromise = resetPassword({ username , password : values.password});

        toast.promise( resetPromise , {
          loading : "Sending..." ,
          success : <b>Password change successfully....!</b> ,
          error  : <b>Could not change password ....! </b>
        })

        resetPromise.then(()=> {
          navigate('/password')
        })
    }

  });

  
  if (isLoading) return <h1 className='mx-auto text-white text-2xl font-bold'> Component Loading </h1>
  if (serverError) return <h1 className='text-2xl font-bold text-red-500' >{serverError.message} </h1>
  if( status && status !== 201 ) return <Navigate to={'password'} replace={true} ></Navigate>

  return (
    <div className=" flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
         
         {/* implementing toaster */}
         <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className='text-center justify-center align-middle border mx-auto py-12 px-6  main-box '>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Reset <span className='text-gray-400 text-xl' >Create new password</span> </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit} action="#" method="POST">


            <div>

              <div className="mt-10">
                <input  {...formik.getFieldProps('password')}  className="block w-full rounded-md border-0 px-1 my-6 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' New Password' />

                <input  {...formik.getFieldProps('confirm_pwd')}  className="block w-full rounded-md border-0 px-1 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='Confirm Password' />
              </div>
            </div>



            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reset</button>
            </div>
          </form>

        </div>

      </div>

    </div>
  )
}


export default Reset