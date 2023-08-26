import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { usernameValidate } from '../helperFile/validate'
import '../styles/Username.css'
import { useDispatch } from 'react-redux'
import { addUser } from '../reduxStore/userSlice'

const Username = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: ""
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(addUser(values))
      navigate('/password')
    }

  })

  return (
    <div className=" flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      {/* implementing toaster */}
      <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className='text-center justify-center align-middle border mx-auto py-12 px-6  main-box '>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Hello Again! <span className='text-gray-400 text-xl' >Explore more by connecting with us</span> </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit} action="#" method="POST">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center flex">
              <img className="mx-auto h-20 rounded-full w-auto" src="https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png" alt="avtar" />
            </div>

            <div>

              <div className="mt-2">
                <input  {...formik.getFieldProps('username')} className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' Username' />
              </div>
            </div>



            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Let's Go</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register Now </Link>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Username