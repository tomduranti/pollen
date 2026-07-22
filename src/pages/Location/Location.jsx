//react and components
import { useNavigate } from "react-router";
import { SearchBox } from '@mapbox/search-js-react';
import { getLocationFromAPI } from './useLocationApi.js';

export default function Location({ defaultOrUserLocale, userId }) {
    //if the user sets a location, this is saved in DB and the user is redirected to /home to see the results
    const navigate = useNavigate();

    return (
        <section className='md:place-self-center md:max-w-lg md:w-full'>
            <SearchBox
                theme={{
                    cssText: `
                .Input {
                    height: 2.938rem;
                    border-radius: 1.875rem;
                }
                .ResultsAttribution {
                    display: none;
                }
                .Suggestion {
                    padding-inline-start: 1.875rem;
                }
                .ResultsList {
                    padding-block: 1.25rem;
                }
                .SuggestionName {
                    color: #12171F;
                    font-size: 0.875rem;
                }
                .SuggestionDesc {
                    color: #6B7280;
                    font-size: 0.875rem;
                }
              `,
                    variables: {
                        colorPrimary: '#6B7280',
                        colorBackground: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        borderRadius: '1.875rem',
                        border: '1px solid #E3E8ED',
                        boxShadow: 'none',
                    },
                }}
                accessToken={`${import.meta.env.VITE_SEARCH_API_KEY}`}
                options={{
                    language: defaultOrUserLocale,
                    country: 'AT,CH,DE,ES,FR,GB,IT,LV,LT,PL,SE,TR,UA',
                    types: 'city',
                }}
                placeholder='Search a location'
                onRetrieve={getLocationFromAPI(userId, () => navigate('/'))}
            />
        </section>
    )
}