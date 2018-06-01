import 'isomorphic-fetch'

export const SET_MOVIES = 'setMovies'
export const CHANGE_CURRENT_MOVIE = 'changeCurrentMovie'
export const CHANGE_SEARCH_BY = 'changeSearchBy'
export const CHANGE_SORT_BY = 'changeSortBy'
export const CHANGE_SEARCH_TEXT = 'changeSearchText'
export const SET_SAME_GENRE_MOVIES = 'setSameGenreMovies'

const MOVIES_API = {
  getMovies: (params) => (dispatch) => {
    const url = Object.keys(params).reduce((res, key) => `${res}&${key}=${params[key]}`, 'https://react-cdp-api.herokuapp.com/movies?limit=100')
    return fetch(url)
      .then(res => res.json())
      .then(movies => {
        dispatch({
          type: SET_MOVIES,
          movies: movies.data
        })
        dispatch({
          type: CHANGE_CURRENT_MOVIE,
          movie: movies.data[0]
        })
      })
  },

  getMovieById: (id) => (dispatch) => {
    const url = `http://react-cdp-api.herokuapp.com/movies/${id}`
    return fetch(url)
      .then(res => res.json())
      .then(async movie => {
        await dispatch({
          type: CHANGE_CURRENT_MOVIE,
          movie: movie
        })
        return Promise.resolve()
      })
  },

  getSameGenreMovies: ({ genre, currentMovie }) => (dispatch) => {
    const url = `https://react-cdp-api.herokuapp.com/movies?limit=100&searchBy=genres&search=${genre}`
    return fetch(url)
      .then(res => res.json())
      .then(movies => {
        const sameGenreMovies = movies.data.filter(movie => currentMovie.id !== movie.id)
        dispatch({
          type: SET_SAME_GENRE_MOVIES,
          sameGenreMovies: sameGenreMovies
        })
        return Promise.resolve()
      })
  },

  changeSearchBy: searchBy => ({
    type: CHANGE_SEARCH_BY,
    searchBy
  }),

  changeSortBy: (sortBy) => ({
    type: CHANGE_SORT_BY,
    sortBy
  }),

  changeSearchText: searchText => ({
    type: CHANGE_SEARCH_TEXT,
    searchText
  }),

  changeCurrentMovie: movie => ({
    type: CHANGE_CURRENT_MOVIE,
    movie
  })
}

export default MOVIES_API