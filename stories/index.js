import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import configureStore from '../src/redux/configureStore'
import Sort from '../src/components/sort/Sort'

const store = configureStore()

storiesOf('Sort', module)
  .addDecorator(getStory => (
    <Provider store={store}>
      {getStory()}
    </Provider>
  ))
  .add('general view', () => (
    <Sort />
  ))
