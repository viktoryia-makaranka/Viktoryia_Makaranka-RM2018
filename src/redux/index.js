import { combineReducers } from 'redux'
import moviesReducer from './movies/reducer'
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
  movies: moviesReducer,
  routing: routerReducer
})

export default rootReducer