//react and components
import { useNavigate, useLocation } from "react-router";
import { useState } from 'react';

//functions
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/config.js'
import { getUserName } from '../../firebase/readAndWrite.js'

//svg
import logo from '../../assets/logo.svg';

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
        <nav className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <a href='/' >
                    <img src={logo} alt="logo" />
                </a>
                <h1 className='text-base font-semibold'>Pollen</h1>
            </div>
            {location.pathname === '/signup' || location.pathname === '/signin'
                ? null
                : (
                    <div className='flex justify-between max-w-44 w-full items-center'>
                        {userName && <span className='capitalize truncate text-sm text-(--color-text-secondary) font-normal'>hi, {userName}</span>}
                        <button className='cta button border-(--color-border) py-1.5 max-w-19 w-full text-[.813rem] font-medium' type='button' onClick={() => { signOut(auth), navigate('signup') }}>Sign out</button>
                    </div>
                )
            }
        </nav>
    )
}