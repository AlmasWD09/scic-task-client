import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children:[
        {
            path:'/login',
            element:<Login />
        },
        {
            path:'/register',
            element:<Register />,
        }
      ]
    },
  ]);
  export default router;