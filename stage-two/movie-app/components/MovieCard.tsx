"use client";

import { useState } from "react";

type MovieProp = {
  image: string;
  country: string;
  genre: string;
  title: string;
  rating: number;
  id: number;
};

export default function MovieCard({
  image,
  country,
  genre,
  title,
  rating,
  id,
}: MovieProp) {
  const [like, setLike] = useState(false);

  const movieClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = (event.target as HTMLDivElement).id;
    window.location.href = `${window.location.origin}/${id}`;
  };

  const handleLike = (event: React.MouseEvent<HTMLDivElement>) => {  
    let _id = "d"+id;
    let love = document.getElementById(_id);
    
    if (!like) {
      love?.setAttribute('fill','#be123c');
      setLike(true)
    } else {
      love?.setAttribute('fill','#D1D5DB')
      setLike(false)
    }
    event.stopPropagation();
  };

  return (
    <div
      data-testid="movie-card"
      className="movie-card"
      role="button"
      key={title}
      id={"" + id}
      onClick={movieClick}
    >
      <img
        data-testid="movie-poster"
        alt={title}
        src={image}
        className="card-image"
      />
      <div className="card-footer">
        <span className="country bolder">
          USA,{" "}
          <span data-testid="movie-release-date">
            {new Date(country).getFullYear()}
          </span>{" "}
        </span>
        <h3 data-testid="movie-title" className="movie-title bolder">
          {title}
        </h3>
        <div className="rating-container">
          <div>
            <img src="/assets/icons/imdb.svg" alt="" />
            <span>{rating} / 100</span>
          </div>
          <div>
            <img src="/assets/icons/tomato.svg" alt="" />
            <span>{rating * 10}%</span>
          </div>
        </div>
        <span className="genre bolder">{genre}</span>
      </div>
      <div className="like" onClick={handleLike}>
        <img id="circle" src="/assets/icons/ellipse.svg" alt="" />
        {/* <div className="svg-container"> */}
          <svg 
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path id={"d"+id}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.17157 5.48284C4.73367 3.96185 7.26633 3.96185 8.82842 5.48284L9.99999 6.62359L11.1716 5.48284C12.7337 3.96185 15.2663 3.96185 16.8284 5.48284C18.3905 7.00383 18.3905 9.46984 16.8284 10.9908L9.99999 17.6396L3.17157 10.9908C1.60948 9.46984 1.60948 7.00383 3.17157 5.48284Z"
              fill="#D1D5DB"
            />
          </svg>
        {/* </div> */}
      </div>
    </div>
  );
}
