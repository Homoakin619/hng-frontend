"use client"
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard";

type Param = {
    promise: Promise<MovieProp[]>;
    user: string
  };

export default function Features({promise}: Param) {
    const baseLink = 'https://image.tmdb.org/t/p/original'
    
    const [movies,setMovies] = useState<MovieProp[]>([]);
    
    useEffect(() => {
        const fetchData = async()=> {
           let query = await promise;
           setMovies(query)
           
        }
        fetchData()
        
      },[])
    const content = movies.map((movie) => {
        return (
            <MovieCard key={movie.id} image={baseLink + movie.poster_path} id={movie.id} country='USA, 2016 - Current' title={movie.title} rating={movie.vote_average} genre='' />
        )
    })
  return (

    <>
    {movies.length ? (
      <>
      <div className="featured-container">
        {content}
      </div>
      
      </>
    ) : (
      <h3>There are no Movies to show</h3>
    )}
    
  </>
        
  )
}