
import tvGenresList from "@/Constants/SeriesList";
import MovieList from "./MovieList";

const GenreSeriesList = () => {
    return (
        <div>
            {tvGenresList.map((item, index) => index <= 4 && (
                <div key={item.id}> 
                    <h2 className="font-bold text-[20px] text-white">{item.name}</h2>
                    <MovieList genreId={item.id} index_={index} />
                </div>
            ))}
        </div>
    );
};

export default GenreSeriesList;
