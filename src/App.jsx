//react and components
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/atoms/NavBar/NavBar.jsx';
import Home from './pages/Home/Home.jsx';
import AuthForm from './pages/AuthForm/AuthForm.jsx';
import Location from './pages/Location/Location.jsx';

//functions
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth } from './firebase/config.js';

export default function App() {
  const defaultLocale = 'en';
  // const [isUserSignedIn, setIsUserSignedIn] = useState();
  const [userData, setUserData] = useState();

  //observer that checks if the user signed in
  //also stores userdata from DB to local object
  useEffect(() => {
    let unsubscribeOnValue;

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {

        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        unsubscribeOnValue = onValue(userRef, snapshot => {
          setUserData(prev => ({
            ...prev,
            userId: user.uid,
            userPollenAndLocation: snapshot.val()
          }));
        });

      } else {
        setUserData(null);
      }
    });

    return () => { unsubscribe(); unsubscribeOnValue?.() };
  }, []);


  return (
    <BrowserRouter>
      <header>
        <NavBar userData={userData} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home defaultOrUserLocale={defaultLocale} userData={userData} />} />
          <Route path='signup' element={<AuthForm authMode={'signup'} />} />
          <Route path='signin' element={<AuthForm authMode={'signin'} />} />
          <Route path='/location' element={<Location defaultOrUserLocale={defaultLocale} userData={userData} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}