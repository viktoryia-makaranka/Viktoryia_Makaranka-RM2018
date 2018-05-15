import React from 'react'
import jest from 'jest-mock'
import Movies from './Movies'


describe('<Movies />', () => {
  let wrapper, onChangeCurrentMovie, movies, searchText, searchBy, sortChangeHandler, activeSortItem, sortData

  beforeAll(() => {
    movies = [{
      poster_path: '',
      title: 'movie )',
      release_date: '11-01-2016',
      genres: [],
      vote_average: 6.8,
      runtime: 60,
      overview: 'description',
      id: '1id'
    }, {
      poster_path: '',
      title: 'movie )',
      release_date: '11-01-2016',
      genres: [],
      vote_average: 6.8,
      runtime: 60,
      overview: 'description',
      id: '2id'
    }]
    sortChangeHandler = jest.fn()
    sortData = [{
      name: 'release date',
      val: 'release_date'
    }, {
      name: 'rating',
      val: 'vote_average'
    }]
    activeSortItem = sortData[0].val
    searchText = 'searchText'
    searchBy = 'searchBy'
    onChangeCurrentMovie = jest.fn()
  })

  describe('movies without sorting', () => {
    beforeAll(() => {
      wrapper = mount(
        <Movies movies={ movies }
                onChangeCurrentMovie={ onChangeCurrentMovie }
                info={`Films by ${ searchText } ${ searchBy }`}/>
      )
    })

    it('render movies without sorting', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('sorting block should not be visible', () => {
      expect(wrapper.find('.sorting').exists()).toEqual(false)
    })
  })

  describe('movies with sorting', () => {
    beforeAll(() => {
      wrapper = mount(
        <Movies movies={ movies }
                showSorting={ true }
                sortChangeHandler={ sortChangeHandler }
                info={`${ movies.length } movies found`}
                onChangeCurrentMovie={ onChangeCurrentMovie }
                activeSortItem={ activeSortItem }
                sortData={ sortData }/>
      )
    })

    it('render movies with sorting', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('sorting block should be visible', () => {
      expect(wrapper.find('.sorting').exists()).toEqual(true)
    })
  })

})