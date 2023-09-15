"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getGenres } from "@/util";

type Param = {
  promise: Promise<MovieProp[]>;
  user: string;
};

export default function Features({ promise }: Param) {
  const baseLink = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState<MovieProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let query = await promise;
      setMovies(query);
      console.log(query);
    };
    fetchData();
  }, []);
  const content = movies.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        image={baseLink + movie.poster_path}
        id={movie.id}
        country={movie.release_date}
        title={movie.title}
        rating={movie.vote_average}
        genre={getGenres(movie.genre_ids)}
      />
    );
  });
  return (
    <>{movies.length ? <>{content}</> : 
    <div className="d-flex justify-content-center flex-column align-items-center w-100">
      <div className="custom-loader"></div>
      <h4>Fetching Movies</h4>
    </div>}</>
  );
}
