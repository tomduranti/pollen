//react and components
import { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import Logo from '@atoms/Logo/Logo.jsx';
import UserMenu from '@molecules/UserMenu/UserMenu.jsx';
import { useContext } from 'react';
import { AuthContext } from '@context/context.js';

//functions
import { getUserName } from '@utils/firebase/readAndWrite.js';


export default function NavBar() {

    let location = useLocation();
    const [userName, setUserName] = useState('');
    const isLocationForSignedInUser = ['/signup', '/signin'].includes(location.pathname);
    const [userId] = useContext(AuthContext);

    useEffect(() => {
        if (userId) {
            getUserName(userId).then(data => setUserName(data));
        }
    }, [userId]);


    return (
        <nav className='flex justify-between items-center pbe-5 max-h-11'>
            <Logo />
            {isLocationForSignedInUser
                ? null
                : <UserMenu userName={userName} />
            }
        </nav>
    );
}