//
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import Loading from '@atoms/Loading/Loading';
import ProtectedRoute from '@atoms/ProtectedRoute/ProtectedRoute.jsx';
import { AuthContext } from '@context/context.js';
import NavBar from '@organisms/NavBar/NavBar.jsx';
//css
import './App.css';
//functions
import { auth } from '@utils/firebase/config.js';

import { Home, Location, AuthForm } from '@utils/index.js';

const queryClient = new QueryClient();

export default function App() {
  const defaultLocale = 'en';
  const [userId, setUserId] = useState();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  //observer that checks if the user signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //checks whether user signed in or not
      user ? setUserId(user.uid) : setUserId(null);
      //we know whether the user signed in or not
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={[userId]}>
        <BrowserRouter basename='/pollen'>
          <div className='flex flex-col mx-auto gap-5 w-full max-w-[88.2%] mbs-3'>
            <header>
              <NavBar />
            </header>
            <main>
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/* Public routes */}
                  <Route
                    path='signup'
                    element={<AuthForm authMode={'signup'} />}
                  />
                  <Route
                    path='signin'
                    element={<AuthForm authMode={'signin'} />}
                  />

                  {/* Private routes */}
                  <Route element={<ProtectedRoute loading={isAuthLoading} />}>
                    <Route
                      path='/'
                      element={<Home defaultOrUserLocale={defaultLocale} />}
                    />
                    <Route
                      path='/location'
                      element={<Location defaultOrUserLocale={defaultLocale} />}
                    />
                  </Route>
                </Routes>
              </Suspense>
            </main>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
