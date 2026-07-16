//react and components
import { useNavigate, useLocation } from "react-router";

//functions
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase/config.js'

export default function NavBar({ userData }) {
    const navigate = useNavigate();
    let location = useLocation();

    return (
        <nav>
            <a href="/">Logo</a>
            {location.pathname === '/signup' || location.pathname === '/signin'
                ? null
                : (
                    <>
                        {userData?.userName && <span>Hi, {userData.userName}</span>}
                        <button type='button' onClick={() => { signOut(auth), navigate('signup') }}>Sign out</button>
                    </>
                )
            }
        </nav>
    )
}