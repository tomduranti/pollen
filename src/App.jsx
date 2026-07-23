//react and components
import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar.jsx';
import { LoaderCircle } from 'lucide-react';

//css
import './App.css';

//functions
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config.js';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Location = lazy(() => import('./pages/Location/Location.jsx'));
const AuthForm = lazy(() => import('./pages/AuthForm/AuthForm.jsx'));

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
          <Suspense fallback={<LoaderCircle className='animate-spin m-auto' color='#2E7D57E6' size={42} />}>
            <Routes>
              <Route path='/' element={<Home defaultOrUserLocale={defaultLocale} userId={userId} />} />
              <Route path='signup' element={<AuthForm authMode={'signup'} />} />
              <Route path='signin' element={<AuthForm authMode={'signin'} />} />
              <Route path='/location' element={<Location defaultOrUserLocale={defaultLocale} userId={userId} />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}