type fetchProps = {
    page: number, 
    results: any, 
    total_pages: number, 
    total_results: number
  }

type MovieProp ={
    adult: boolean
    runtime: number,
    backdrop_path: string,
    genre_ids: number[],
    genres: any[],
    id: number,
    overview: string,
    popularity: number,
    production_countries: any[],
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

type MovieDetailProp ={
    backdrop_path: string,
    genre_ids: any[],
    id: number,
    overview: string,
    popularity: number,
    production_countries: any[],
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}