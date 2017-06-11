import React from 'react'
import AsyncComponent from '../AsyncComponent'

export default (props) => (
  <AsyncComponent load={() => import('./index')}>
    {(Index) => <Index {...props} />}
  </AsyncComponent>
)
