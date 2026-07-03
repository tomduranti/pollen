export default function getLocationFromAPI(wrapperFunction) {
    return (
        res => {
            wrapperFunction({
                country: res.features[0].properties.context.country.country_code,
                placeId: res.features[0].properties.mapbox_id,
                latitude: res.features[0].properties.coordinates.latitude,
                longitude: res.features[0].properties.coordinates.longitude,
                timestamp: new Date()
            })
        })
}