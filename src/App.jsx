//react and components
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/atoms/NavBar/NavBar.jsx';
import Home from './pages/Home/Home.jsx';
import AuthForm from './pages/AuthForm/AuthForm.jsx';
import Location from './pages/Location/Location.jsx';

//functions
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './utils/firebaseConfig.js';

export default function App() {
  const defaultLocale = 'en';
  const [isUserSignedIn, setIsUserSignedIn] = useState();

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

  return (
    <BrowserRouter>
      <header>
        <NavBar isUserSignedIn={isUserSignedIn} />
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