import React from 'react'

const Movie = ({ movie, onChangeCurrentMovie }) => {
  const changeCurrentMovie = () => { onChangeCurrentMovie(movie) }
  return (
    <div className="movie-card" onClick={ changeCurrentMovie }>
      <img src={ movie.poster_path }/>
      <div className="movie-card__info">
        <div className="movie-card__title-row">
          <div className="movie-card__title">{ movie.title }</div>
          <div className="movie-card__year">{ new Date(movie.release_date).getFullYear() }</div>
        </div>
        <div className="movie-card__ganres">{ movie.genres.join(' & ') }</div>
      </div>
    </div>
  )
}

export default Movie

import './movie.scss'