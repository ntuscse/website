import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavBar from "../components/NavBar"

const Layout = () => {
    return (
        <>
            <NavBar logo={<Logo />} 
            navLinks={[
                { name: "Problems", route: "/problems"},
                { name: "Profile", route: "/profile"}
                ]} />

            {/* renders current route */}
            <Outlet />
        </>)
}

export default Layout