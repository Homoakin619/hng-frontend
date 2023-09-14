
const banner = document.querySelector('#ban');
const title = document.querySelector('.banner-title');
const desc = document.querySelector('.banner-text')



// const rating = document.querySelector('')

const pointers = document.querySelectorAll('.slider-btn')


const clearActive = (input) => {
    for(let i = 0; i < pointers.length; i++) {
        if(i != input) {
            pointers[i].classList.remove('active');
        }
    }
}

async function getMovies() {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        }
    };

   const data = await fetch('/api/movies', options)
   const result = await data.json();
   return result
}

let i = 0;

 const slider = (array) =>{
    console.log('Starting Slider');
    if(i < array.length) {
        banner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/original${array[i].backdrop_path}')`
        title.innerHTML = array[i].title
        desc.innerHTML = array[i].overview
        clearActive(i)
        pointers[i].classList.add('active')
        i++;
    }else {
        i = 0;
        banner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/original${array[i].backdrop_path}')`;
        title.innerHTML = array[i].title
        desc.innerHTML = array[i].overview
        clearActive(i);
        pointers[i].classList.add('active');
    }
}

// window.onload = setInterval(slider,5000);
window.addEventListener('load',async () => {
    
    let movies = await getMovies()
    let moviesArray = movies.data.slice(0,5)
    banner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/original${moviesArray[0].backdrop_path}')`;
    const intVal = setInterval(()=> {
        const movieCards = document.querySelectorAll('.movie-card');
        if (movieCards.length) {
            for (let i = 0; i < movieCards.length; i++) {
                console.log(movieCards[i]);
                movieCards[i].addEventListener('click',(event) => {
                    let id = event.target.id;
                    window.location.href = `${window.location.origin}/${id}`;
                })
            }
            clearInterval(intVal)
        } else {console.log('not ready');}
    },1000)
    setInterval(() => {slider(moviesArray)},10000);

})
// banner.style.backgroundImage = "url('https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg')"