//react and components
import { useState } from 'react';
import { Link } from 'react-router';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { LoaderCircle } from 'lucide-react';

//functions
import getCurrentHour from '../../utils/getCurrentHour.js';
import usePollenSync from './usePollenSync.js';

//css
import 'react-circular-progressbar/dist/styles.css';

export default function Home({ defaultOrUserLocale, userId }) {

    const [pollenData, setPollenData] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [userLocation, setUserLocation] = useState({ city: '', countryName: '' });
 
    usePollenSync(userId, defaultOrUserLocale, pollenData, setPollenData, setIsLoading, setUserLocation);

    // 1) if userId is undefined: auth is checking the value, showing a loading state
    if (userId === undefined || isLoading) return <LoaderCircle className="animate-spin m-auto" color="#2E7D57E6" size={42} />;
    //filter only active pollens to display
    const filteredPollenList = pollenData?.map(item => {
        return item.contamination?.map(subitem => {
            //filter only relevant pollen results
            return (subitem.contamination_1 >= 1
                ? (
                    <li key={subitem.poll_id} className="flex flex-col gap-1">
                        <span className="first-letter:capitalize text-sm font-normal">{subitem.poll_title}</span>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${(subitem.contamination_1 / 4) * 100}%` }}
                            />
                        </div>
                    </li>
                )
                : null
            )
        });
    });

    const activePollen = filteredPollenList[0]?.filter(item => item !== null).length;

    return (
        <>
            {pollenData?.length > 0
                ? (
                    <section className='flex flex-col gap-5 md:place-self-center md:max-w-lg md:w-full'>
                        <Link to='/location' className='flex gap-1.5'>
                            <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className='font-medium text-sm'>{userLocation?.city}, ({userLocation?.countryName})</span>
                        </Link>

                        <svg style={{ height: 0 }}>
                            <defs>
                                <linearGradient id="riskGradient" gradientUnits="userSpaceOnUse" x1="50" y1="10" x2="10" y2="45">
                                <stop offset="0%" stopColor="#2E7D57" />
                                <stop offset="25%" stopColor="#5B903B" />
                                <stop offset="50%" stopColor="#D99B26" />
                                <stop offset="75%" stopColor="#D9531E" />
                                <stop offset="100%" stopColor="#DC2626" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div style={{ width: 200, height: 200, margin: '0 auto' }}>
                            <CircularProgressbar
                                value={pollenData[0].allergyrisk_hourly?.allergyrisk_hourly_1[getCurrentHour()]}
                                maxValue={10}
                                text={
                                    <tspan dy="2">
                                      <tspan style={{ fontSize: '28px', fontWeight: 'medium', fill: '#12171F' }}>
                                        {pollenData[0].allergyrisk_hourly?.allergyrisk_hourly_1[getCurrentHour()]}
                                      </tspan>
                                      <tspan style={{ fontSize: '12px', fontWeight: 'normal', fill: '#6B7280' }}>
                                        /10
                                      </tspan>
                                    </tspan>
                                  }
                                circleRatio={0.75}
                                styles={buildStyles({
                                    rotation: 1 / 2 + (1 - 0.75) / 2,
                                    pathColor: 'url(#riskGradient)', // Reference your gradient ID here
                                    trailColor: '#EDE9FE',
                                    textColor: '#6B7380',
                                    textSize: '22px',
                                    pathTransitionDuration: 1.5,
                                })}
                                />
                        </div>

                        <h2 className='text-[0.938rem] font-semibold'>{activePollen}/20 active {activePollen === 1 ? 'pollen' : 'pollens'}</h2>
                        <ul className='flex flex-col gap-3 md:place-self-start md:w-[80%]'>{filteredPollenList}</ul>
                    </section>
                )
                : null
            }
        </>
    )
}