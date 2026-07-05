//react and components
import { NavLink } from "react-router";
import { useLocation } from 'react-router'

//functions
import { signOut } from "firebase/auth";
import { auth } from '../../../utils/firebaseConfig.js'

export default function NavBar({ isUserSignedIn }) {
    let location = useLocation();

    const SignInOrLogOut = isUserSignedIn === null
                            ? <NavLink to='signin'>SignIn</NavLink>
                            : <button type='button' onClick={() => signOut(auth)}>Logout</button>
    ;

    return(
        <nav>
            <a href="/">Logo</a>
            {location.pathname === '/signup' || location.pathname === '/signin'
            ? <NavLink to='/'>Go back to home page</NavLink>
            : SignInOrLogOut
            }
        </nav>
    )
}