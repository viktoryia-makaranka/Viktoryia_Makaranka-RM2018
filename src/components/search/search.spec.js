import React from 'react'
import jest from 'jest-mock'
import Search from './Search'


describe('<Movies />', () => {
  let wrapper, onSubmitHandler

  beforeAll(() => {
    onSubmitHandler = jest.fn()
  })

  describe('search with title and search params', () => {
    beforeAll(() => {
      wrapper = mount(
        <Search title="find your movie"
                searchByParams={['title', 'genres']}
                onSubmitHandler={ onSubmitHandler }/>
      )
    })

    it('render search with title and search params', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('submit should call handler from props', () => {
      wrapper.find('.search').simulate('submit')
      expect(onSubmitHandler).toHaveBeenCalledTimes(1)
    })

    it('title block should be visible', () => {
      expect(wrapper.find('.search__title').exists()).toEqual(true)
    })

    it('component should have active search param', () => {
      expect(wrapper.find('.search__search-by-item--active').exists()).toEqual(true)
    })

    it('submit should call handler from props with right search text', () => {
      wrapper.setState({ ...wrapper.state(), searchText: 'hero' })
      wrapper.find('.search').simulate('submit')
      expect(onSubmitHandler).toBeCalledWith('hero', wrapper.state().activeSearchByParam)
    })

    it('after input change submit should call handler from props with right search text from input', () => {
      wrapper.find('.search__input').simulate('change', { target: { value: 'super text' }})
      wrapper.find('.search').simulate('submit')
      expect(onSubmitHandler).toBeCalledWith('super text', wrapper.state().activeSearchByParam)
    })

    describe('search params actions', () => {
      it('click on the search params activeSearchByParam should change activeSearchByParam', () => {
        const searchBy = wrapper.find('.search__search-by-item')
        expect(searchBy.at(1).hasClass('search__search-by-item--active')).toEqual(false)
        expect(searchBy.at(0).hasClass('search__search-by-item--active')).toEqual(true)
        searchBy.at(1).simulate('click')
        const updatedSearchBy = wrapper.find('.search__search-by-item')
        expect(updatedSearchBy.at(0).hasClass('search__search-by-item--active')).toEqual(false)
        expect(updatedSearchBy.at(1).hasClass('search__search-by-item--active')).toEqual(true)
      })

      it('submit should call handler from props with right params', () => {
        wrapper.find('.search').simulate('submit')
        expect(onSubmitHandler).toBeCalledWith('super text', 'genres')
      })
    })
  })

  describe('search without title and search params', () => {
    beforeAll(() => {
      wrapper = mount(
        <Search onSubmitHandler={ onSubmitHandler }/>
      )
    })

    it('render search without title and search params', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('title block should not be visible', () => {
      expect(wrapper.find('.search__title').exists()).toEqual(false)
    })

    it('search params block should not be visible', () => {
      expect(wrapper.find('.search__search-by-item').exists()).toEqual(false)
    })

    it('submit should be called without second param', () => {
      wrapper.find('.search').simulate('submit')
      expect(onSubmitHandler).toBeCalledWith(wrapper.state().searchText)
    })
  })
})