"use client";
import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import HrMovieCard from "./HrMovieCard";
import { api } from "../../lib/GlobalAPI";

interface Movie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    name?: string;
}

interface MovieListProps {
    genreId: number;
    index_: number;
}

function MovieList({ genreId, index_ }: MovieListProps) {
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getMovieByGenreId(); // ✅ No need for fetchData()
    }, [genreId]);

    const getMovieByGenreId = async () => {
        try {
            const resp = await api.getMovieByGenreId(genreId);
            console.log("Fetched data:", resp); // ✅ Debugging line
            if (!resp || !resp.results) {
                console.warn("No results found in response", resp);
                return;
            }
            setMovieList(resp.results);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    };

    const sliderRight = () => {
        elementRef.current?.scrollBy({ left: 500, behavior: "smooth" });
    };

    const sliderLeft = () => {
        elementRef.current?.scrollBy({ left: -500, behavior: "smooth" });
    };

    return (
        <div className="relative">
            <IoChevronBackOutline
                onClick={sliderLeft}
                className={`text-[50px] text-white p-2 z-10 cursor-pointer hidden md:block absolute 
                    ${index_ % 3 === 0 ? "mt-[80px]" : "mt-[150px]"}`}
            />

            <div ref={elementRef} className="flex overflow-x-auto gap-8 scrollbar-hidden scroll-smooth pt-4 px-3 pb-4">
                {movieList.map((item) =>
                    index_ % 3 === 0 ? (
                        <HrMovieCard key={item.id} movie={item} /> // ✅ Added `key={item.id}`
                    ) : (
                        <MovieCard key={item.id} movie={item} /> // ✅ Added `key={item.id}`
                    )
                )}
            </div>

            <IoChevronForwardOutline
                onClick={sliderRight}
                className={`text-[50px] text-white hidden md:block p-2 cursor-pointer z-10 top-0 absolute right-0 
                    ${index_ % 3 === 0 ? "mt-[80px]" : "mt-[150px]"}`}
            />
        </div>
    );
}

export default MovieList;
