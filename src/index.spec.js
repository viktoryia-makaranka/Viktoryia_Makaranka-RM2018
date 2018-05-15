import App from './index'
import React from 'react'
import jest from 'jest-mock'

describe('<App/>', () => {
  let wrapper, movies


  beforeAll(() => {
    App.prototype.getResults = jest.fn()

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
      vote_average: 6,
      runtime: 60,
      overview: 'description',
      id: '2id'
    }]

    wrapper = mount(<App />)
  })

  it('render empty component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('render component', () => {
    wrapper.setState({
      ...wrapper.state(),
      movies: movies,
      currentMovie: movies[0]
    })
    wrapper.update()

    expect(wrapper).toMatchSnapshot()
  })

  it('submit and sort handlers emit getResults', async () => {
    await wrapper.instance().onSubmitHandler('BIG HERO 6', 'title')
    expect(App.prototype.getResults).toHaveBeenCalledTimes(1)
    await wrapper.instance().sortChangeHandler('release_date')
    expect(App.prototype.getResults).toHaveBeenCalledTimes(2)
    expect(App.prototype.getResults).toHaveBeenCalledWith('BIG HERO 6', 'title', 'release_date')
  })

  it('onChangeCurrentMovie should change current movie', async () => {
    expect(wrapper.state().currentMovie).toEqual(movies[0])
    await wrapper.instance().onChangeCurrentMovie(movies[1])
    expect(wrapper.state().currentMovie).toEqual(movies[1])
  })

  describe('test handlers', () => {
    beforeAll(() => {
      App.prototype.onSubmitHandler = jest.fn()
      App.prototype.onChangeCurrentMovie = jest.fn()
      App.prototype.sortChangeHandler = jest.fn()
      wrapper = mount(<App />)
      wrapper.setState({
        ...wrapper.state(),
        movies: movies,
        currentMovie: movies[0]
      })
      wrapper.update()
    })

    it('onSubmitHandler called with right search text param after input changed', () => {
      wrapper.find('.search__input').simulate('change', { target: { value: 'super text' }})
      wrapper.find('.search').simulate('submit')
      expect(App.prototype.onSubmitHandler).toHaveBeenCalledTimes(1)
      expect(App.prototype.onSubmitHandler).toHaveBeenCalledWith('super text', wrapper.state().searchBy)
    })

    it('onChangeCurrentMovie calls when click on a card', () => {
      expect(wrapper.state().currentMovie).toEqual(movies[0])
      wrapper.find('.movie-card').at(1).simulate('click')
      expect(App.prototype.onChangeCurrentMovie).toHaveBeenCalledTimes(1)
      expect(App.prototype.onChangeCurrentMovie).toHaveBeenCalledWith(movies[1])
    })

    it('sortChangeHandler calls when click on a sort item', () => {
      wrapper.find('.sorting__controls-item').at(1).simulate('click')
      expect(App.prototype.sortChangeHandler).toHaveBeenCalledTimes(1)
      expect(App.prototype.sortChangeHandler).toHaveBeenCalledWith(wrapper.state().sortData[1].val)
    })
  })


})
