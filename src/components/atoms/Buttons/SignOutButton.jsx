//react
import { useNavigate } from "react-router";

//functions
import { signOut } from "firebase/auth";
import { auth } from '@utils/firebase/config.js'


export default function SignOutButton() {
    const navigate = useNavigate();
    const handleClick = () => {
        signOut(auth),
        navigate('/signup')
    };

    return (
        <button className='cta button border-(--color-border) py-1.5 max-w-19 w-full text-[.813rem] font-medium' type='button' onClick={handleClick}>Sign out</button>
    )
}