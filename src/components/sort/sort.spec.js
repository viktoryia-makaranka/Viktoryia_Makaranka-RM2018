import Sort from './Sort'
import React from 'react'
import jest from 'jest-mock'

describe('<Sort />', () => {
  let wrapper, sortData, sortChangeHandler, activeSortItem

  beforeAll(() => {
    sortChangeHandler = jest.fn()
    sortData = [{
      name: 'release date',
      val: 'release_date'
    }, {
      name: 'rating',
      val: 'vote_average'
    }]
    activeSortItem = sortData[0].val
    wrapper = shallow(<Sort sortData={ sortData } onSortChange={ sortChangeHandler } activeItem={ activeSortItem }/>)
  })

  it('render Sort', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('click should call handler from props with new active item in params', () => {
    wrapper.find('.sorting__controls-item').at(1).simulate('click')
    expect(sortChangeHandler).toBeCalledWith(sortData[1].val)
  })
})
