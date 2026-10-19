//functions
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth } from '@utils/firebase/config.js';

import {
  isFormValid,
  redirectUserToLocation,
  createUserData,
  isUserNameSet,
} from '@utils/index.js';

export function authWithEmailAndPassword(
  credentials,
  errorMessageCredentials,
  setErrorMessageCredentials,
  authMode,
  setErrorMessageValidation,
  setIsLoading,
  navigate,
) {
  return async (event) => {
    event.preventDefault();

    //validating email and password
    if (
      !isFormValid(
        credentials.email,
        credentials.password,
        errorMessageCredentials,
        setErrorMessageCredentials,
      )
    )
      return;

    //start loading spin which will stop if there's any error message from DB
    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );
        await createUserData('userName', credentials.userName, user.uid);
        //finally, redirect user to location
        await redirectUserToLocation(user.uid, navigate);
      } else {
        const { user } = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );
        //finally, redirect user to home
        await redirectUserToLocation(user.uid, navigate);
      }
      setErrorMessageValidation(false);
    } catch (error) {
      console.error(error.code, error);
      setErrorMessageValidation(true);
      setIsLoading(false);
    }
  };
}

const googleProvider = new GoogleAuthProvider();

export function authWithGoogleProvider(navigate) {
  return async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      //if no userName, add userName to Database
      if (!(await isUserNameSet(user.uid)))
        return await createUserData('userName', user.displayName, user.uid);
      await redirectUserToLocation(user.uid, navigate);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Google Sign-In Error:', error);
      }
    }
  };
}
