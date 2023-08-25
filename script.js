/*async function getTodo(){
    const response=await fetch("C:\Users\melat\Desktop\bootstraportfolio\package-lock.json");
    const data =await response.json()
    console.log(data)

}*/
//compy file from rapid api

/*async function getMovie()
{
    let response= await fetch(url,options)
    let data= await response.json()
    let movieTitle=data.data[0]
    console.log(movieTitle)
    movelist.map((movie)=>{
        console.log(movie.l)
    })

}
getMovie()*/
const API_KEY ="api_key=c6b4bbeb0054a58fcc2dcd9202e69e16";
const BASE_URL="https://api.themoviedb.org/3/";
const API_URL=BASE_URL+"/discover/movie?sort_by*popularity.desc&"+API_KEY;
const IMG_URL="https://image.tmdb.org/t/p/w500";
const SEARCH_URL=BASE_URL+'/search/movie?'+API_KEY;
const main=document.querySelector('.main');
const form=document.getElementById('form');
const search=document.getElementById('search');
getMovies(API_URL);
function getMovies(url)
{
    fetch(url).then(res =>res.json()).then(data =>{
        console.log(data.results);
        showMovies(data.results);

    })
}
function showMovies(data)
{    
    main.innerHTML='';
    data.forEach(movie => {
        
        const{title,poster_path,vote_average,overview}=movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h1>${title}</h1>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h1>Overview</h1>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    })
   
}
function getColor(vote) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange';
    } else {
      return 'red';
    }
  }
  form.addEventListener('submit',(e)=>
  {
    e.preventDefault();
    const searchterm=search.value;
    if(searchterm)
    {
        getMovies(SEARCH_URL+"&query= "+searchterm);
    }
    else{
        getMovies(API_URL);
    }

  })