//react
import SearchLocation from '@atoms/SearchLocation/SearchLocation.jsx';

export default function Location({ defaultOrUserLocale, userId }) {
    return (
        <section className='md:mx-auto md:max-w-lg md:w-full'>
            <SearchLocation locale={defaultOrUserLocale} userId={userId} />
        </section>
    );
}