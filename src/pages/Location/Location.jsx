//react and components
import { useNavigate } from "react-router";
import { SearchBox } from '@mapbox/search-js-react';
import { getLocationFromAPI } from './useLocationApi.js';

export default function Location({ defaultOrUserLocale, isUserSignedIn }) {
    //if the user sets a location, this is saved in DB and the user is redirected to /home to see the results
    const navigate = useNavigate();

    return (
        <SearchBox
            accessToken={`${import.meta.env.VITE_SEARCH_API_KEY}`}
            options={{
                language: defaultOrUserLocale,
                country: 'AT,CH,DE,ES,FR,GB,IT,LV,LT,PL,SE,TR,UA',
                types: 'city',
            }}
            placeholder='Search a location'
            onRetrieve={getLocationFromAPI(isUserSignedIn, () => navigate('/'))}
        />
    )
}