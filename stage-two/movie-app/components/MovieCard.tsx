import Image from "next/image";

type MovieProp = {
  image: string;
  country: string;
  genre: string;
  title: string;
  rating: string;
};

export default function MovieCard({
  image,
  country,
  genre,
  title,
  rating,
}: MovieProp) {
  return (
    <div className="movie-card">
      <img alt="" src={image} className="card-image" />
      <div className="card-footer">
        <span className="country bold">{country}</span>
        <h3 className="movie-title bold">{title}</h3>
        <div className="rating-container">
          <div>
            <img src="/assets/icons/imdb.svg" alt="" />
            <span>86.0 / 100</span>
          </div>
          <div>
            <img src="/assets/icons/tomato.svg" alt="" />
            <span>97%</span>
          </div>
        </div>
        <span className="genre bold">{genre}</span>
      </div>
    </div>
  );
}
