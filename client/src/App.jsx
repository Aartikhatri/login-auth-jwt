import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"

// 
import Password from "./component/Password"
import Reset from "./component/Reset"
import Profile from "./component/Profile"
import Register from "./component/Register"
import Recovery from "./component/Recovery"
import PageNotFound from "./component/PageNotFound"
import Username from "./component/Username"
import AuthorizationToken from "./middleware/authrizeMiddleware"
import ProtectRoute from "./middleware/ProtectRoute"

function App() {

  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Username />,
    },
    {
      path: '/password',
      element: <ProtectRoute >
        <Password />
      </ProtectRoute>
    },
    {
      path: '/reset',
      element: <Reset />
    },
    {
      path: '/profile',
      element: <AuthorizationToken>
        <Profile />
      </AuthorizationToken>
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: '/recovery',
      element: <Recovery />
    },
    {
      path: '*',
      element: <PageNotFound />
    }


  ])

  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  )
}

export default App
