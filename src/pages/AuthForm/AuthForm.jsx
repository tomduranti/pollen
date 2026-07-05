//react and components
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router";

//functions
import { validateForm } from '../../utils/EmailAndPasswordValidation.js';
import { auth } from "../../utils/firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm({ authMode }) {
    const initialState = false;    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageInput, setErrorMessageInput] = useState(initialState);
    const [isFormValid, setIsFormValid] = useState(initialState);
    const navigate = useNavigate();
    const authKeyword = authMode === 'signup' ? 'SignUp' : 'SignIn';

    if (isFormValid) {

        //Singup mode
        if (authMode === 'signup') {
            //if email credentials are valid, create a user in Firebase DB
            //if the email already exists, prompt the user to SignIn
            setErrorMessageInput(initialState);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                })
                .catch((error) => {
                    error.code === "auth/email-already-in-use" && setErrorMessageInput(true);
                })
            //if the user was created successfully, redirect user to home page
            setIsFormValid(initialState);
            if (!errorMessageInput) return navigate('/');
        }

        //Signin mode
        else if (authMode === 'signin') {
            setErrorMessageInput(initialState);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    console.log(error.code)
                    error.code === "auth/invalid-credential" && setErrorMessageInput(true);
                });
            //if the user signed in successfully, redirect user to home page
            setIsFormValid(initialState);
            if (!errorMessageInput) return navigate('/');
        }
    }

    return (
        <>
            <button type='button'>{authKeyword} with Google</button>

            <div>OR</div>

            <form noValidate>
                <label htmlFor="email">Email address</label>
                <input type="email" name="mail"
                    required aria-describedby="" aria-invalid="false" onChange={e => setEmail(e.target.value)} />
                <div id="error" aria-live="polite">{errorMessageEmail}</div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"
                    required aria-describedby="" aria-invalid="false" onChange={e => setPassword(e.target.value)} />
                <div id="error" aria-live="polite">{errorMessagePassword}</div>
                <button type="submit" id="submit" onClick={e => { return e.preventDefault(), setIsFormValid(validateForm(email, setErrorMessageEmail, password, setErrorMessagePassword)) }}>{authKeyword}</button>

                {authMode === 'signin'
                    ? <div>Don't have an account? <NavLink to='/signup'>SignUp</NavLink></div>
                    : <div>Already have an account? <NavLink to='/signin'>SignIn</NavLink></div>
                }

                {(errorMessageInput && authMode === 'signup') && <div id="error" aria-live="polite">This email is already in use. Try to <NavLink to='/signin'>SignIn</NavLink></div>}
                {(errorMessageInput && authMode === 'signin') && <div id="error" aria-live="polite">Invalid email or password</div>}
            
            </form>
        </>
    )
}