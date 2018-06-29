import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../redux'

export default (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware))
}
