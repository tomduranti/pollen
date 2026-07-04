//react and components
import { useState } from "react";
import SearchBar from './components/atoms/SearchBar/SearchBar.jsx';
import PollenDashboard from './components/atoms/PollenDashboard/PollenDashboard.jsx';
import NavBar from './components/Molecules/NavBar/NavBar.jsx';
import UserAuth from './components/atoms/UserAuth/UserAuth.jsx';

export default function App() {
  const defaultLocale = 'en';
  const [userSearch, setUserSearch] = useState({});

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <section>
          <SearchBar defaultOrUserLocale={defaultLocale} userDataForSearchWrapper={setUserSearch}/>
          <PollenDashboard defaultOrUserLocale={defaultLocale} userDataForSearchArray={userSearch}/>
        </section>

        {/* <UserAuth /> */}
      </main>
    </>
  )
}