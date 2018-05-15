import App from './index'
import React from 'react'
import jest from 'jest-mock'

describe('<App/>', () => {
  let wrapper, spyGetData

  beforeAll(() => {
    wrapper = mount(<App />)
    spyGetData = jest.spyOn(wrapper.instance(), 'onSubmitHandler')
    // wrapper.update()
  })

  it('render component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('getData called when search submit with right search text param', () => {
    wrapper.find('.search__input').simulate('change', { target: { value: 'super text' }})
    wrapper.find('.search').simulate('submit')
    expect(spyGetData).toHaveBeenCalled()
  })

})
