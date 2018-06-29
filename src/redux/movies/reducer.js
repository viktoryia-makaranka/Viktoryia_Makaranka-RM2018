import { SET_MOVIES, CHANGE_CURRENT_MOVIE, CHANGE_SEARCH_BY, CHANGE_SEARCH_TEXT, CHANGE_SORT_BY, SET_SAME_GENRE_MOVIES } from './actions'

const initialState = {
  movies: [],
  currentMovie: {},
  sameGenreMovies: [],
  searchParams: {
    search: '',
    searchBy: 'title',
    sortBy: 'release_date',
    sortOrder: 'desc',
    filter: []
  },
  sortData: [{
    name: 'release date',
    val: 'release_date'
  }, {
    name: 'rating',
    val: 'vote_average'
  }],
  searchByParams: ['title', 'genres']
}

export default (state = initialState, action) => {
  const searchParams = {
    ...initialState.searchParams,
    ...state.searchParams
  }
  state = {
    ...initialState,
    ...state,
    searchParams
  }

  switch (action.type) {
    case SET_MOVIES: {
      return ({
        ...state,
        movies: action.movies
      })
    }

    case SET_SAME_GENRE_MOVIES: {
      return ({
        ...state,
        sameGenreMovies: action.sameGenreMovies
      })
    }

    case CHANGE_CURRENT_MOVIE: {
      return ({
        ...state,
        currentMovie: action.movie
      })
    }

    case CHANGE_SEARCH_BY: {
      return ({
        ...state,
        searchParams: {
          ...state.searchParams,
          searchBy: action.searchBy
        }
      })
    }

    case CHANGE_SORT_BY: {
      return ({
        ...state,
        searchParams: {
          ...state.searchParams,
          sortBy: action.sortBy
        }
      })
    }

    case CHANGE_SEARCH_TEXT: {
      return ({
        ...state,
        searchParams: {
          ...state.searchParams,
          search: action.searchText
        }
      })
    }

    default:
      return state
  }
}
