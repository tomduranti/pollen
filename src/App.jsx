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
  const [isUserSignedIn, setIsUserSignedIn] = useState();
  const [userData, setUserData] = useState();

  //observer that checks if the user signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsUserSignedIn(user.uid);
      } else {
        setIsUserSignedIn(null);
      }
    });

    return () => unsubscribe();
  }, []);

//pull all user data from DB
  useEffect(() => {
    if (!isUserSignedIn) return;
          const db = getDatabase();
          const userRef = ref(db, `users/${isUserSignedIn}`);

          const unsubscribeOnValue = onValue(userRef, snapshot => {
            setUserData(snapshot.val());
          });

          return () => unsubscribeOnValue();
  }, [isUserSignedIn])

  return (
    <BrowserRouter>
      <header>
        <NavBar userName={userData} />
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