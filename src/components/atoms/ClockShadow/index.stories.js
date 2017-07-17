import React from 'react'
import { storiesOf } from '@storybook/react'
import { ClockShadow } from 'components'

storiesOf('ClockShadow', module)
  .add('default', () => (
    <ClockShadow>Hello</ClockShadow>
  ))
  .add('reverse', () => (
    <ClockShadow reverse>Hello</ClockShadow>
  ))
