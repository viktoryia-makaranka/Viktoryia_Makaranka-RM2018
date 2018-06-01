import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import MOVIES_API from '../../redux/movies/actions'

class Search extends Component {
  constructor(props, context) {
    super(props, context)
  }

  async componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const searchText = params.get('searchText')
    if (searchText) {
      await this.props.changeSearchText(searchText)
      this.props.getMovies(this.props.searchParams)
    }
  }

  async componentWillReceiveProps(nextProps) {
    const params = new URLSearchParams(this.props.location.search)
    const newParams = new URLSearchParams(nextProps.location.search)

    if (newParams.get('searchText') !== params.get('searchText')) {
      await this.props.changeSearchText(params.get('searchText'))
      this.props.getMovies(nextProps.searchParams)
    }
  }

  render() {
    return (
      <form className="search" onSubmit={ (e) => {
        e.preventDefault()
        this.props.history.push(`/films?searchText=${this.props.searchParams.search}`)
      }}>
        <div className="container">
          <div className="search__header">netflixroulette</div>
          { this.props.title &&
          <div className="search__title">{ this.props.title }:</div>
          }
          <input type="text"
                 className="search__input"
                 placeholder={ this.props.placeholder || '' }
                 onChange={ (e) => { this.props.changeSearchText(e.target.value) }}/>
          <div className="search__controls">
            <div className="search__search-by">
              { this.props.searchByParams &&
              <div className="search__search-by">
                <div className="search__search-by-title">search by</div>
                {
                  this.props.searchByParams.map((searchFilter, index) =>
                    <div className={`search__search-by-item${ this.props.searchParams.searchBy === searchFilter ? ' search__search-by-item--active' : ''}`}
                         key={ index }
                         onClick={ () => { this.props.changeSearchBy(searchFilter) }}>{ searchFilter }</div>
                  )
                }
              </div>
              }
            </div>
            <input className="search__button" type="submit" value={ this.props.buttonText || "search" } />
          </div>
        </div>
      </form>
    )
  }
}
const mapStateToProps = ({ movies }) => ({
  movies: movies.movies,
  searchParams: movies.searchParams,
  searchByParams: movies.searchByParams,
  currentMovie: movies.currentMovie
})

const mapDispatchToProps = dispatch => ({
  getMovies(params) {
    dispatch(MOVIES_API.getMovies(params))
  },
  changeSearchBy(newVal) {
    dispatch(MOVIES_API.changeSearchBy(newVal))
  },
  changeSearchText(newVal) {
    dispatch(MOVIES_API.changeSearchText(newVal))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))

import './search.scss'