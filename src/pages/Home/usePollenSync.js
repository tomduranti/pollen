//react and components
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

//functions
import { getPollenFromAPI } from './usePollenApi.js';
import { updateUserPollen, updateUserLocationTimestamp, getUserDataFromDataBase } from '../../firebase/readAndWrite.js';
import getTimeDifference from '../../utils/getTimeDifference.js';

export default function usePollenSync(userId, defaultOrUserLocale, pollenData, setPollenData, setUserLocation, setError) {

    const navigate = useNavigate();
    const now = new Date;

    //userId has 3 conditions: 1) undefined, when the auth is checking the value,
    //2) null, the user succesfully signed out, 3) String, the user succesfully signed up/in
    useEffect(() => {
        //2) null, the user succesfully signed out
        if (userId === null) navigate('/signup');

        //3) String, the user succesfully signed up/in
        if (userId) {

            //see if previous data are stored in DB
            getUserDataFromDataBase(userId).then(data => {
                const latestTimestamp = new Date(data.location.timestamp);

                //if there is no previous data stored in DB, fetch and store fresh data
                if (!data.pollen) {
                    getPollenFromAPI(defaultOrUserLocale, data.location, setPollenData, setError)
                        .then(() => {
                            setUserLocation(prev => (
                                {
                                    ...prev,
                                    city: data.location.city,
                                    countryName: data.location.countryName,
                                }))
                        })
                    return;

                } else {
                    //if there is previous data stored in DB, always display stale data first to reduce time
                    setPollenData(data.pollen);
                    setUserLocation(prev => (
                        {
                            ...prev,
                            city: data.location.city,
                            countryName: data.location.countryName,
                        }));

                    //yet, if user/user.id/location.timestamp is >= 4 hours, fetch new data from Pollen API
                    //and override stale data
                    if (getTimeDifference(now, latestTimestamp, 14400000)) {
                        getPollenFromAPI(defaultOrUserLocale, data.location, setPollenData, setError)
                            .then(() => {
                                setUserLocation(prev => (
                                    {
                                        ...prev,
                                        city: data.location.city,
                                        countryName: data.location.countryName,
                                    }));
                            })
                            .catch(error => console.error(error));
                    }

                }
            });
        }

    }, [userId]);

    //this useEffect pushes data from useState to DB
    useEffect(() => {
        //guard against overriding pollenData on mount
        if (!userId || !pollenData) return;
        updateUserPollen(pollenData, userId);
        updateUserLocationTimestamp(now, userId);
    }, [pollenData])
}