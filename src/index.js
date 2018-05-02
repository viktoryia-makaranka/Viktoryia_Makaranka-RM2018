import React from 'react'
import ReactDOM from 'react-dom'

import Movies from './components/movies/Movies'
import MovieDetails from './components/movie-details/MovieDetails'
import Search from './components/search/Search'
import Footer from './components/footer/Footer'
import ErrorBoundary from './components/error/Error'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      searchBy: 'title',
      sortBy: 'release_date',
      searchText: '',
      currentMovie: {}
    }
    this.getResults = this.getResults.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.sortChangeHandler = this.sortChangeHandler.bind(this)
    this.onChangeCurrentMovie = this.onChangeCurrentMovie.bind(this)
  }

  async getResults(text, searchBy, sortBy) {
    const res = await fetch(`https://react-cdp-api.herokuapp.com/movies?limit=100${text ? `&search=${text}` : ''}${searchBy ? `&searchBy=${searchBy}` : ''}${searchBy ? `&sortBy=${sortBy}` : ''}&sortOrder=desc`)
    const movies = await res.json()
    this.setState((state) => ({
      ...state,
      movies: movies.data,
      currentMovie: movies.data[0]
    }))
  }

  onChangeCurrentMovie(newVal) {
    this.setState((state) => ({
      ...state,
      currentMovie: newVal
    }))
  }

  async onSubmitHandler(text, searchBy) {
    await this.setState((state) => ({
      ...state,
      searchText: text,
      searchBy: searchBy
    }))
    this.getResults(this.state.searchText, this.state.searchBy, this.state.sortBy)
  }

   async sortChangeHandler(newVal)  {
    await this.setState((state) => ({
      ...state,
      sortBy: newVal
    }))
    this.getResults(this.state.searchText, this.state.searchBy, this.state.sortBy)
  }


render() {
    return (
      <div className="app-wrapper">
        <ErrorBoundary>
          <Search title="find your movie"
                  searchByParams={['title', 'genres']}
                  onSubmitHandler={ this.onSubmitHandler }/>
          <div className="content">
            {
              this.state.movies.length ?
                (<div className="wrapper">
                  <div className="flex-1">
                    <Movies movies={ this.state.movies }
                            sortChangeHandler={ this.sortChangeHandler }
                            info={`${ this.state.movies.length } movies found`}
                            onChangeCurrentMovie={ this.onChangeCurrentMovie }
                            activeSortItem={ this.state.sortBy }/>
                  </div>
                  <div className="flex-1">
                    <MovieDetails onChangeCurrentMovie={ this.onChangeCurrentMovie }
                                  movies={ this.state.movies }
                                  currentMovie={ this.state.currentMovie }
                                  searchText={ this.state.searchText }
                                  searchBy={ this.state.searchBy }/>
                  </div>
                </div>) :
                (<div className="no-results container">No films found</div>)
            }
          </div>
        </ErrorBoundary>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

import './main.scss'

