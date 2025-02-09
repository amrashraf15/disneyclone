"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Image from "next/image";
import { api } from "../../lib/GlobalAPI";
import Link from "next/link";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Movie {
    id: number;
    backdrop_path: string;
    title?: string;
    name?: string;
}

function Slider() {
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getTrendingMovies();
    }, []);

    const getTrendingMovies = async () => {
        const resp = await api.getTrendingVideos();
        if (resp && resp.results) {
            setMovieList(resp.results);
        }
    };

    const sliderRight = () => {
        elementRef.current?.scrollBy({ left: 500, behavior: "smooth" });
    };

    const sliderLeft = () => {
        elementRef.current?.scrollBy({ left: -500, behavior: "smooth" });
    };

    return (
        <div className="relative w-full">
            {/* Left Arrow */}
            <HiChevronLeft
                className="hidden md:block text-white text-[30px] absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 bg-black/50 rounded-full p-2"
                onClick={sliderLeft}
            />

            {/* Right Arrow */}
            <HiChevronRight
                className="hidden md:block text-white text-[30px] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 bg-black/50 rounded-full p-2"
                onClick={sliderRight}
            />

            {/* Movie Slider */}
            <div
                className="flex overflow-x-auto w-full scrollbar-hidden scroll-smooth px-16 py-4"
                ref={elementRef}
            >
            {movieList.map((item, index) => (
        <div key={index} className="relative group min-w-full md:h-[500px] mr-5 rounded-md overflow-hidden">
            {/* Movie Image */}
            <Image
                src={IMAGE_BASE_URL + item.backdrop_path}
                alt={item.title || item.name || "Movie"}
                width={1280}
                height={720}
                quality={100}
                className="w-full h-full object-cover object-left-top rounded-md transition-all duration-200 ease-in-out hover:border-[4px] border-gray-400"
            />

            {/* Dark Overlay (Appears on Hover) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* View Details Button */}
            <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition-all duration-300">
                <Link href={`/movie/${item.id}`} className="bg-transparent text-white px-4 py-2 border-[2px] rounded-full shadow-lg cursor-pointer">
                    View Details
                </Link>
            </div>
        </div>
    ))}
            </div>
        </div>
    );
}

export default Slider;

