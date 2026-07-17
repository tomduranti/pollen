//react and components
import { useState } from 'react';
import usePollenSync from './usePollenSync.js';
import { Link } from 'react-router';
import Loading from '../../components/Loading/Loading.jsx';

//functions
import getCurrentHour from '../../utils/getCurrentHour.js';

export default function Home({ defaultOrUserLocale, userId }) {

    const [pollenData, setPollenData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userLocation, setUserLocation] = useState({ city: '', countryName: '' });    
    //filter only active pollens to display
    const filteredPollenList = pollenData?.map(item => {
        return item.contamination?.map(subitem => {
            //filter only relevant pollen results
            return (subitem.contamination_1 >= 1
                ? (
                    <li key={subitem.poll_id}>
                        <span>
                            {subitem.poll_title}: {subitem.contamination_1}
                        </span>
                    </li>
                )
                : null
            )
        });
    });

    usePollenSync(userId, defaultOrUserLocale, pollenData, setPollenData, setIsLoading, setUserLocation);
    // 1) if userId is undefined: auth is checking the value, showing a loading state
    if (userId === undefined || isLoading) return <Loading />;

    return (
        <>
            {pollenData?.length > 0
                ? (
                    <section>
                        <Link to='/location'>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{userLocation?.city}, ({userLocation?.countryName})</span>
                        </Link>
                        <div>Current allergy risk: {pollenData[0].allergyrisk_hourly?.allergyrisk_hourly_1[getCurrentHour()]}/10</div>
                        <ul>{filteredPollenList}</ul>
                    </section>
                )
                : null
            }
        </>
    )
}