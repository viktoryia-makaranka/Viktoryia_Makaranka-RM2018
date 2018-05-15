import ErrorBoundary from './Error'
import React from 'react'
import jest from 'jest-mock'

describe('<ErrorBoundary />', () => {
  let ErrorChild, ClearChild, wrapper

  beforeAll(() => {
    ErrorBoundary.prototype.componentDidCatch = jest.fn()

    ErrorChild = () => {
      throw new Error('Error thrown from a child')
      return (<div>Error</div>)
    }

    ClearChild = () => {
      return (<div>Clear</div>)
    }
  })

  describe('clear state', () => {
    beforeAll(() => {
      wrapper = mount(<ErrorBoundary><ClearChild /></ErrorBoundary>)
    })

    it('componentDidCatch shouldn\'t be called with a clear child', () => {
      expect(ErrorBoundary.prototype.componentDidCatch).not.toBeCalled()
    })
  })

  describe('error state', () => {

    beforeAll(() => {
      wrapper = mount(<ErrorBoundary><ErrorChild /></ErrorBoundary>)
    })

    it('should catch errors from children', () => {
      expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalledTimes(1)
    })

    it('render error state', () => {
      wrapper.setState({ hasError: true })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
