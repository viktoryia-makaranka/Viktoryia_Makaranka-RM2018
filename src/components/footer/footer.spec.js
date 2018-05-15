import React from 'react'
import Footer from './Footer'

test('render the footer', () => {
  const wrapper = shallow(
    <Footer />
  )
  expect(wrapper).toMatchSnapshot()
})