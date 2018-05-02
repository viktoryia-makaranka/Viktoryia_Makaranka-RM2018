import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    console.log(error, info)
  }

  render() {
    return (<div className="content">
      {
        this.state.hasError ? (<div className="no-results container">Something went wrong</div>) : (this.props.children)
      }
    </div>)
  }
}