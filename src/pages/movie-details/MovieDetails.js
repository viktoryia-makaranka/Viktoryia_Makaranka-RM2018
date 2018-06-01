import React, { Component } from 'react'
import { connect } from 'react-redux'

import MOVIES_API from '../../redux/movies/actions'

import Movies from '../../components/movies/Movies'

class MovieDetails extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  async componentDidMount() {
    await this.props.getMovieById(this.props.match.params.id)
    const genre = this.props.currentMovie.genres && this.props.currentMovie.genres.length ? this.props.currentMovie.genres[0] : ''
    await this.props.getSameGenreMovies({ genre, currentMovie : this.props.currentMovie })
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      await this.props.getMovieById(nextProps.match.params.id)
      const genre = this.props.currentMovie.genres && this.props.currentMovie.genres.length ? this.props.currentMovie.genres[0] : ''
      await this.props.getSameGenreMovies({ genre, currentMovie : this.props.currentMovie })
    }
  }

  render() {
    return (<div className="movie-details">
        {
          this.props.currentMovie && (
            <div className="movie-details__wrapper">
              <div className="container">
                <div className="wrapper">
                  <div className="movie-details__image flex-1">
                    <img src={ this.props.currentMovie.poster_path || '' }/>
                  </div>
                  <div className="movie-details__info flex-2">
                    <div className="flex">
                      <div className="movie-details__title">{ this.props.currentMovie.title || '' }</div>
                      <div className="movie-details__raiting">{ this.props.currentMovie.vote_average || 0 }</div>
                    </div>
                    <div className="movie-details__genres">{ this.props.currentMovie.genres && this.props.currentMovie.genres.length ? this.props.currentMovie.genres.join(' & ') : '' }</div>
                    <div className="movie-details__time">
                      <div className="movie-details__year">{ this.props.currentMovie.release_date ? new Date(this.props.currentMovie.release_date).getFullYear() : '' }</div>
                      <div className="movie-details__min">{ this.props.currentMovie.runtime || 0 } min</div>
                    </div>
                    <div className="movie-details__overview">{ this.props.currentMovie.overview || '' }</div>
                  </div>
                </div>
              </div>
              {
                this.props.sameGenreMovies && this.props.sameGenreMovies.length &&
                (<div className="container related-movies">
                  <Movies movies={ this.props.sameGenreMovies }
                          showSorting={ false }
                          info={`Films by ${ this.props.currentMovie.genres[0] } genre`}/>
                </div>)
              }
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({ movies }) => ({
  currentMovie: movies.currentMovie,
  sameGenreMovies: movies.sameGenreMovies,
  searchParams: movies.searchParams
})

const mapDispatchToProps = dispatch => ({
  getMovieById(id) {
    dispatch(MOVIES_API.getMovieById(id))
  },
  getSameGenreMovies(params) {
    dispatch(MOVIES_API.getSameGenreMovies(params))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)

import './movie-details.scss'