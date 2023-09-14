

export async function fetchTopMovies() {
    
    const url = 'https://api.themoviedb.org/3/movie/top_rated';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      }
    };
    
    const data = await fetch(url, options);
    const result: fetchProps = await data.json()
    return result.results.slice(0,10)
}


export async function fetchSingleMovie(movie_id: string) : Promise<MovieProp[]>{
    const url = `https://api.themoviedb.org/3/movie/${movie_id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      }
    };
    
    const data = await fetch(url, options);
    const result: fetchProps = await data.json()
    return result.results
}

type MovieProp ={
  backdrop_path: '/gwj4R8Uy1GwejKqfofREKI9Jh7L.jpg',
  genre_ids: number[],
  id: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}