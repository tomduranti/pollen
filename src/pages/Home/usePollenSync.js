//react and components
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

//functions
import { getPollenFromAPI } from './usePollenApi.js';
import { updateUserPollen, updateUserLocationTimestamp, getUserDataFromDataBase } from '../../firebase/readAndWrite.js';
import getTimeDifference from '../../utils/getTimeDifference.js';

export default function usePollenSync(userId, defaultOrUserLocale, pollenData, setPollenData, setIsLoading, setUserLocation) {

    const navigate = useNavigate();
    const now = new Date;

    //userId has 3 conditions: 1) undefined, when the auth is checking the value,
    //2) null, the user succesfully signed out, 3) String, the user succesfully signed up/in
    useEffect(() => {
        //2) null, the user succesfully signed out
        if (userId === null) navigate('signup');

        //3) String, the user succesfully signed up/in
        if (userId) {
            setIsLoading(true);
            //see if previous data are stored in DB
            getUserDataFromDataBase(userId).then(data => {
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
                    updateUserLocationTimestamp(now, userId);
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
                            updateUserPollen(pollenData, userId);
                            updateUserLocationTimestamp(now, userId);
                        })
                        .catch(error => console.error(error))
                }
            });
        }

    }, [userId]);

    //this useEffect pushes data from useState to DB
    useEffect(() => {
        if (!userId) return;
        updateUserPollen(pollenData, userId);
        updateUserLocationTimestamp(now, userId);
        setIsLoading(false);
    }, [pollenData])
}