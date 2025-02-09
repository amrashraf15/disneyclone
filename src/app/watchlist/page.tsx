"use client"; 

import MovieCard from "@/components/MovieCard";
import {  ArrowLeftCircle, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";


interface Movie {
    id: number;
    title: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);

    useEffect(() => {
        // Get the watchlist from local storage
        const storedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
        setWatchlist(storedWatchlist);
    }, []);

    const removeFromWatchlist = (movieId: number) => {
        const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    };

    return (
        <div className="container mx-auto px-4 py-10 text-white">
            <h1 className="text-4xl font-bold text-center mb-6">My Watchlist</h1>
            <Link href="/" className="absolute top-6 left-2"><ArrowLeftCircle /></Link>

            {watchlist.length === 0 ? (
                <p className="text-center text-gray-400">Your watchlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watchlist.map((movie) => (
                        <div key={movie.id} className="relative group">
                            <MovieCard movie={movie} />
                            {/* Remove Button */}
                            <button
                                onClick={() => removeFromWatchlist(movie.id)}
                                className="absolute bg-red-600 top-0  text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition"
                            >
                            <X/>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;
