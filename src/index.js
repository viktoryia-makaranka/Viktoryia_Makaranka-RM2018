import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

import App from './components/App'
import Films from './pages/Films'
import MovieDetails from './pages/movie-details/MovieDetails'
import NotFound from './pages/not-found/NotFound'

const Root = ({ Router, location = null, context = null, store }) => (

   <Provider store={ store }>
    <Router location={ location } context={ context }>
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
)

export default hot(module)(Root)

import './main.scss'
