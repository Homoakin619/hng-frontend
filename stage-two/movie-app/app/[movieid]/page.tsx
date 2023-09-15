"use client";
import SideNavbar from "@/components/SideNavbar";
import React, { useEffect, useState } from "react";
import { fetchSingleMovie } from "@/util";

type Param = {
  params: {
    movieid: string;
  };
};

export default function MovieDetail({ params: { movieid } }: Param) {
  const [movie, setMovie] = useState<MovieProp | null>(null);
  const [directors,setDirectors] = useState('')
  const [stars,setStars] = useState('')
  const [writer,setWriters] = useState('')
  const [isFound, setIsFound] = useState(true);

  const getRuntime = (time:number) => {
    const min = time % 60;
    const hour = Math.floor(time / 60)
    return `${hour}h ${min}m`
  }
  

  useEffect(() => {
    const fetchMovie = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieid}`;
      const detailUrl = `https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };
      const data = await fetch(url, options);
      const result: MovieProp = await data.json();
      const res = await fetch(detailUrl,options);
      const details = await res.json()
      const crewList = details.crew
      let starsList = details.cast.splice(0,3)
      
      let star = starsList.map((star: {[key: string]: string}) => (star.name))
      star = star.join(', ')
      
      const Director = crewList.filter((person: {[key: string]: string}) => person.job == 'Director');
      
      const writersList = crewList.filter((person: {[key: string]: string}) => person.department == 'Writing').splice(0,3)
      const Writers = writersList.map((writer: {[key: string]: string}) => writer.name)      
      const writer = Writers.join(", ")

      setDirectors(Director[0].name);
      setStars(star);
      setWriters(writer)
      
      if (data.status == 200) {
        setMovie(result);
      } else {
        setIsFound(false);
      }
    };
    fetchMovie();
  }, []);

  return (
    <>
      <SideNavbar />
      {movie ? (
        <div className="detail-container">
          {/* <div className="player"> */}
          <div className="player-container">
            <img
              id="player"
              src={process.env.NEXT_PUBLIC_IMAGE_LINK + movie.backdrop_path}
              alt=""
            />
            <img id="play-btn" src="/assets/icons/player.svg" alt="" />
          </div>

          <div className="labels">
            <div className="left-label">
              <span className="vid-title bold">{movie.title}</span>
              <span className="vid-title bold">•</span>
              <span className="vid-title bold">{new Date(movie.release_date).getFullYear()}</span>
              <span className="vid-title bold">•</span>
              <span className="vid-title bold">{movie.adult ? "PG-18" : "PG-13"  }</span>
              <span className="vid-title bold">•</span>
              <span className="vid-title bold mr-2">{getRuntime(movie.runtime)}</span>
              {movie.genres.map((genre) => (
                <span className="genre-btn medium">{genre.name}</span>
              ))}
            </div>
            <div className="right-label">
              <img src="/assets/icons/star.svg" alt="" />
              <span className="l-grey medium">
                {movie?.vote_average?.toFixed(1)}
              </span>
              <span className="d-grey medium"> | {movie.runtime}k</span>
            </div>
          </div>
          <div className="details-segment">
            <div className="left-segment">
              <span className="description">{movie.overview}</span>
              <div className="about-section">
                <p className="about-item">
                  Directors :
                  <span className="red-text">&nbsp;{directors}</span>
                </p>
                <p className="about-item">
                  Writers :
                  <span className="red-text">
                    &nbsp;{writer}
                  </span>
                </p>
                <p className="about-item">
                  Stars :
                  <span className="red-text">
                    &nbsp;{stars}
                  </span>
                </p>
              </div>
              <div className="top-rated">
                <button className="rated-btn white bold">
                  Top rated movie #65
                </button>
                <input
                  className="rating-input"
                  placeholder="Awards 9 nominations"
                  type="text"
                />
                <img id="drop" src="/assets/icons/dropdown.svg" alt="dropdown" />
              </div>
            </div>
            <div className="right-segment">
              <div className="ticket white">
                <img src="/assets/icons/ticket.svg" alt="" />
                <span>See Showtimes</span>
              </div>
              <div className="more-opt">
                <img src="/assets/icons/list.svg" alt="" />
                <span>More watch options </span>
              </div>

              <div className="more-movies">
                <div className="label-tag">
                  <img src="/assets/icons/list2.svg" alt="" />
                  <span>The Best Movies and Shows in September</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !isFound ? (
        <div className="error-container">
          <div className="error-space">
            <img src="/404.svg" alt="not-found image" />
            <span className="error-text bold">Movie not Found</span>
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <div className="custom-loader"></div>
        </div>
      )}
    </>
  );
}
