//react and components
import { useState } from 'react';
import { NavLink } from "react-router";
import { LoaderCircle } from 'lucide-react';

//functions
import { useEmailAndPassword, useGoogleProvider } from './useAuthForm.js';

//svg
import googlelogo from '../../assets/icon_google.svg';

export default function AuthForm({ authMode }) {

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessageCredentials, setErrorMessageCredentials] = useState({ errorEmail: '', errorPassword: '' });
    const [errorMessageValidation, setErrorMessageValidation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleClickEmailAndPassword = useEmailAndPassword(credentials, errorMessageCredentials, setErrorMessageCredentials, authMode, setErrorMessageValidation, setIsLoading);
    const handleClickGoogleProvider = useGoogleProvider();

    return (
        <section className='flex flex-col gap-5 md:place-self-center md:max-w-sm md:w-full md:border md:border-solid md:rounded-2xl md:border-transparent md:px-8 md:py-5 md:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]'>
            <h2 className='text-[1.375rem] font-semibold'>{authMode === 'signup' ? 'Create your account' : 'Sign in to your account'}</h2>

            <button type='button' onClick={handleClickGoogleProvider} className='flex gap-1 cta button border-(--color-border) text-[0.938rem] font-semibold'>
                <img src={googlelogo} alt='' />
                Continue with Google
            </button>

            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-(--color-border)" />
                <span className="text-sm text-[#6B7380] uppercase">or</span>
                <div className="flex-1 h-px bg-(--color-border)" />
            </div>

            <form noValidate className='flex flex-col gap-3'
                onSubmit={e => {
                    e.preventDefault();
                    handleClickEmailAndPassword(e);
                }}>
                {authMode === 'signup' &&
                    <div>
                        <label className='inline-block mbe-1.5 text-xs text-(--color-text-secondary) font-medium' htmlFor="name">Name</label>
                        <input className='cta input-field max-h-12.5 px-5 border-(--color-border)' type="text" name="name"
                            required aria-describedby="" aria-invalid="false" onChange={e => setCredentials({ ...credentials, userName: e.target.value })} />
                    </div>
                }
                <div>
                    <label className='inline-block mbe-1.5 text-xs text-(--color-text-secondary) font-medium' htmlFor="email">Email</label>
                    <input className='cta input-field max-h-12.5 px-5 border-(--color-border)' type="email" name="mail"
                        required aria-describedby="" aria-invalid="false" onChange={e => (setCredentials({ ...credentials, email: e.target.value }))} />
                    <span className='error' aria-live="polite">{errorMessageCredentials.errorEmail}</span>
                </div>

                <div className='mbe-3'>
                    <label className='inline-block mbe-1.5 text-xs text-(--color-text-secondary) font-medium' htmlFor="password">Password</label>
                    <input className='cta input-field max-h-12.5 px-5 border-(--color-border)' type="password" name="password"
                        required aria-describedby="" aria-invalid="false" onChange={e => (setCredentials({ ...credentials, password: e.target.value }))} />
                    <span className='error' aria-live="polite">{errorMessageCredentials.errorPassword}</span>
                </div>

                <button className='flex gap-1 cta button bg-(--color-primary) hover:bg-[#3F9C6D] text-[0.938rem] font-semibold text-white' type="submit" >

                    {isLoading
                        ? <LoaderCircle className="animate-spin" />
                        : authMode === 'signup' ? 'Sign up' : 'Sign in'
                    }

                </button>

                {authMode === 'signin'
                    ? <div className='text-[0.813rem] text-(--color-text-secondary) font-normal'>Don't have an account? <NavLink to='/signup' className='font-bold'>Sign up</NavLink></div>
                    : <div className='text-[0.813rem] text-(--color-text-secondary) font-normal'>Already have an account? <NavLink to='/signin' className='font-bold'>Sign in</NavLink></div>
                }

                {(errorMessageValidation && authMode === 'signup') && <div className='error' aria-live="polite">This email is already in use. Try to <NavLink to='/signin'>sign in</NavLink></div>}
                {(errorMessageValidation && authMode === 'signin') && <div className='error' aria-live="polite">Invalid email or password</div>}

            </form>
        </section>
    )
}