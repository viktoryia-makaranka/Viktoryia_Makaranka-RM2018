import React, { Component } from 'react'

import Movie from '../movie/Movie'
import Sort from '../sort/Sort'

import { SortContext } from '../../index.js'

const Movies = ({ movies, sortChangeHandler, activeSortItem, info, showSorting, onChangeCurrentMovie }) => {

  // help to check ErrorBoundary
  // throw new Error('something went wrong')

  const moviesList = movies.map((movie) => {
      return (<Movie onChangeCurrentMovie={ onChangeCurrentMovie } key={ movie.id } movie={ movie }/>)
  })

  const sortData = [{
    name: 'release date',
    val: 'release_date'
  }, {
    name: 'rating',
    val: 'vote_average'
  }]

  return (
    <div className="movies">
      <div className="movies__controls">
        <div className="container">
          <div className="movies__controls-wrapper">
            <div className="movies__info">{ info }</div>
            {
              showSorting && <Sort sortData={ sortData } onSortChange={ sortChangeHandler } activeItem={ activeSortItem }/>
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
