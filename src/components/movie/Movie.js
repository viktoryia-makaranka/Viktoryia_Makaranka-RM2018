import React from 'react'
import { connect } from 'react-redux'

import MOVIES_API from '../../redux/movies/actions'

const Movie = ({ movie = {}, changeCurrentMovie, getSameGenreMovies, currentMovie }) => {
  const onChangeCurrentMovie = () => {
    changeCurrentMovie(movie)
  }

  if (movie === currentMovie) {
    getSameGenreMovies(movie.genres[0])
  }

  return (
    <div className="movie-card" onClick={ onChangeCurrentMovie }>
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

const mapStateToProps = ({ movies }) => ({
  currentMovie: movies.currentMovie
})

const mapDispatchToProps = dispatch => ({
  changeCurrentMovie(movie) {
    dispatch(MOVIES_API.changeCurrentMovie(movie))
  },
  getSameGenreMovies(genre) {
    dispatch(MOVIES_API.getSameGenreMovies(genre))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Movie)

import './movie.scss'