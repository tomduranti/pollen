//react and components
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router";

//functions
import { validateForm } from '../../firebase/auth.js';
import { writeUserData, getUserLocation } from '../../firebase/readAndWrite.js';
import { auth } from "../../firebase/config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider
} from "firebase/auth";

export default function AuthForm({ authMode }) {
    const navigate = useNavigate();
    const screenWidth = window.innerWidth;
    const GoogleProvider = new GoogleAuthProvider();

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessageCredentials, setErrorMessageCredentials] = useState({ errorEmail: '', errorPassword: '' });
    const [errorMessageValidation, seterrorMessageValidation] = useState(false);

    const handleClickEmailAndPassword = (event) => {
        //prevent form to refresh the page
        event.preventDefault();
        //validating email and password
        let isFormValid = validateForm(credentials.email, credentials.password, errorMessageCredentials, setErrorMessageCredentials);
        let errorMessage = false;
        //creating/loggin in user
        if (isFormValid) {
            //Signup mode with email/password
            if (authMode === 'signup') {
                //if email credentials are valid, create a user in Firebase DB
                //if the email already exists, prompt the user to SignIn
                createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                    .then(userCredential => {
                        // Signed up
                        const user = userCredential.user;

                        //if there's an error, kill this block
                        if (errorMessage) return;
                        seterrorMessageValidation(false);
                        //add userName to Database
                        writeUserData('userName', credentials.userName, user.uid);
                        //finally, redirect user to choose its location
                        if (errorMessage === false) return navigate('/location');
                    })
                    .catch(error => {
                        if (error.code === "auth/email-already-in-use") errorMessage = true;
                        seterrorMessageValidation(true);
                })
            }
            //Signin mode with email/password
            else if (authMode === 'signin') {
                signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                    .then(userCredential => {
                        const user = userCredential.user;

                        //if there's an error, kill this block
                        if (errorMessage) return;
                        //if there's no error, the user signed in successfully, redirect user to home page
                        seterrorMessageValidation(false);
                        //if user had already set a location, redirect user to home
                        //if user signed up but then logged out, set up location first
                        if (errorMessage === false && user) {
                            getUserLocation(user.uid).then(isLocationAlreadySet => {
                                isLocationAlreadySet ? navigate('/') : navigate('/location');
                                }
                            )
                        }
                    })
                    .catch(error => {
                        if (error.code === "auth/invalid-credential") errorMessage = true;
                        seterrorMessageValidation(true);
                })
            }
        }
    }

    const handleClickGoogleProvider = async () => {
        //if mobile view
        if (screenWidth < 575) {
            await signInWithRedirect(auth, GoogleProvider);

            getRedirectResult(auth)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access Google APIs.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                });
        } else {
            //if tablet/desktop view
            signInWithPopup(auth, GoogleProvider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;

                    //add userName to Database
                    writeUserData('userName', user.displayName, user.uid);

                    //after user has signed up/signed in, redicrect user to
                    //home if the user signs in, as s/he already chose the location
                    //location if the user signed up because s/he needs to choose a location
                    if (user) {
                        getUserLocation(user.uid).then(isLocationAlreadySet => {
                            isLocationAlreadySet ? navigate('/') : navigate('/location');
                        }
                        )
                    }
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                }
            )
        }
    }

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
                <button type="submit" id="submit" onClick={e => handleClickEmailAndPassword(e)}>{authMode === 'signup' ? 'SignUp' : 'SignIn'}</button>

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