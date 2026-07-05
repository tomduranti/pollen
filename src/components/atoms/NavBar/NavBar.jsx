//react and components
import { NavLink } from "react-router";
import { useLocation } from 'react-router'

export default function NavBar() {
    let location = useLocation();

    return(
        <nav>
            <a href="/">Logo</a>
            {location.pathname === '/signup' || location.pathname === '/signin'
            ? <NavLink to='/'>Go back to home page</NavLink>
            : <NavLink to='signin'>SignIn</NavLink>
            }
        </nav>
    )
}