
import Features from '@/components/Features';
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { fetchTopMovies } from '@/util'
import { Suspense } from 'react';

export default async function Home() {
  const movies: Promise<MovieProp[]> =  fetchTopMovies();
  const movieArray = await movies;
  return (
    <>
    <Navigation />
    <main className="body-container">
      <div className="featured-heading">
        <span id='featured' className='bolder'>Featured Movie</span>
        
        <span id='see-more'> <span>See more</span> <img src="/assets/icons/right.svg" alt="" /> </span>
      </div>
      <div className="featured-container">
      <Suspense fallback={<h3>Loading ...</h3>}>
          <Features user="user" promise={movies} />
        </Suspense>
      </div>
    </main>
    <Footer />
    
      <script src="/test.js"></script>
    </>
  )
}
