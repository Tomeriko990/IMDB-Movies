import React from 'react'

export const MovieDiscription = ({ movie, onBack }) => {
    if (!movie) return null;
    return (
        <div className="min-h-screen bg-trasperent text-white px-4 py-8">
          {/* Back Arrow Button */}
          <div className="w-full flex justify-start mb-4 absolute top-[2rem] left-[2rem]">
            <button
              onClick={() => (onBack ? onBack() : window.location.reload())}
              className="hover:opacity-80 transition"
            >
              <img
                src="arrow-back.svg"
                alt="Back"
                className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
              />
            </button>
          </div>
    
          {/* Title */}
          <h1 className="text-gradient md:text-5xl font-bold text-center mb-8">
            {movie.title}
          </h1>
    
          {/* Poster image */}
          <div className="flex justify-center mb-8">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "/no-movie.png"
              }
              alt={movie.title}
              className="w-full max-w-md md:max-w-lg lg:max-w-2xl rounded-lg shadow-2xl object-cover"
            />
          </div>
    
          {/* Movie Details */}
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Release Date:</span>{" "}
              {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
            </p>
            <p className="text-gray-300 ">
              <span className="font-semibold text-white">Rating:</span>{" "}
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}{" "}<img className='w-5 h-auto object-cover inline-block align-center' src="star.svg" alt="Star Icon"/>
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Genres:</span>{" "}
              {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
            </p>
    
            <p className="text-lg mt-6 text-gray-200 leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>
      );
    };