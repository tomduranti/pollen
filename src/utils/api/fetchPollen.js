export async function fetchPollen(locale, array) {
  const baseUrl = new URL(
    'https://www.polleninformation.at/api/forecast/public',
  );
  baseUrl.searchParams.set('country', array.countryCode);
  baseUrl.searchParams.set('lang', locale);
  baseUrl.searchParams.set('latitude', array.latitude);
  baseUrl.searchParams.set('longitude', array.longitude);
  baseUrl.searchParams.set('apikey', import.meta.env.VITE_POLLEN_API_KEY);

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
