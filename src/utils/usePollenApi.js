export async function getPollenFromAPI(locale, array, wrapper, setError) {
    const url = `https://www.polleninformation.at/api/forecast/public?country=${array.countryCode}&lang=${locale}&latitude=${array.latitude}&longitude=${array.longitude}&apikey=${import.meta.env.VITE_POLLEN_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json()
        //stores the result in an array
        .then(response => {
            wrapper([response]);
            setError('');
        })
    } catch (error) {
        if (error) setError(error.message);
    }
}