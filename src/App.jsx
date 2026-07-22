//react and components
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './pages/Home/Home.jsx';
import AuthForm from './pages/AuthForm/AuthForm.jsx';
import Location from './pages/Location/Location.jsx';

//css
import './App.css';

//functions
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config.js';

export default function App() {
  const defaultLocale = 'en';
  const [userId, setUserId] = useState();

  //observer that checks if the user signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className='flex flex-col mx-auto gap-5 w-full max-w-[88.2%] mbs-3'>
        <header>
          <NavBar userId={userId} />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home defaultOrUserLocale={defaultLocale} userId={userId} />} />
            <Route path='signup' element={<AuthForm authMode={'signup'} />} />
            <Route path='signin' element={<AuthForm authMode={'signin'} />} />
            <Route path='/location' element={<Location defaultOrUserLocale={defaultLocale} userId={userId} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}