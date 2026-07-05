//react and components
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/atoms/NavBar/NavBar.jsx';
import Home from './pages/Home/Home.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';

export default function App() {
  const defaultLocale = 'en';
  const [userSearch, setUserSearch] = useState({});

  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home defaultOrUserLocale={defaultLocale} userDataForSearchWrapper={setUserSearch} userDataForSearchArray={userSearch} />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}