import React from 'react'
import jest from 'jest-mock'
import Movie from './Movie'


describe('<Movie />', () => {
  let wrapper, onChangeCurrentMovie

  beforeAll(() => {
    const movie = {
      poster_path: '',
      title: 'movie )',
      release_date: '11-01-2016',
      genres: []
    }

    onChangeCurrentMovie = jest.fn()

    wrapper = mount(<Movie movie={ movie } onChangeCurrentMovie={ onChangeCurrentMovie }/>)
  })

  it('render movie', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('on click should call onChangeCurrentMovie from props ', () => {
    wrapper.find('.movie-card').simulate('click')
    expect(onChangeCurrentMovie).toHaveBeenCalledTimes(1)
  })
})