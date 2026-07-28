//react and components
import { useNavigate } from "react-router";

//functions
import { validateForm } from '../../utils/auth.js';
import { writeUserCredentials, isUserLocationSet, isUserNameSet } from '../../firebase/readAndWrite.js';
import { auth } from "../../firebase/config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";


export function useEmailAndPassword(credentials, errorMessageCredentials, setErrorMessageCredentials, authMode, setErrorMessageValidation, setIsLoading) {

    const navigate = useNavigate();

    return event => {
        event.preventDefault();

        //validating email and password
        let isFormValid = validateForm(credentials.email, credentials.password, errorMessageCredentials, setErrorMessageCredentials);
        let errorMessage = false;

        if (!isFormValid) return;

        //start loading spin which will stop if there's any error message from DB
        setIsLoading(true);

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
                    setErrorMessageValidation(false);
                    //add userName to Database
                    writeUserCredentials('userName', credentials.userName, user.uid);
                    //finally, redirect user to choose its location
                    if (errorMessage === false) return navigate('/location');
                })
                .catch(error => {
                    if (error.code === "auth/email-already-in-use") errorMessage = true;
                    setErrorMessageValidation(true);
                    setIsLoading(false);
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
                    setErrorMessageValidation(false);
                    //if user had already set a location, redirect user to home
                    //if user signed up but then logged out, set up location first
                    if (errorMessage === false && user) {
                        isUserLocationSet(user.uid).then(isLocationAlreadySet => {
                            isLocationAlreadySet ? navigate('/') : navigate('/location');
                        }
                        )
                    }
                })
                .catch(error => {
                    if (error.code === "auth/invalid-credential") errorMessage = true;
                    setErrorMessageValidation(true);
                    setIsLoading(false);
                })
        }
    }
}


export function useGoogleProvider() {
    const GoogleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();

    return async () => {
        signInWithPopup(auth, GoogleProvider)
            .then(result => {
                const user = result.user;
                
                //after user has signed up/signed in, redicrect user to
                //home if the user signs in, as s/he already chose the location
                //location if the user signed up because s/he needs to choose a location
                if (user) {
                    //if no userName, add userName to Database
                    !isUserNameSet(user.uid).then(() => writeUserCredentials('userName', user.displayName, user.uid));

                    isUserLocationSet(user.uid).then(isLocationAlreadySet => {
                        isLocationAlreadySet ? navigate('/') : navigate('/location');
                    }
                    )
                }
            })
            .catch((error) => {
                if (error.code !== 'auth/popup-closed-by-user') {
                    console.error("Google Sign-In Error:", error);
                }
            }
        )
    }
}