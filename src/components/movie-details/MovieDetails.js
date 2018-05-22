import React, { Component } from 'react'
import { connect } from 'react-redux'

import MOVIES_API from '../../redux/movies/actions'

import Movies from '../movies/Movies'

const MovieDetails = ({ sameGenreMovies,
                        currentMovie,
                        searchParams }) => {
  const currentIndex = sameGenreMovies.indexOf(currentMovie)
  let moviesArray = [...sameGenreMovies]
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
              <div className="movie-details__genres">{ currentMovie.genres ? currentMovie.genres.join(' & ') : '' }</div>
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
                    info={`Films by ${ searchParams.search } ${ searchParams.searchBy }`}/>
          </div>)
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ movies }) => ({
  currentMovie: movies.currentMovie,
  sameGenreMovies: movies.sameGenreMovies,
  searchParams: movies.searchParams
})

export default connect(mapStateToProps)(MovieDetails)

import './movie-details.scss'