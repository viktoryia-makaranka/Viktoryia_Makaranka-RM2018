import React from 'react'
import { Link } from 'react-router-dom'

const Movie = ({ movie = {} }) => (
  <Link to={`/film/${movie.id}`} className="movie-card">
    <img src={ movie.poster_path }/>
    <div className="movie-card__info">
      <div className="movie-card__title-row">
        <div className="movie-card__title">{ movie.title }</div>
        <div className="movie-card__year">{ new Date(movie.release_date).getFullYear() }</div>
      </div>
      <div className="movie-card__ganres">{ movie.genres.join(' & ') }</div>
    </div>
  </Link>
)

export default Movie

import './movie.scss'