//react and components
import { SearchBox } from "@mapbox/search-js-react";

//functions
import getLocationFromAPI from "./SearchBar.js";

export default function SearchBar({ defaultOrUserLocale, userDataForSearchWrapper }) {

  return (
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
  );
}
