import genresList from "@/Constants/GenresList";
import MovieList from "./MovieList";

const GenreMovieList = () => {
    return (
        <div>
            {genresList.map((item, index) => index <= 4 && (
                <div key={item.id}> 
                    <h2 className="font-bold text-[20px] text-white">{item.name}</h2>
                    <MovieList genreId={item.id} index_={index} />
                </div>
            ))}
        </div>
    );
};

export default GenreMovieList;
