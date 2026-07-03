//react and components
import { useState, useEffect } from "react";

//functions
import getPollenFromAPI from "./PollenDashboard.js";
import getTimeDifference from "../../../utils/getTimeDifference.js";
import getCurrentHour from "../../../utils/getCurrentHour.js";

//for dev only
import mockData from "./pollenMockData.json";

export default function PollenDashboard({
  defaultOrUserLocale,
  userDataForSearchArray,
}) {
  const [pollenData, setPollenData] = useState([]);
  let [previousPlace, setPreviousPlace] = useState({});

  const pollenList = mockData.map(item => {
    return item.contamination.map(subitem => {
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
      {/* {pollenData.length > 0
      ? <ul>{pollenList}</ul>
      : null
      } */}
      <span>Current allergy risk: {mockData[0].allergyrisk_hourly.allergyrisk_hourly_1[getCurrentHour()]}/10</span>
      <ul>{pollenList}</ul>
    </>
  );
}
