export function getLocationObject(res) {
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

    return location;
}