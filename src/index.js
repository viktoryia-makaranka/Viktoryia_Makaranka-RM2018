import React from 'react'
import ReactDOM from 'react-dom'

import PureComponent from './components/pure-component'
import FunctionComponent from './components/function-component'
import Divider from './components/create-element-component'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React App by Vika</h1>
        <Divider/>
        <Divider/>
        <h2>Main part with React.Component</h2>
        <Divider/>
        <PureComponent/>
        <Divider/>
        <FunctionComponent/>
        <Divider/>
        <h6>* divider - is a React.CreateElement component</h6>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))