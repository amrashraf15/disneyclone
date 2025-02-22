import axios from "axios";

const movieBaseURL = "https://api.themoviedb.org/3";
const api_key = "456b2aa286818a7e2ef36d4f295a21d7";
const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=456b2aa286818a7e2ef36d4f295a21d7';
const TvByGenreBaseURL='https://api.themoviedb.org/3/discover/tv?api_key=456b2aa286818a7e2ef36d4f295a21d7';
const movieByIdURL='https://api.themoviedb.org/3/movie';
//https://api.themoviedb.org/3/discover/movie
//https://api.themoviedb.org/3/movie/939243?api_key=456b2aa286818a7e2ef36d4f295a21d7

export const api = {
    getTrendingVideos: async () => {
    try {
    const response = await axios.get(
        `${movieBaseURL}/trending/all/day?api_key=${api_key}&language=en-US`
        );
      return response.data; // Return the data
    } catch (error) {
        console.error("Error fetching trending videos:", error);
      return null; // Handle errors gracefully
    }
},
getTopRatedSeries: async () => {
  try {
  const response = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US`
      );
    return response.data; // Return the data
  } catch (error) {
      console.error("Error fetching trending videos:", error);
    return null; // Handle errors gracefully
  }
},
    getMovieByGenreId:async(id:number)=>{  
      try {
        const response = await axios.get(
            `${movieByGenreBaseURL}&with_genres=${id}&language=en-US`
            );
          return response.data; // Return the data
        } catch (error) {
            console.log("Error fetching movies by genre:", error);
          return {}; 
        }   
  },
  getSeriesByGenreId:async(id:number)=>{  
    try {
      const response = await axios.get(
          `${TvByGenreBaseURL}&with_genres=${id}&language=en-US`
          );
        return response.data; // Return the data
      } catch (error) {
          console.log("Error fetching movies by genre:", error);
        return {}; 
      }   
},
  getMovieById:async(id:number)=>{  
    try {
      const response = await axios.get(
          `${movieByIdURL}/${id}?api_key=${api_key}`
          );
        return response.data; // Return the data
      } catch (error) {
          console.log("Error fetching movies by genre:", error);
        return {}; 
      }   
  },
  getSeriesById:async(id:number)=>{  
    try {
      const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`
          );
        return response.data; // Return the data
      } catch (error) {
          console.log("Error fetching movies by genre:", error);
        return {}; 
      }   
  },

};