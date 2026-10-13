//react
import { LoaderCircle } from 'lucide-react';

export default function SignInButton({ isLoading, authMode }) {
    return (
        <button className='flex gap-1 cta button bg-(--color-primary) hover:bg-[#3F9C6D] text-[0.938rem] font-semibold text-white' type='submit' >
            {isLoading
                ? <LoaderCircle className='animate-spin' />
                : authMode === 'signup' ? 'Sign up' : 'Sign in'
            }
        </button>
    )
}