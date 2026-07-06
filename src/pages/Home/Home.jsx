//react and components
import { SearchBox } from "@mapbox/search-js-react";
import { useState, useEffect } from "react";
import Loading from '../../components/atoms/Loading/Loading.jsx';

//functions
import { getLocationFromAPI, getPollenFromAPI } from "./Home.js";
import getCurrentHour from "../../utils/getCurrentHour.js";

export default function Home({ defaultOrUserLocale, userDataForSearchWrapper, userDataForSearchArray }) {

    const [pollenData, setPollenData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        //early return to prevent crash from empty object
        if (Object.entries(userDataForSearchArray).length === 0) return;
        setIsLoading(true);
        getPollenFromAPI(defaultOrUserLocale, userDataForSearchArray, setPollenData)
            .then(() => {
                setIsLoading(false);
            })
    }, [userDataForSearchArray]);

    const pollenList = pollenData.map(item => {
        return item.contamination?.map(subitem => {
            //filter only relevant pollen results
            return (subitem.contamination_1 >= 1
                ? (
                    <li key={subitem.poll_id}>
                        <span>
                            {subitem.poll_title}: {subitem.contamination_1}
                        </span>
                    </li>
                )
                : null
            )
        });
    });

    return (
        <>
            <div>
                <SearchBox
                    accessToken={`${import.meta.env.VITE_SEARCH_API_KEY}`}
                    options={{
                        language: defaultOrUserLocale,
                        country: "AT,CH,DE,ES,FR,GB,IT,LV,LT,PL,SE,TR,UA",
                        types: "city",
                    }}
                    placeholder='Search a location'
                    onRetrieve={getLocationFromAPI(userDataForSearchWrapper)}
                />
            </div>

            {isLoading
                ? <Loading />
                : pollenData.length > 0
                    ? (
                        <section>
                            <div>{userDataForSearchArray.city}, ({userDataForSearchArray.countryName})</div>
                            <div>Current allergy risk: {pollenData[0]?.allergyrisk_hourly.allergyrisk_hourly_1[getCurrentHour()]}/10</div>
                            <ul>{pollenList}</ul>
                        </section>
                    )
                    : null
            }
        </>
    )
}