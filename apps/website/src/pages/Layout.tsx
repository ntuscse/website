import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li> <Link to="/">Home</Link></li>
                    <li> <Link to="/problems">Problems</Link></li>
                    <li> <Link to="/profile">Profile</Link></li>
                </ul>
            </nav>

            {/* renders current route */}
            <Outlet />
        </>)
}

export default Layout