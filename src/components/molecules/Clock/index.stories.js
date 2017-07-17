import React from 'react'
import { storiesOf } from '@storybook/react'
import { Clock } from 'components'

storiesOf('Clock', module)
  .add('default', () => (
    <Clock />
  ))
