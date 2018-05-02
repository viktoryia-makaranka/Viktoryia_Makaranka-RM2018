import React from 'react'

const Sort = ({ sortData, sortTitle = 'Sort by', onSortChange, activeItem }) => {
  const sortingMap = sortData.map(sortItem => {
    const changeHandler = () => {
      onSortChange(sortItem.val)
    }
    return (
      <div className={`sorting__controls-item${ activeItem === sortItem.val ? ' sorting__controls-item--active' : ''}`} onClick={ changeHandler } key={ sortItem.val }>{ sortItem.name }</div>
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

export default Sort

import './sort.scss'
