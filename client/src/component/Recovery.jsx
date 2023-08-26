import React, { useEffect, useState } from 'react'
import '../styles/Username.css'
import { useSelector } from 'react-redux';
import { generateOTP, verifyOTP } from '../services/service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Recovery = () => {

  const navigate = useNavigate()

  const userInfo = useSelector((state) => state.userDetails);
  const username = userInfo[0].username

  const [otp, setOtp] = useState();

  useEffect(() => {

    generateOTP(username)
      .then((OTP) => {
        console.log(OTP)
        if (OTP) return toast.success("OTP send to your email");
        return toast.error("Something went wrong...!");
      }).catch((err) => console.log(err));
  }, [username])


  // submit form function
  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ username, code: otp });
      if (status === 200) {
        toast.success("Verify user successfully..!");
        return navigate('/reset')
      }
    } catch (error) {
      console.log(error);
      return toast.error("Wrong OTP...! Please retry")
    };
  }

  // for resent Otp function
  const resendOtp = () => {
    const sendOtpPromise = generateOTP(username);

    toast.promise(sendOtpPromise, {
      loading: "Sending...",
      success: <b>Otp send to your email...!</b>,
      error: <b>Could not send...!</b>
    });

    sendOtpPromise.then((OTP) => {
      console.log(OTP);
    })

  }

  return (
    <div className=" flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      <div className='text-center justify-center align-middle border mx-auto py-12 px-6  main-box '>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Recover Password <span className='text-gray-400 text-xl' > Enter OTP to recover password </span> </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={(e) => handleSumit(e)} method='POST' >
            <div>

              <div className="mt-2">
                <span className='text-gray-500 text-sm'>Enter 6 digit OTP sent to your email address</span>
                <input className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=' Enter OTP'
                  onChange={(e) => setOtp(e.target.value)} />
              </div>
            </div>



            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Recover</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Can't get OTP?
            <button onClick={() => resendOtp()} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> &nbsp; Resend </button>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Recovery