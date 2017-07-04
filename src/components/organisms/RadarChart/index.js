import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as d3 from 'd3'

// import { ProfileImage } from 'components'
// import { fonts } from 'components/globals'

// import styled, { css } from 'styled-components'
// import ReactTransitionGroup from 'react-addons-transition-group'

const Spider = styled.div`
  flex: 1 1 50%;
`

// const Timesheets = ({ children, ...props, posts }) => {
class RadarChart extends Component {

  componentDidMount() {
    this.draw()
  }

  // switchBetweenDataSets() {
  //   const { data } = this.props
  // }

  draw() {
    const { users, factor, w, h, TranslateX, TranslateY, ExtraWidthX, ExtraWidthY } = this.props

    // TODO: Put these in the reducer
    this.allAxis = users.map((user) => user.totalHours.lastWorkWeek)
    this.total = this.allAxis.length
    this.radius = factor * Math.min(w / 2, h / 2)

    this.g = d3.select(this.spiderContainer)
      .append('svg')
      .attr('width', w + ExtraWidthX)
      .attr('height', h + ExtraWidthY)
      .append('g')
      .attr('transform', `translate(${TranslateX}, ${TranslateY})`)

    // d3.select(this.spiderContainer).select('svg').remove()

    this.circularSegments()
    this.segmentLabels()
    this.axis()
    this.axisLines()
    this.axisText()
    this.plot()
  }

  circularSegments() {
    const { factor, w, h, levels, radians } = this.props
    const { radius, allAxis, g, total } = this

    // Circular segments
    for (let j = 0; j < levels; j += 1) {
      const levelFactor = factor * radius * ((j + 1) / levels)
      g.selectAll('.levels')
        .data(allAxis)
        .enter()
        .append('svg:line')
        .attr('x1', (d, i) => levelFactor * (1 - factor * Math.sin(i * radians / total)))
        .attr('y1', (d, i) => levelFactor * (1 - factor * Math.cos(i * radians / total)))
        .attr('x2', (d, i) => levelFactor * (1 - factor * Math.sin((i + 1) * radians / total)))
        .attr('y2', (d, i) => levelFactor * (1 - factor * Math.cos((i + 1) * radians / total)))
        .attr('class', 'line')
        .style('stroke', 'grey')
        .style('stroke-opacity', '0.75')
        .style('stroke-width', '2px')
        .attr('transform', `translate(${((w / 2) - levelFactor)}, ${((h / 2) - levelFactor)})`)
    }

  }

  segmentLabels() {
    const { factor, w, h, levels, ToRight, maxValue } = this.props
    const { radius, g } = this

    // Text indicating at what % each level is
    for (let j = 0; j < levels; j += 1) {
      const levelFactor = (factor * radius) * ((j + 1) / levels)
      g.selectAll('.levels')
        .data([1]) // dummy data
        .enter()
        .append('svg:text')
        .attr('x', () => levelFactor * ((1 - factor) * Math.sin(0)))
        .attr('y', () => levelFactor * ((1 - factor) * Math.cos(0)))
        .attr('class', 'legend')
        .style('font-family', 'sans-serif')
        .style('font-size', '10px')
        .attr('transform', `translate(${(((w / 2) - levelFactor) + ToRight)}, ${((h / 2) - levelFactor)})`)
        .attr('fill', '#fff')
        .text(((j + 1) * maxValue) / levels)
    }
  }

  axis() {
    const { users } = this.props
    const { allAxis, g } = this

    this.axis = g.selectAll('.axis')
      .data(users)
      .enter()
      .append('g')
      .attr('class', 'axis')
  }

