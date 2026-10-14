//DB
import { updateUserLocation, updateUserPollen } from '@utils/firebase/readAndWrite.js';

//Tan Stack
import { useQuery } from '@tanstack/react-query'

async function fetchPollen(locale, array) {
    const [countryCode, latitude, longitude] = array
    const url = `https://www.polleninformation.at/api/forecast/public?country=${countryCode}&lang=${locale}&latitude=${latitude}&longitude=${longitude}&apikey=${import.meta.env.VITE_POLLEN_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok')
      };
    return response.json();
}




export function getLocationFromAPI(userId, callback) {
    return async res => {
            const { name, mapbox_id, context, coordinates } = res.features[0].properties;
            const location = {
                countryCode: context.country.country_code,
                countryName: context.country.name,
                city: name,
                placeId: mapbox_id,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                timestamp: new Date()
            };

            //update user location to DB
            await updateUserLocation(location, userId);

            //fetch pollen data given the location
            const arrToFetch = [context.country.country_code, coordinates.latitude, coordinates.longitude] 
            const pollenData = fetchPollen('en', arrToFetch);

            //push pollen data to DB
            await updateUserPollen(pollenData, userId);
            callback();
        }
}