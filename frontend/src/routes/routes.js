
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Page404 from '../pages/Page404'

export const routes = [
    {
        path: "/",
        ele: <Home/>,
        exact: true,
        isProtected: true,
        layout: "primary",
        fallBack: "/login",
        _for: "all"
    },
    {
        path: "/login",
        ele: <Login/>,
        exact: true,
        isProtected: true,
        layout: "primary",
        fallBack: "/login",
        _for: "all"
    },
    {
        path: "/Register",
        ele: <Register/>,
        exact: true,
        isProtected: true,
        layout: "primary",
        fallBack: "/login",
        _for: "all"
    },
    {
        path: "/*",
        ele: <Page404/>,
        exact: false,
        isProtected: false,
        layout: "primary",
        fallBack: "/",
        _for: "all"
    }
];