  axisLines() {
    const { factor, w, h, radians } = this.props
    const { axis, total } = this


    axis.append('line')
      .attr('x1', w / 2)
      .attr('y1', h / 2)
      // .attr('x2', function (d, i) { return w/2*(1-factor*Math.sin(i*radians/total));})
      // .attr('y2', function (d, i) { return h/2*(1-factor*Math.cos(i*radians/total));})
      .attr('x2', (d, i) => w / 2 * (1 - factor * Math.sin(i * radians / total)))
      .attr('y2', (d, i) => h / 2 * (1 - factor * Math.cos(i * radians / total)))
      .attr('class', 'line')
      .style('stroke', 'lightgrey')
      .style('stroke-width', '1px')
  }

  // Outside text (names)
  axisText() {
    const { w, h, radians, factorLegend } = this.props
    const { axis, total } = this

    axis.append('text')
      .attr('class', 'legend')
      .text((d) => {
        // console.log('d', d)
        return d.firstName
      })
      .style('font-family', 'sans-serif')
      .style('font-size', '14px')
      .style('fill', '#fff')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('transform', () => 'translate(0, -20)')
      .attr('x', (d, i) => w / 2 * (1 - factorLegend * Math.sin(i * radians / total))-60 * Math.sin(i * radians / total))
      .attr('y', (d, i) => h / 2 * (1 - Math.cos(i * radians / total))-20*Math.cos(i*radians/total))
  }

  plot() {
    const { w, h, users, radians, maxValue, factor, color, opacityArea } = this.props
    const { g, total } = this

    const dataValues = []
    const series = 0

    // console.log('total', total)
    // console.log('radians', radians)
    // console.log('factor', factor)
    // console.log('maxValue', maxValue)

    // users.forEach((user) => {
    g.selectAll('.nodes')
      .data(users, (j, i) => {
        // console.log('j', j)
        dataValues.push([
          w / 2 * (1 - (parseFloat(Math.max(j.totalHours.lastWorkWeek, 0)) / maxValue) * factor * Math.sin(i * radians / total)),
          h / 2 * (1 - (parseFloat(Math.max(j.totalHours.lastWorkWeek, 0)) / maxValue) * factor * Math.cos(i * radians / total)),
        ])
      })

    console.log('dataValues', dataValues)
    // dataValues.push(dataValues[0])
    // })
    g.selectAll('.area')
      .data([dataValues])
      .enter()
      .append('polygon')
      .attr('class', `radar-chart-serie'${series}`)
      .style('stroke-width', '2px')
      .style('stroke', color[0])
      .attr('points', (d) => {
        let str = ''
        console.log('d', d)
        for (let pti = 0; pti < d.length; pti += 1) {
          str = `${str + d[pti][0]}, ${d[pti][1]} `
        }
        return str
      })
      .style('fill', color[0])
      .style('fill-opacity', opacityArea)
    series + 1
  }


  render() {
    return (
      <Spider innerRef={(el) => { this.spiderContainer = el }} />
    )
  }

}

RadarChart.propTypes = {
  radius: PropTypes.number,
  w: PropTypes.number,
  h: PropTypes.number,
  factor: PropTypes.number,
  factorLegend: PropTypes.number,
  levels: PropTypes.number,
  maxValue: PropTypes.number,
  radians: PropTypes.number,
  opacityArea: PropTypes.number,
  ToRight: PropTypes.number,
  TranslateX: PropTypes.number,
  TranslateY: PropTypes.number,
  ExtraWidthX: PropTypes.number,
  ExtraWidthY: PropTypes.number,
  color: PropTypes.arrayOf(PropTypes.string),
  users: PropTypes.arrayOf(PropTypes.object),
}


RadarChart.defaultProps = {
  radius: 5,
  w: 600,
  h: 600,
  factor: 1,
  factorLegend: 0.85,
  levels: 5,
  maxValue: 30,
  radians: 2 * Math.PI,
  opacityArea: 0.5,
  ToRight: 5,
  TranslateX: 80,
  TranslateY: 40,
  ExtraWidthX: 250,
  ExtraWidthY: 50,
  users: [{}],
  color: ['#f68a28', '#f36c00'],
}

export default RadarChart
