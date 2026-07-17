//react and components
import { useState } from 'react';
import { NavLink } from "react-router";

//functions
import { useEmailAndPassword, useGoogleProvider } from './useAuthForm.js';

export default function AuthForm({ authMode }) {

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessageCredentials, setErrorMessageCredentials] = useState({ errorEmail: '', errorPassword: '' });
    const [errorMessageValidation, seterrorMessageValidation] = useState(false);
    const handleClickEmailAndPassword = useEmailAndPassword(credentials, errorMessageCredentials, setErrorMessageCredentials, authMode, seterrorMessageValidation);
    const handleClickGoogleProvider = useGoogleProvider();

    return (
        <>
            <button type='button' onClick={handleClickGoogleProvider}>Continue with Google</button>

            <div>OR</div>

            <form noValidate>
                {authMode === 'signup' &&
                <>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name"
                            required aria-describedby="" aria-invalid="false" onChange={e => setCredentials({ ...credentials, userName: e.target.value })} />
                </>
                     }
                <label htmlFor="email">Email</label>
                <input type="email" name="mail"
                    required aria-describedby="" aria-invalid="false" required onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
                <div id="error" aria-live="polite">{errorMessageCredentials.errorEmail}</div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"
                    required aria-describedby="" aria-invalid="false" onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
                <div id="error" aria-live="polite">{errorMessageCredentials.errorPassword}</div>
                <button type="submit" id="submit" onClick={handleClickEmailAndPassword}>{authMode === 'signup' ? 'SignUp' : 'SignIn'}</button>

                {authMode === 'signin'
                    ? <div>Don't have an account? <NavLink to='/signup'>SignUp</NavLink></div>
                    : <div>Already have an account? <NavLink to='/signin'>SignIn</NavLink></div>
                }

                {(errorMessageValidation && authMode === 'signup') && <div id="error" aria-live="polite">This email is already in use. Try to <NavLink to='/signin'>SignIn</NavLink></div>}
                {(errorMessageValidation && authMode === 'signin') && <div id="error" aria-live="polite">Invalid email or password</div>}

            </form>
        </>
    )
}