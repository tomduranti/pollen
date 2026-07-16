//react and components
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import Loading from '../../components/Loading/Loading.jsx';

//functions
import { getPollenFromAPI } from './usePollenApi.js';
import { updateUserData, updateLocationTimestamp, getUserDataFromDataBase } from '../../firebase/readAndWrite.js';
import getCurrentHour from '../../utils/getCurrentHour.js';
import getTimeDifference from '../../utils/getTimeDifference.js';

export default function Home({ defaultOrUserLocale, isUserSignedIn }) {

    const [pollenData, setPollenData] = useState([]);
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

    const [userLocation, setUserLocation] = useState({ city: '', countryName: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const now = new Date;

    //isUserSignedIn has 3 conditions: 1) undefined, when the auth is checking the value,
    //2) null, the user succesfully signed out, 3) String, the user succesfully signed up/in
    useEffect(() => {
        //2) null, the user succesfully signed out
        if (isUserSignedIn === null) navigate('signup');

        //3) String, the user succesfully signed up/in
        if (isUserSignedIn) {
            setIsLoading(true);
            //see if previous data are stored in DB
            getUserDataFromDataBase(isUserSignedIn).then(data => {
                const latestTimestamp = new Date(data.location.timestamp);

                //if there is no previous data stored in DB, fetch and store fresh data
                if (!data.latestPollenData) {
                    getPollenFromAPI(defaultOrUserLocale, data.location, setPollenData)
                        .then(() => {
                            setUserLocation(prev => (
                                {
                                    ...prev,
                                    city: data.location.city,
                                    countryName: data.location.countryName,
                                }))
                        })
                    return;
                }
                //if there is previous data stored in DB, and:
                //i) timestamp from user DB /location is less than 4 hours ago, display stale results
                else if (!getTimeDifference(now, latestTimestamp, 14400000)) {
                    setUserLocation(prev => (
                        {
                            ...prev,
                            city: data.location.city,
                            countryName: data.location.countryName,
                        }))
                    updateLocationTimestamp(now, isUserSignedIn);
                    setIsLoading(false);
                } else {
                    //ii) timestamp from user DB /location is more than 4 hours ago, fetch new data from Pollen API
                    getPollenFromAPI(defaultOrUserLocale, data.location, setPollenData)
                        .then(() => {
                            setUserLocation(prev => (
                                {
                                    ...prev,
                                    city: data.location.city,
                                    countryName: data.location.countryName,
                                }))
                            setIsLoading(false);
                            updateUserData('latestPollenData', pollenData, isUserSignedIn);
                            updateLocationTimestamp(now, isUserSignedIn);
                        })
                        .catch(error => console.error(error))
                }
            });
        }
    }, [isUserSignedIn]);

    //this useEffect pushes data from useState to DB
    useEffect(() => {
        if (!isUserSignedIn) return;
        updateUserData('latestPollenData', pollenData, isUserSignedIn);
        updateLocationTimestamp(now, isUserSignedIn);
        setIsLoading(false);
    }, [pollenData, isUserSignedIn])

    // 1) isUserSignedIn is undefined: auth is checking the value
    if (isUserSignedIn === undefined) return <Loading />;

    //Loading spin that waits for data to be ready
    if (isLoading) return <Loading />

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