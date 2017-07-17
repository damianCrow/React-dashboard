import React from 'react'
import { storiesOf } from '@storybook/react'
import ClockHand from '.'

storiesOf('ClockHand', module)
  .add('default', () => (
    <ClockHand />
  ))
  .add('reverse', () => (
    <ClockHand reverse />
  ))
  .add('height', () => (
    <ClockHand height={100} />
  ))
  .add('invalid', () => (
    <ClockHand invalid />
  ))
  .add('type textarea', () => (
    <ClockHand type="textarea" />
  ))
  .add('type checkbox', () => (
    <ClockHand type="checkbox" />
  ))
  .add('type radio', () => (
    <ClockHand type="radio" />
  ))
  .add('type select', () => (
    <ClockHand type="select">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </ClockHand>
  ))
