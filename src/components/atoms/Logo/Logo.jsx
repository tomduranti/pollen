//react
import { useLocation } from "react-router";

//svg
import logo from '@assets/logo.svg';


export default function Logo() {
    let location = useLocation();
    const REDIRECT_URL = location.pathname === '/signup' && 'signup'
                    || location.pathname === '/signin' && 'signin'
                    || location.pathname === '/location' && 'location'
                    || location.pathname === '/' && ''
                ;

    return (
        <a className='flex gap-2 items-center' href={`${import.meta.env.BASE_URL}` + REDIRECT_URL}>
            <img src={logo} alt="logo" />
            <h1 className='text-base font-semibold'>Pollen</h1>
        </a>
    )
}