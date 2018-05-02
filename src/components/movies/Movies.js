import React, { Component } from 'react'

import Movie from '../movie/Movie'

const Movies = ({ movies }) => {
  const moveiesList = movies.map((movie) =>
    <Movie key={ movie.id } movie={ movie }/>
  )
  return (
      <div className="movies-list">
        { moveiesList }
      </div>
  )
}

export default Movies

import './movies.scss'
