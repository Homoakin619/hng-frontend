
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
  id
}: MovieProp) {

  
  return (
    // <a href={"/"+id} key={title}>
      <div className="movie-card" role="button" key={title} id={""+id}>
        <img alt={title} src={image} className="card-image" />
        <div className="card-footer">
          <span className="country bolder">{country}</span>
          <h3 className="movie-title bolder">{title}</h3>
          <div className="rating-container">
            <div>
              <img src="/assets/icons/imdb.svg" alt="" />
              <span>{rating} / 100</span>
            </div>
            <div>
              <img src="/assets/icons/tomato.svg" alt="" />
              <span>{(rating * 10) }%</span>
            </div>
          </div>
          <span className="genre bolder">{genre}</span>
        </div>
      </div>
    //   </a> 
  );
}
