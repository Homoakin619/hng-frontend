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

  useEffect(() => {
    const fetchMovie = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieid}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };
      const data = await fetch(url, options);
      const result: MovieProp = await data.json();
      console.log(result);

      setMovie(result);
    };
    fetchMovie();
    console.log(movie);
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
              <span className="vid-title bolder">{movie?.title}</span>
              {movie.genres.map((genre) => (
                <span className="genre-btn medium">{genre.name}</span>
              ))}

              
            </div>
            <div className="right-label">
              <img src="/assets/icons/star.svg" alt="" />
              <span className="l-grey medium">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="d-grey medium"> | 350k</span>
            </div>
          </div>
          <div className="details-segment">
            <div className="left-segment">
              <span className="description">{movie.overview}</span>
              <div className="about-section">
                <p className="about-item">
                  Directors :{" "}
                  <span className="red-text">&nbsp;Joseph Kosinski</span>{" "}
                </p>
                <p className="about-item">
                  Writers :
                  <span className="red-text">
                    &nbsp;Jim Cash, Jack Epps Jr, Peter Craig
                  </span>
                </p>
                <p className="about-item">
                  Stars :
                  <span className="red-text">
                    &nbsp;Tom Cruise, Jennifer Connelly, Miles Teller
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
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
