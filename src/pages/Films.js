import React from 'react'

import Main from '../components/main/main'
import Search from '../components/search/Search'

const Films = () => (
  <React.Fragment>
    <Search title="find your movie" />
    <Main />
  </React.Fragment>
)

export default Films
