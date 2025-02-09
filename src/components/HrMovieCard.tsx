import Image from 'next/image';
import Link from 'next/link';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Movie {
    id: number;
    backdrop_path: string;
    title: string;
}

function HrMovieCard({ movie }: { movie: Movie }) {
return (
    <section className='hover:scale-110 transition-all duration-150 ease-in'>
        <Link href={`/movie/${movie.id}`}>
    <Image 
        src={IMAGE_BASE_URL + movie.backdrop_path} 
        alt={movie.title} 
        width={260} 
        height={146} 
        className='w-[110px] md:w-[260px] rounded-lg hover:border-[3px] border-gray-400 cursor-pointer'
        />
        <h2 className='w-[110px] md:w-[260px] text-white mt-2'>{movie.title}</h2>
        </Link>
    </section>
);
}

export default HrMovieCard;