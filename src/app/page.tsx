import GenreMovieList from "@/components/GenreMovieList";
import Navbar from "@/components/Navbar";
import ProductionHouse from "@/components/ProductionHouse";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <ProductionHouse/>
      <GenreMovieList/>

    </div>
  );
}
