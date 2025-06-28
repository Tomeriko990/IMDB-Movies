import { useState,useEffect  } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard'
import { MovieDiscription } from './components/MovieDiscription.jsx'
import { useDebounce } from 'react-use'


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const  App=()=>{
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [debouncedSeledctedMovie, setDebouncedSeledctedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null);


  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])
 

  const fetchMovies=async(query='')=>{
    setIsLoading(true);
    try{
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
      const response = await fetch(endpoint);
      
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovieList(data.results);
      console.log(data.results); 
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const fetchMovieDetailes=async(movieId)=>{
    try{
      const respone = await fetch(`${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);

      if (!respone.ok) throw new Error("Failed to fetch movie");

      const data=await respone.json();
      setSelectedMovie(data);
      console.log(data); 
    }catch (error) {
      console.error("Error fetching movie detailes:", error);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  
  
  return(
    <main>

      <div className='pattern'/>

      <div className='wrapper'>

      {selectedMovie ? (
        <section className="selected-movie">
          {/* <button onClick={() => setSelectedMovie(null)} className="mb-4 underline cursor-pointer text-purple-400">
            ← Back to results
          </button>
          <h2 className="text-3xl font-bold mb-2">{selectedMovie.title}</h2>
          <p className="mb-4">{selectedMovie.overview}</p>
          <img
            src={
              selectedMovie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`
                : '/no-movie.png'
            }
            alt={selectedMovie.title}
            className="rounded mb-4"
          />
          <p>🎬 Released: {selectedMovie.release_date}</p>
          <p>⭐ Rating: {selectedMovie.vote_average}</p>
          <p>🌐 Language: {selectedMovie.original_language}</p> */
          <MovieDiscription movie={selectedMovie} onBack={() => setSelectedMovie(null)}/>
          }
        </section>
      ) : (
        <>
          <header>
            <img src="../hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies </span>
              You'll Enjoy Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className='all-movies'>
            <h2>All Movies</h2>

            {isLoading ? (
              <Spinner />
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => fetchMovieDetailes(movie.id)} />
                ))}
              </ul>
            )}
          </section>
        </>
      )}

        
      </div>

    </main>
   
  )
}
  


export default App
