//react
import SearchLocation from '@atoms/SearchLocation/SearchLocation.jsx';
import { useContext } from 'react';
import { AuthContext } from '@context/context.js';

export default function Location({ defaultOrUserLocale }) {
    const [userId] = useContext(AuthContext);

    return (
        <section className='md:mx-auto md:max-w-lg md:w-full'>
            <SearchLocation locale={defaultOrUserLocale} userId={userId} />
        </section>
    );
}