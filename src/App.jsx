//react
import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from '@organisms/NavBar/NavBar.jsx';
import { LoaderCircle } from 'lucide-react';
import { AuthContext } from '@context/context.js';
import { Home, Location, AuthForm } from '@utils/index.js';

//css
import './App.css';

//functions
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@utils/firebase/config.js';


export default function App() {
  const defaultLocale = 'en';
  const [userId, setUserId] = useState();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  //observer that checks if the user signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      //checks whether user signed in or not
      user ? setUserId(user.uid) : setUserId(null);
      //we know whether the user signed in or not 
      setIsAuthLoading(false);
    }
    );
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={[userId]}>
      <BrowserRouter basename='/pollen'>
        <div className='flex flex-col mx-auto gap-5 w-full max-w-[88.2%] mbs-3'>
          <header>
            <NavBar />
          </header>
          <main>
            <Suspense fallback={<LoaderCircle className='animate-spin m-auto' color='#2E7D57E6' size={42} />}>
              <Routes>
                <Route path='/' element={<Home defaultOrUserLocale={defaultLocale} />} />
                <Route path='signup' element={<AuthForm authMode={'signup'} />} />
                <Route path='signin' element={<AuthForm authMode={'signin'} />} />
                <Route path='/location' element={<Location defaultOrUserLocale={defaultLocale} />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}