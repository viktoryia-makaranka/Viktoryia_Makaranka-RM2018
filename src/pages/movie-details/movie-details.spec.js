import React from 'react'
import jest from 'jest-mock'
import MovieDetails from './MovieDetails'


describe('<MovieDetails />', () => {
  let wrapper, onChangeCurrentMovie, movies, currentMovie, searchText, searchBy

  beforeAll(() => {
    movies = []
    currentMovie = {
      poster_path: '',
      title: 'movie )',
      release_date: '11-01-2016',
      genres: [],
      vote_average: 6.8,
      runtime: 60,
      overview: 'description',
      id: '2id'
    }
    searchText = ''
    searchBy = 'title'
    onChangeCurrentMovie = jest.fn()
    wrapper = mount(
      <MovieDetails onChangeCurrentMovie={ onChangeCurrentMovie }
                    movies={ movies }
                    currentMovie={ currentMovie }
                    searchText={ searchText }
                    searchBy={ searchBy }/>

    )
  })

  it('render movie details with empty related movies', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('render movie details with not empty related movies', () => {
    movies = [{
      poster_path: '',
      title: 'movie2 )',
      release_date: '11-02-2016',
      genres: [],
      vote_average: 8,
      runtime: 60,
      overview: 'description',
      id: '1id'
    }, currentMovie]

    wrapper = mount(
      <MovieDetails onChangeCurrentMovie={ onChangeCurrentMovie }
                    movies={ movies }
                    currentMovie={ currentMovie }
                    searchText={ searchText }
                    searchBy={ searchBy }/>

    )

    expect(wrapper).toMatchSnapshot()
  })

  it('related movies exist', () => {
    expect(wrapper.find('.related-movies.container').exists()).toEqual(true)
  })

  it('empty related movies if it contains the currentMovie only', () => {
    movies = [currentMovie]
    wrapper = mount(
      <MovieDetails onChangeCurrentMovie={ onChangeCurrentMovie }
                    movies={ movies }
                    currentMovie={ currentMovie }
                    searchText={ searchText }
                    searchBy={ searchBy }/>

    )

    expect(wrapper.find('.related-movies.container').exists()).toEqual(false)
  })

})