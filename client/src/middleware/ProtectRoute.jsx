import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
    const userInfo = useSelector((state)=> state.userDetails);
 
    if(userInfo.length == 0 ) {
        return <Navigate  to={'/'} replace={true} ></Navigate>
    }

    return  children
}

export default ProtectRoute