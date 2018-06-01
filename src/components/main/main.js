import React from 'react'
import { connect } from 'react-redux'

import Movies from '../movies/Movies'


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
        </div>) :
        (<div className="no-results container">No films found</div>)
    }
  </div>
)

const mapStateToProps = ({ movies }) => ({
  movies: movies.movies
})

export default connect(mapStateToProps)(Main)
