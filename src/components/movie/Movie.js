import React from 'react'

const Movie = ({ movie: { poster_path, release_date, genres, title }}) => (
  <div className="movie-card">
    <img src={ poster_path }/>
    <div className="movie-card__info">
      <div className="movie-card__title-row">
        <div className="movie-card__title">{ title }</div>
        <div className="movie-card__year">{ new Date(release_date).getFullYear() }</div>
      </div>
      <div className="movie-card__ganres">{ genres.join(' & ') }</div>
    </div>
  </div>
)

export default Movie

import './movie.scss'