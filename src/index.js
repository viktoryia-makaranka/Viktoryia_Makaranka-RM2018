import React from 'react'
import ReactDOM from 'react-dom'

import Movies from './components/movies/Movies'
import Search from './components/search/Search'
import Footer from './components/footer/Footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
    this.getResults = this.getResults.bind(this)
  }

  async getResults(text, searchBy) {
    const res = await fetch(`https://react-cdp-api.herokuapp.com/movies?limit=100${text ? `&search=${text}` : ''}${searchBy ? `&searchBy=${searchBy}` : ''}`)
    const movies = await res.json()
    this.setState({
      movies: movies.data
    })
    return false
  }

  render() {
    return (
      <div className="app-wrapper">
        <Search title="find your movie" searchByParams={['title', 'genres']} onSubmitHandler={ this.getResults }/>
        <div className="content">
          {
            this.state.movies.length ?
              (<Movies movies={ this.state.movies } />) :
              (<div className="no-results">No films found</div>)
          }
        </div>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

import './main.scss'

