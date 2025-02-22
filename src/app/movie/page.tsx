import GenreMovieList from "@/components/GenreMovieList";
import Slider from "@/components/Slider";
import { FC } from "react";

const MoviesPage: FC = () => {
    return (
        <div>
            <Slider />
            <GenreMovieList />
        </div>
    );
};

export default MoviesPage;
