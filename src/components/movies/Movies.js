import React, { Component } from 'react'

import Movie from '../movie/Movie'
import Sort from '../sort/Sort'

const Movies = ({ movies = [], info = '', showSorting = false }) => {

  const moviesList = movies.map((movie) => {
      return (<Movie key={ movie.id } movie={ movie }/>)
  })

  return (
    <div className="movies">
      <div className="movies__controls">
        <div className="container">
          <div className="movies__controls-wrapper">
            <div className="movies__info">{ info }</div>
            {
              showSorting && (<Sort />)
            }
          </div>
        </div>
      </div>
      <div className="container">
        <div className="movies__list">{ moviesList }</div>
      </div>
    </div>
  )
}


export default Movies

import './movies.scss'
