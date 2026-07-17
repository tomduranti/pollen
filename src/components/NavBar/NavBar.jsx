//react and components
import { useNavigate, useLocation } from "react-router";
import { useState } from 'react';

//functions
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/config.js'
import { getUserName } from '../../firebase/readAndWrite.js'

export default function NavBar({ userId }) {
    const navigate = useNavigate();
    let location = useLocation();
    const [userName, setUserName] = useState('');

    if (userId) {
        getUserName(userId).then(data => {
            return setUserName(data);
        })
    }
    
    return (
        <nav>
            <a href="/">Logo</a>
            {location.pathname === '/signup' || location.pathname === '/signin'
                ? null
                : (
                    <>
                        {userName && <span>Hi, {userName}</span>}
                        <button type='button' onClick={() => { signOut(auth), navigate('signup') }}>Sign out</button>
                    </>
                )
            }
        </nav>
    )
}