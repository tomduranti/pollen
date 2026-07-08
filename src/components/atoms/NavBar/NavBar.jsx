//react and components
import { useNavigate } from "react-router";
import { useLocation } from 'react-router'

//functions
import { signOut } from "firebase/auth";
import { auth } from '../../../utils/firebaseConfig.js'

export default function NavBar({ isUserSignedIn }) {
    const navigate = useNavigate();
    let location = useLocation();

    const SignInOrLogOut = isUserSignedIn !== null && <button type='button' onClick={() => { signOut(auth), navigate('signup') }}>Logout</button>;

    return(
        <nav>
            <a href="/">Logo</a>
            {location.pathname !== '/signup' || location.pathname !== '/signin'
            ? SignInOrLogOut
            : null
            }
        </nav>
    )
}