import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch, Redirect } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from './redux/index'

import App from './components/App'
import Films from './pages/Films'
import MovieDetails from './pages/movie-details/MovieDetails'
import NotFound from './pages/not-found/NotFound'

const history = createHistory({
  base: '/'
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, routerMiddleware(history))
)

ReactDOM.render((
  <Provider store={ store }>
    <Router history={ history }>
      <App>
        <Switch>
          <Redirect exact from="/" to="/films" />
          <Route path="/films" component={ Films }/>
          <Route path="/film/:id" component={ MovieDetails } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('root') || document.createElement('div'))

import './main.scss'
