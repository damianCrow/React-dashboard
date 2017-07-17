import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const ClockSlice = styled.path`
  stroke: transparent!important;
  fill: white!important;
`

const ClockCircle = styled.circle`
  fill: url(#slice-gradient) !important;
  stroke: transparent !important;
`

const ClockShadow = ({ ...props }) => {
  // console.log('minutes', minutes)

  const size = 100
  const radCircumference = Math.PI * 2
  const center = size / 2
  const radius = center

  const { decimalMinute, decimalHour } = props

  let startDecimal = 0
  let endingDecimal = 0
  let longArc = 0

  // Figure out which hand is the start and end

  // console.log('decimalMinute', decimalMinute)
  // console.log('decimalHour', decimalHour)

  if (decimalMinute >= decimalHour) {
    startDecimal = decimalHour
    endingDecimal = (decimalMinute - decimalHour)
    longArc = ((decimalMinute - decimalHour) <= 0.5) ? 0 : 1
  } else {
    startDecimal = decimalMinute
    endingDecimal = (decimalHour - decimalMinute)
    longArc = ((decimalHour - decimalMinute) <= 0.5) ? 0 : 1
  }

  // Should we just draw a circle?
  //     if (value === total) {
  //       return (
  //         <circle
  //           r={radius}
  //           cx={center}
  //           cy={center}
  //           fill={'black'}
  //           key={index}
  //         />
  //       );
  //     }

  //     if (value === 0) {
  //       return
  //     }

  // const valuePercentage = props.percentage
  // console.log('valuePercentage', valuePercentage)

  // Should the arc go the long way round?
  // if (props.locationAbbr === 'LA') {
  //   // console.log('decimalHour - decimalMinute', decimalHour - decimalMinute)
  //   console.log('decimalHour', decimalHour)
  //   console.log('decimalMinute', decimalMinute)
  // }
  // const longArc = ((decimalMinute - decimalHour) <= 0.5) ? 0 : 1

  const radSegmentStart = startDecimal * radCircumference
  const startX = Math.cos(radSegmentStart) * radius
  const startY = Math.sin(radSegmentStart) * radius

  const radSegment = radSegmentStart + (endingDecimal * radCircumference)
  const nextX = Math.cos(radSegment) * radius
  const nextY = Math.sin(radSegment) * radius

  // console.log('props.percentage', props.percentage)
  // console.log('props.startPercentage', props.startPercentage)

  // d is a string that describes the path of the slice.
  // The weirdly placed minus signs [eg, (-(lastY))] are due to the fact
  // that our calculations are for a graph with positive Y values going up,
  // but on the screen positive Y values go down.
  const d = [
    `M ${center},${center}`,
    `l ${startX},${-startY}`,
    `a${radius},${radius}`,
    '0',
    `${longArc},0`,
    `${nextX - startX},${-(nextY - startY)}`,
    'z',
  ].join(' ')

  return (
    <g>
      {/* <radialGradient id="linear-gradient" cx="0.5" cy="0.5" r="50%">
        <stop offset="0%" stopColor="#fff" />
        <stop offset="100%" stopColor="#ededed" />
      </radialGradient> */}
      <defs>
        <mask id={`mask-path-${props.locationAbbr}`} x="0" y="0" width="1" height="1">
          <ClockSlice transform={'rotate(90 50 50), scale(-1, 1), translate(-100, 0)'} d={d} key={props.locationAbbr} />
        </mask>
      </defs>

      <radialGradient id="slice-gradient" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#dcddde" />
        <stop offset=".46" stopColor="#dfdfe0" />
        <stop offset=".74" stopColor="#e7e7e8" />
        <stop offset=".97" stopColor="#f5f5f6" />
        <stop offset="1" stopColor="#f8f8f9" />
        <stop offset="1" stopColor="#fff" />
      </radialGradient>

      <ClockCircle mask={`url(#mask-path-${props.locationAbbr})`} cx="50%" cy="50%" r="50%" />
    </g>
  )
}

ClockShadow.propTypes = {
  decimalMinute: PropTypes.number,
  decimalHour: PropTypes.number,
  locationAbbr: PropTypes.string,
}

export default ClockShadow
