

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

export function getGenres(genres: number[]): string {
  let gen = genres.map((genre_id: number) => genreMaps[genre_id])
  return gen.join(", ")
}

const genreMaps :{[key: number]: string} = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
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