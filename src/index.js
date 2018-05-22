import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from './redux/index'

import Main from './components/main/main'
import Search from './components/search/Search'
import Footer from './components/footer/Footer'
import ErrorBoundary from './components/error/Error'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={ store }>
        <div className="app-wrapper">
          <ErrorBoundary>
            <Search title="find your movie" />
            <Main />
          </ErrorBoundary>
          <Footer />
        </div>
      </Provider>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('root') || document.createElement('div'))

import './main.scss'
