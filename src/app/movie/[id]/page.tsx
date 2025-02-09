"use client"; // Required for hooks in Next.js (when using Server Components)

import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "../../../../lib/GlobalAPI";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Genre {
    id: number;
    name: string;
}

interface Movie {
    id: number;
    title: string;
    name: string;
    backdrop_path: string;
    overview: string;
    genres: Genre[];
    budget: number;
    origin_country: string;
}

interface MovieDetailsProps {
    params: { id: string };
}

const MoviePage = ({ params }: MovieDetailsProps) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await api.getMovieById(Number(params.id));
            setMovie(data);

            // Check if movie is in watchlist
            const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
            setIsInWatchlist(watchlist.some((item: Movie) => item.id === data.id));
        };

        fetchMovie();
    }, [params.id]);

    const toggleWatchlist = () => {
        if (!movie) return;

        let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

        if (isInWatchlist) {
            // Remove from watchlist
            watchlist = watchlist.filter((item: Movie) => item.id !== movie.id);
        } else {
            // Add to watchlist
            watchlist.push(movie);
        }

        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        setIsInWatchlist(!isInWatchlist);
    };

    if (!movie) {
        return <h1 className="text-center text-red-500">Movie not found!</h1>;
    }

    return (
        <div className="container mx-auto px-4 py-10 text-white">
            <Link href="/" className="absolute top-6 left-2"><ArrowLeftCircle /></Link>
            <h1 className="text-4xl font-bold text-center">{movie.title || movie.name}</h1>

            <div className="flex items-center flex-col md:flex-row">
                <div className="flex-1">
                    <Image
                        src={IMAGE_BASE_URL + movie.backdrop_path}
                        alt={movie.title || movie.name}
                        width={1280}
                        height={720}
                        className="rounded-lg mt-4"
                    />
                </div>
                <p className="mt-4 text-lg px-8 flex-1">{movie.overview}</p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 md:gap-8 flex-wrap">
                <h2 className="text-xl font-semibold">
                    <ul className="flex gap-4">
                        {movie.genres.map((genre: Genre) => (
                            <li key={genre.id} className="mr-2 text-[16px] border-[2px] rounded-full px-3 py-2">
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </h2>
                <h2>Budget: {movie.budget.toLocaleString()}</h2>
                <h2>Country: {movie.origin_country}</h2>
            </div>

            {/* Watchlist Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={toggleWatchlist}
                    className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
                        isInWatchlist ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
                    }`}
                >
                    {isInWatchlist ? "✔ Added to Watchlist" : "➕ Add to Watchlist"}
                </button>
            </div>
        </div>
    );
};

export default MoviePage;

