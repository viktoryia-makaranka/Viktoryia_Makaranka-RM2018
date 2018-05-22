import React from 'react'
import { connect } from 'react-redux'

import MOVIES_API from '../../redux/movies/actions'

const Sort = ({ sortData, sortTitle = 'Sort by', changeSortBy, searchParams, getMovies }) => {
  const sortingMap = sortData.map(sortItem => {
    const changeHandler = () => {
      changeSortBy(sortItem.val)
      getMovies({ ...searchParams, sortBy: sortItem.val })
    }
    return (
      <div className={`sorting__controls-item${ searchParams.sortBy === sortItem.val ? ' sorting__controls-item--active' : ''}`} onClick={ changeHandler } key={ sortItem.val }>{ sortItem.name }</div>
    )
  })
  return (<div className="sorting">
    <div className="sorting__title">{ sortTitle }</div>
    <div className="sorting__controls">
      { sortingMap }
    </div>
  </div>
  )
}

const mapStateToProps = ({ movies }) => ({
  sortData: movies.sortData,
  searchParams: movies.searchParams
})

const mapDispatchToProps = dispatch => ({
  getMovies(params) {
    dispatch(MOVIES_API.getMovies(params))
  },
  changeSortBy(newVal) {
    dispatch(MOVIES_API.changeSortBy(newVal))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Sort)

import './sort.scss'
