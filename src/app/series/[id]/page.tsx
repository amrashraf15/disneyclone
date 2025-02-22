"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation"; // ✅ Correct way to access params in Client Components
import { api } from "../../../../lib/GlobalAPI";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Genre {
    id: number;
    name: string;
}

interface Series {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string;
    overview: string;
    genres: Genre[];
    origin_country?: string[]; // ✅ Fix: TMDB provides an array
    vote_average?: number; // ✅ Added as a budget alternative
    popularity?: number; // ✅ Added to replace budget
}

const SeriesPage = () => {
    const params = useParams(); // ✅ Fix: Use useParams() instead of direct `params`
    const [series, setSeries] = useState<Series | null>(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        if (!params?.id) return; // ✅ Ensure `params.id` exists before fetching

        const fetchSeries = async () => {
            try {
                const data = await api.getSeriesById(Number(params.id));
                setSeries(data);

                // ✅ Fix: Ensure watchlist exists before checking
                const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
                setIsInWatchlist(watchlist.some((item: Series) => item.id === data.id));
            } catch (error) {
                console.error("Error fetching series:", error);
            }
        };

        fetchSeries();
    }, [params?.id]); // ✅ Ensure dependency exists before using

    const toggleWatchlist = () => {
        if (!series) return;

        let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

        if (isInWatchlist) {
            // ✅ Remove from watchlist
            watchlist = watchlist.filter((item: Series) => item.id !== series.id);
        } else {
            // ✅ Add to watchlist
            watchlist.push(series);
        }

        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        setIsInWatchlist(!isInWatchlist);
    };

    if (!series) {
        return <h1 className="text-center text-red-500">Series not found!</h1>;
    }

    return (
        <div className="container mx-auto px-4 py-10 text-white">
            {/* Back Button */}
            <Link href="/" className="absolute top-6 left-2">
                <ArrowLeftCircle className="w-10 h-10 text-gray-300 hover:text-white transition" />
            </Link>

            {/* Title */}
            <h1 className="text-4xl font-bold text-center">{series.title || series.name}</h1>

            {/* Image & Overview */}
            <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1">
                    <Image
                        src={IMAGE_BASE_URL + series.backdrop_path}
                        alt={series.title || series.name || "Series"}
                        width={1280}
                        height={720}
                        className="rounded-lg mt-4"
                    />
                </div>
                <p className="mt-4 text-lg px-8 flex-1">{series.overview}</p>
            </div>

            {/* Genres & Info */}
            <div className="mt-4 flex items-center justify-center gap-4 md:gap-8 flex-wrap">
                {/* Genres */}
                <h2 className="text-xl font-semibold">
                    <ul className="flex gap-4">
                        {series.genres.map((genre) => (
                            <li key={genre.id} className="mr-2 text-[16px] border-[2px] rounded-full px-3 py-2">
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </h2>

                {/* Country (Fix for array) */}
                {series.origin_country && (
                    <h2>Country: {series.origin_country.join(", ")}</h2>
                )}

                {/* Vote Average & Popularity */}
                {series.vote_average !== undefined && <h2>Rating: ⭐ {series.vote_average}/10</h2>}
                {series.popularity !== undefined && <h2>Popularity: {series.popularity.toFixed(0)}</h2>}
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

export default SeriesPage;
