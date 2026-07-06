//react and components
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/atoms/NavBar/NavBar.jsx';
import Home from './pages/Home/Home.jsx';
import AuthForm from './pages/AuthForm/AuthForm.jsx';

//functions
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const defaultLocale = 'en';
  const [isUserSignedIn, setIsUserSignedIn] = useState(null);
  const [userSearch, setUserSearch] = useState({});

  //this is the observer that checks if the user is logged in
  onAuthStateChanged(getAuth(), user => {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user  
    user && setIsUserSignedIn(user.uid);
    !user && setIsUserSignedIn(null);
  });

  return (
    <BrowserRouter>
      <header>
        <NavBar isUserSignedIn={isUserSignedIn}/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home defaultOrUserLocale={defaultLocale} userDataForSearchWrapper={setUserSearch} userDataForSearchArray={userSearch} isUserSignedIn={isUserSignedIn} />} />
          {/* Email and Password paths */}
          <Route path='signup' element={<AuthForm authMode={'signup'} />} />
          <Route path='signin' element={<AuthForm authMode={'signin'} />} />
          {/* Providers don't have sinup/signin distinction */}
          <Route path='signup' element={<AuthForm />} />
          <Route path='signin' element={<AuthForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}