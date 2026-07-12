//react and components
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../components/atoms/Loading/Loading.jsx';

//functions
import { getPollenFromAPI } from './Home.js';
import { getDatabase, ref, child, get } from 'firebase/database';
import { updateUserData, updateLocationTimestamp } from '../../firebase/readAndWrite.js';
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

    const [userLocation, setUserLocation] = useState({
        city: '',
        countryName: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // upon App.jsx intialisation, redirect user to signup/signin
    // but if you get to Home from signup/signin, you won't be redirected
    useEffect(() => {
        isUserSignedIn === null && navigate('signup');
    }, [])

    //toggle the location to user's favourite locations
    // const handleClick = async () => {

    //     const dbRef = ref(getDatabase());
    //     get(child(dbRef, `users/${isUserSignedIn}/location`))
    //         .then((snapshot) => {
    //             snapshot.exists()
    //                 //if /location exists, delete it
    //                 ? writeUserData(null, isUserSignedIn)
    //                 //if /location doesn't exist, create it
    //                 : writeUserData(userDataForSearchArray, isUserSignedIn);
    //         }).catch((error) => {
    //             console.error(error);
    //         })
    // };

    const getUserDataFromDataBase = useCallback(async () => {
        let arr;
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `users/${isUserSignedIn}`));
        if (snapshot.exists()) return arr = snapshot.val();
    }, [isUserSignedIn])

    //fetch Pollen API
    useEffect(() => {
        if (isUserSignedIn) {
            setIsLoading(true);

            //see if previous data are stored in DB
            getUserDataFromDataBase().then(data => {

                const now = new Date;
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
                            //push this data to DB as if latest timestamp <4h, this data is going to be fetched
                            updateUserData('latestPollenData', pollenData, isUserSignedIn);
                            updateLocationTimestamp(now, isUserSignedIn);
                            setIsLoading(false);
                            console.log("New data have been fetched")
                        })
                    return;
                }

                //if there is previous data stored in DB
                //if timestamp from user DB /location is less than 4 hours ago, display stale results
                console.log(`Data has been fetched more than 4 hours ago: ${getTimeDifference(now, latestTimestamp, 14400000)}`)
                if (!getTimeDifference(now, latestTimestamp, 14400000)) {
                    console.log('Fetching and showing stale data...')
                    setPollenData(data.latestPollenData);
                    setUserLocation(prev => (
                        {
                            ...prev,
                            city: data.location.city,
                            countryName: data.location.countryName,
                        }))
                    updateLocationTimestamp(now, isUserSignedIn);
                    setIsLoading(false);
                } else {
                    //if timestamp from user DB /location is more than 4 hours ago, fetch new data from Pollen API
                    console.log('Fetching and showing fresh data from API...')
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

    if (isLoading) return <Loading />

    return (
        <>
            {pollenData?.length > 0
                ? (
                    <section>
                        <div>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>{userLocation?.city}, ({userLocation?.countryName})</span>
                        </div>
                        <div>Current allergy risk: {pollenData[0].allergyrisk_hourly?.allergyrisk_hourly_1[getCurrentHour()]}/10</div>
                        <ul>{filteredPollenList}</ul>
                    </section>
                )
                : null
            }
        </>
    )
}