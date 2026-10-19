//react and components
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useState, useEffect } from 'react';

import ErrorForMain from '@atoms/ErrorForMain/ErrorForMain.jsx';
import Loading from '@atoms/Loading/Loading.jsx';
import LocationLink from '@atoms/LocationLink/LocationLink.jsx';
import ProgressBar from '@atoms/ProgressBar/ProgressBar.jsx';
import { AuthContext } from '@context/context.js';

//functions
import { fetchPollen, readUserLocation } from '@utils/index.js';

const activePollens = (arr) => {
  return arr.map((item) => {
    return (
      <li key={item.poll_id} className='flex flex-col gap-1'>
        <span className='first-letter:capitalize text-sm font-normal'>
          {item.poll_title}
        </span>
        <div className='w-full h-3 bg-gray-200 rounded-full overflow-hidden'>
          <div
            className='h-full bg-primary rounded-full transition-all'
            style={{ width: `${(item.contamination_1 / 4) * 100}%` }}
          />
        </div>
      </li>
    );
  });
};

export default function Home({ defaultOrUserLocale }) {
  const [userLocation, setUserLocation] = useState();
  const [userId] = useContext(AuthContext);

  //read city coordinates from DB. We can assume that location is always set because Home is a protected route.
  useEffect(() => {
    readUserLocation(userId).then((data) => setUserLocation(data));
  }, [userId]);

  //fetch pollen data and hydrates it every 4 hours. No pollen data is pushed to the DB
  const { isPending, data } = useQuery({
    queryKey: ['pollens', [defaultOrUserLocale, userLocation]],
    queryFn: () => fetchPollen(defaultOrUserLocale, userLocation),
    enabled: !!userLocation,
    refetchInterval: 14400000, // Refetch the data every 4 hours
  });

  if (isPending) return <Loading />;
  if (data.error) return <ErrorForMain />; // technically, this is not an error but must be caught this way because the https status is always 200.

  const filteredResults = data?.contamination.filter(
    (item) => item.contamination_1 >= 1,
  );

  return (
    <section className='flex flex-col gap-5 md:mx-auto md:max-w-lg md:w-full'>
      <LocationLink location={userLocation} />
      <ProgressBar dataFromApi={data} />
      <h2 className='text-[0.938rem] font-semibold'>
        {filteredResults.length}/20 active{' '}
        {filteredResults.length === 1 ? 'pollen' : 'pollens'}
      </h2>
      <ul className='flex flex-col gap-3 md:place-self-start md:w-[80%]'>
        {activePollens(filteredResults)}
      </ul>
    </section>
  );
}
