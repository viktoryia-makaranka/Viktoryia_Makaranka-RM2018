import * as React from 'react'

import ErrorBoundary from './error/Error'
import Footer from './footer/Footer'


export default class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <ErrorBoundary>
          { this.props.children }
        </ErrorBoundary>
        <Footer />
      </div>
    )
  }
}