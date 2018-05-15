import React from 'react'

import Movies from '../movies/Movies'

const MovieDetails = ({ movies,
                        currentMovie,
                        searchText,
                        searchBy,
                        onChangeCurrentMovie }) => {
  const currentIndex = movies.indexOf(currentMovie)
  let moviesArray = [...movies]
  moviesArray.splice(currentIndex, 1)
  return (<div className="movie-details">
      <div className="movie-details__wrapper">
        <div className="container">
          <div className="wrapper">
            <div className="movie-details__image flex-1">
              <img src={ currentMovie.poster_path }/>
            </div>
            <div className="movie-details__info flex-2">
              <div className="flex">
                <div className="movie-details__title">{ currentMovie.title }</div>
                <div className="movie-details__raiting">{ currentMovie.vote_average }</div>
              </div>
              <div className="movie-details__genres">{ currentMovie.genres.join(' & ') }</div>
              <div className="movie-details__time">
                <div className="movie-details__year">{ new Date(currentMovie.release_date).getFullYear() }</div>
                <div className="movie-details__min">{ currentMovie.runtime } min</div>
              </div>
              <div className="movie-details__overview">{ currentMovie.overview }</div>
            </div>
          </div>
        </div>
        {
          moviesArray.length &&
          (<div className="container related-movies">
            <Movies movies={ moviesArray }
                  showSorting={ false }
                  onChangeCurrentMovie={ onChangeCurrentMovie }
                  info={`Films by ${ searchText } ${ searchBy }`}/>
          </div>)
        }
      </div>
    </div>
  )
}

export default MovieDetails

import './movie-details.scss'