import React from 'react'
import { connect } from 'react-redux'

import Movies from '../movies/Movies'
import MovieDetails from '../movie-details/MovieDetails'


const Main = ({ movies }) => (
  <div className="content">
    {
      (movies && movies.length) ?
        (<div className="wrapper">
          <div className="flex-1">
            <Movies movies={ movies }
                    showSorting={ true }
                    info={`${ movies.length } movies found`}/>
          </div>
          <div className="flex-1">
            <MovieDetails />
          </div>
        </div>) :
        (<div className="no-results container">No films found</div>)
    }
  </div>
)

const mapStateToProps = ({ movies }) => ({
  movies: movies.movies
})

export default connect(mapStateToProps)(Main)
