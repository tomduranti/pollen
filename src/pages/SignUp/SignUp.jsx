//react and components
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router";

//functions
import { validateForm } from '../../utils/EmailAndPasswordValidation.js';
import { auth } from "../../utils/firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageEmailAlreadyExists, setErrorMessageEmailAlreadyExists] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    if (isFormValid) {
        //if email credentials are valid, create a user in Firebase DB
        //if the email already exists, prompt the user to SignIn
        setErrorMessageEmailAlreadyExists(false);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
            })
            .catch((error) => {
                error.code === "auth/email-already-in-use" && setErrorMessageEmailAlreadyExists(true)
            })
        //if the user was created successfully, redirect user to home page
        setIsFormValid(false);
        navigate('/');
    }

    return (
        <>
            <button type='button'>SignUp with Google</button>

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
                <button type="submit" id="submit" onClick={e => { return e.preventDefault(), setIsFormValid(validateForm(email, setErrorMessageEmail, password, setErrorMessagePassword)) }}>SignUp</button>
                {errorMessageEmailAlreadyExists
                    ? <div id="error" aria-live="polite">This email is already in use. Try to <NavLink to='/signin'>SignIn</NavLink></div>
                    : null
                }
            </form>
        </>
    )
}