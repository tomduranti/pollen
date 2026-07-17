import { updateUserPollen, updateUserLocation } from '../../firebase/readAndWrite.js';

export function getLocationFromAPI(userSign, callback) {
    return (
        res => {
            const favouriteLocation = {
                countryCode: res.features[0].properties.context.country.country_code,
                countryName: res.features[0].properties.context.country.name,
                city: res.features[0].properties.name,
                placeId: res.features[0].properties.mapbox_id,
                latitude: res.features[0].properties.coordinates.latitude,
                longitude: res.features[0].properties.coordinates.longitude,
                timestamp: new Date()
            }

            return (
                updateUserLocation(favouriteLocation, userSign),
                updateUserPollen(null, userSign)
            )
                .then(() => {
                    callback();
                })
        })
}