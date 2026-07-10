//react and components
import { useNavigate, useLocation } from "react-router";

//functions
import { signOut } from "firebase/auth";
import { auth } from '../../../utils/firebaseConfig.js'

export default function NavBar({ userName }) {
    const navigate = useNavigate();
    let location = useLocation();

    return (
        <nav>
            <a href="/">Logo</a>
            {location.pathname === '/signup' || location.pathname === '/signin'
                ? null
                : (
                    <>
                        {userName?.userName && <span>Hi, {userName.userName}</span>}
                        <button type='button' onClick={() => { signOut(auth), navigate('signup') }}>Sign out</button>
                    </>
                )
            }
        </nav>
    )
}