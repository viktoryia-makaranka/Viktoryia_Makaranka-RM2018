import React, { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSearchByParam: props.searchByParams && props.searchByParams.length ? props.searchByParams[0] : '',
      searchText: ''
    }
  }

  render() {
    return (
      <form className="search" onSubmit={ (e) => {
        e.preventDefault()
        if (this.state.activeSearchByParam) {
          this.props.onSubmitHandler(this.state.searchText, this.state.activeSearchByParam)
        } else {
          this.props.onSubmitHandler(this.state.searchText)
        }
      }}>
        <div className="container">
          <div className="search__header">netflixroulette</div>
          { this.props.title &&
          <div className="search__title">{ this.props.title }:</div>
          }
          <input type="text"
                 className="search__input"
                 placeholder={ this.props.placeholder || '' }
                 onChange={ (e) => { this.setState({ ...this.state, searchText: e.target.value }) }}/>
          <div className="search__controls">
            <div className="search__search-by">
              { this.props.searchByParams &&
              <div className="search__search-by">
                <div className="search__search-by-title">search by</div>
                {
                  this.props.searchByParams.map((searchFilter, index) =>
                    <div className={`search__search-by-item${ this.state.activeSearchByParam === searchFilter ? ' search__search-by-item--active' : ''}`}
                         key={ index }
                         onClick={ () => { this.setState({ activeSearchByParam: searchFilter }) }}>{ searchFilter }</div>
                  )
                }
              </div>
              }
            </div>
            <input className="search__button" type="submit" value={ this.props.buttonText || "search" } />
          </div>
        </div>
      </form>
    )
  }
}

import './search.scss'