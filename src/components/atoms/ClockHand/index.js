import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const handStlyes = styled.div`
  background: #36213E;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: 0% 50%;
  z-index: 1;
  border-radius: 2px;
  fill: transparent !important;
`

const MinuteHand = styled(handStlyes)`
  height: 2px;
  width: 35%;
`

const HourHand = styled(handStlyes)`
  height: 2px;
  width: 32.5%;
  background-image: linear-gradient(to left, ${props => props.gradient});
`

const SecondHand = styled(handStlyes)`
  height: 1px;
  width: 40%;
  border-radius: 0.5px;
`

// const StyledSelect = styled.select`${styles}`
// const StyledInput = styled.input`${styles}`

const ClockHand = ({ ...props }) => {
  const tf = { transform: `translateY(-50%) rotate(${props.rotate * 6 -90}deg)` }

  switch (props.name) {
    case 'hour':
      return <HourHand style={tf} gradient={props.gradient} />
    case 'minute':
      return <MinuteHand style={tf} />
    case 'second':
      return <SecondHand style={tf} />
    default:
      return <SecondHand style={tf} />
  }
}

ClockHand.propTypes = {
  name: PropTypes.string,
  rotate: PropTypes.number,
  gradient: PropTypes.string,
}

// ClockHand.defaultProps = {
//   name: 'minute',
//   rotate: 40,
// }

export default ClockHand
