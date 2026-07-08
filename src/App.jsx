//react and components
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/atoms/NavBar/NavBar.jsx';
import Home from './pages/Home/Home.jsx';
import AuthForm from './pages/AuthForm/AuthForm.jsx';
import Location from './pages/Location/Location.jsx';

//functions
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get } from 'firebase/database';
import { auth } from './utils/firebaseConfig.js';

export default function App() {
  const defaultLocale = 'en';
  const [isUserSignedIn, setIsUserSignedIn] = useState();
  const [userData, setUserData] = useState();

  //this is the observer that checks if the user is logged in
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function natively
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserSignedIn(user.uid);
      } else {
        setIsUserSignedIn(null);
      }
    });

    return () => unsubscribe();

  }, []);

  //pull all static data from user as s/he signs in and pass them as props
  useEffect(() => {
    if (isUserSignedIn) {
      const getUserDataFromDataBase = async () => {
        let arr;
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `users/${isUserSignedIn}`));
        if (snapshot.exists()) return arr = snapshot.val();
      }
      getUserDataFromDataBase().then(data => setUserData(data));
    }
  }, [isUserSignedIn])

  return (
    <BrowserRouter>
      <header>
        <NavBar userData={userData} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home defaultOrUserLocale={defaultLocale} isUserSignedIn={isUserSignedIn} />} />
          <Route path='signup' element={<AuthForm authMode={'signup'} />} />
          <Route path='signin' element={<AuthForm authMode={'signin'} />} />
          <Route path='/location' element={<Location defaultOrUserLocale={defaultLocale} isUserSignedIn={isUserSignedIn} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}