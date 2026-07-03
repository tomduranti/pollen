//react and components
import { useEffect } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

//firebase
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig.js";

//function
import {
  validateEmail,
  validatePassword,
} from "../../../utils/EmailAndPasswordValidation.js";

const screenWidth = window.innerWidth;

const providers = [
  { id: "credentials", name: "Email and Password" },
  // { id: 'github', name: 'GitHub' },
  { id: "google", name: "Google" },
];

const signIn = async (provider, formData) => {
  //TODO: add a callbackURL to redirect the user to PollenDashboard if Signup/login is successful

  //signin with email and password
  if (provider.id === "credentials") {
    const email = formData.get("email");
    const password = formData.get("password");

    const emailSchema = validateEmail(email);
    const passwordSchema = validatePassword(password);

    if (!emailSchema.success) {
      return { error: emailSchema.error.issues[0].message };
    }
    if (!passwordSchema.success) {
      return { error: passwordSchema.error.issues[0].message };
    }

    //user is validate, therefore user credentials are stored in Firebase DB
    if (emailSchema.success && passwordSchema.success) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  }
  //signin with Google provider
  else if (provider.id === "google") {
    const GoogleProvider = new GoogleAuthProvider();

    //if mobile view
    if (screenWidth < 575) {
      await signInWithRedirect(auth, GoogleProvider);
    } else {
      signInWithPopup(auth, GoogleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
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
    }
  }
};

export default function userAuth() {
  const theme = useTheme();

  useEffect(() => {
  //get result of redirect
  getRedirectResult(auth)
    .then((result) => {
      console.log(result)
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error
    });
}, []);

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
