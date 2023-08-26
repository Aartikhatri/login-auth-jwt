import React, { useState } from 'react'
import { Link , useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import  toast , { Toaster}   from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { emailValidation } from '../helperFile/validate'
import useFetch from '../customhooks/fetch.hook.js'
import '../styles/Username.css'
import { imageConertTOBase } from '../helperFile/convert'
import { updateUser } from '../services/service'

// default userimage
const userImage = "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"

const Profile = () => {

  const [file, setFile] = useState();

   //  using naigation 
   const navigate = useNavigate();

 
 
   // using custom hook;
   const [{ isLoading, serverError, apiData }] = useFetch() 
  

  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || "",
      lastname: apiData?.lastname || "",
      mobile: apiData?.mobile || "",
      useremail: apiData?.useremail || "",
      address: apiData?.address || ""

    },
     enableReinitialize : true ,
     validate: emailValidation , // for profile validation we are only validate email because firstname , lastname, address can be any type
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { 'profileImage': file || apiData?.profileImage || " " })
      const updatePromise = updateUser(values);
      toast.promise( updatePromise , {
        loading : "Updating....!" ,
        success : <b>Update successfully....!</b> ,
        error : <b>Update failed..!</b>
      })
      console.log(values);
    }

  })

  // formik dosent support file type data , so here we converting file to base64
  const fileHandler = async (e) => {
    const base64 = await imageConertTOBase(e.target.files[0]);
    setFile(base64)
  }

  const handleLogout = ()=> {
     localStorage.removeItem('token');
     navigate('/');
  }
  
  if (isLoading) return <h1 className='mx-auto text-white text-2xl font-bold'> Component Loading </h1>
  if (serverError) return <h1 className='text-2xl font-bold text-white mx-auto' >{serverError.message} </h1>

  return (
    <div className=" flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      {/* implementing toaster */}
      <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className='text-center justify-center align-middle border mx-auto py-12 px-6  main-box '>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Profile <span className='text-gray-400 text-xl' > &nbsp; you can update the details </span> </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit} action="#" method="POST">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center flex">

              <label htmlFor="profileImage">
                <img className="mx-auto h-28 rounded-full w-auto" src={ apiData?.profileImage || file || userImage } alt="avtar" />
              </label>

              <input type="file" onChange={(e) => fileHandler(e)} className='' id='profileImage' name='profileImage' />
            </div>

            <div>

              <div className="mt-2">

                <input  {...formik.getFieldProps('firstname')} className="block w-full rounded-md border-0 my-2 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' Firstname' />

                <input  {...formik.getFieldProps('lastname')} className="block w-full rounded-md border-0 my-2 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' Lastname' />

                <input  {...formik.getFieldProps('useremail')} className="block w-full rounded-md border-0 my-2 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' Email' />

                <input  {...formik.getFieldProps('mobile')} className="block w-full rounded-md border-0 my-2  px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' Mobile' />

                <input  {...formik.getFieldProps('address')} className="block w-full rounded-md border-0 px-1 my-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' Address' />
              </div>
            </div>



            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Update </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            come back later?
            <Link onClick={()=> handleLogout()} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Logout </Link>
          </p>
        </div>

      </div>

    </div>
  )
}




export default Profile