import React from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { passwordValidation } from '../helperFile/validate'
import '../styles/Username.css'
import useFetch from '../customhooks/fetch.hook.js'
import { login } from '../services/service'

const userImage = "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"

const Password = () => {

  //  using naigation 
  const navigate = useNavigate();

  // retriving data from redux ... 
  const userInfo = useSelector((state) => state.userDetails);

  // using custom hook;
  const [{ isLoading, serverError, apiData }] = useFetch(`/user/${userInfo[0].username}`)

  const formik = useFormik({
    initialValues: {
      password: ""
    },
    validate: passwordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {

      const loginPromise = login({ username: userInfo[0].username, password: values.password });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login successfully...!</b>,
        error: <b>Login failed...!</b>
      });

      loginPromise.then((response) => {
        let { token } = response?.data;
        localStorage.setItem("token", token);
        navigate('/profile')
      })
    }

  })


  if (isLoading) return <h1 className='mx-auto text-white text-2xl font-bold'> Component Loading </h1>
  if (serverError) return <h1 className='text-2xl font-bold text-red-500' >{serverError.message} </h1>

  return (
    <div className=" flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      {/* implementing toaster */}
      <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className='text-center justify-center align-middle border mx-auto py-12 px-6  main-box '>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Hello {apiData?.firstname || apiData?.username} <span className='text-gray-400 text-xl' >Explore more by connecting with us</span> </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit} >

            <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center flex">
              <img className="mx-auto h-20 rounded-full w-auto" src={apiData?.profileImage || userImage} alt="avtar" />
            </div>

            <div>

              <div className="mt-2">
                <input type='text'  {...formik.getFieldProps('password')} id='password' className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' Password' />
              </div>
            </div>



            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer">Sign up</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Forgot password?
            <Link to={'/recovery'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Recover Now </Link>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Password