
import Footer from '@/components/Footer'
import MovieCard from '@/components/MovieCard'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <>
    <Navigation />
    <main className="body-container">
      <div className="featured-heading">
        <span id='featured' className='bold'>Featured Movie</span>
        
        <span id='see-more'> <span>See more</span> <img src="/assets/icons/right.svg" alt="" /> </span>
      </div>
      <div className="featured-container">
        <MovieCard image='/movie.jpg' country='USA, 2016 - Current' title='Walking Dead' rating='90%' genre='Action' />
        <MovieCard image='/movie.jpg' country='Nigeria' title='Spider' rating='90%' genre='Action' />
        <MovieCard image='/movie.jpg' country='Nigeria' title='Spider' rating='90%' genre='Action' />
        <MovieCard image='/movie.jpg' country='Nigeria' title='Spider' rating='90%' genre='Action' />
      </div>
    </main>
    <Footer />
    </>
  )
}
