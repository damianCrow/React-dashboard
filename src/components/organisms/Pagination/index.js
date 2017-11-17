import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
  flex: 0 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PointContainer = styled.nav`
  display: inline-flex;
  position: relative;
  height: 100%;
  align-items: center;
  justify-content: center;
  filter: url(#goo);
`
const Point = styled.span`
  display: inline-block;
  height: 6px;
  margin: 0 4px;
  border-radius: 50%;
  width: 6px;
  transition: background-color 4s;
  background-color: ${props => props.active ? '#fff' : '#d8d8d8'};
`

const PointHighligter = styled(Point)`
  transition: transform 4s;
  ${props => props.distance ? `transform: translateX(${props.distance}px) scale(1.15)` : 'scale(0)'};
  position: absolute;
  left: 0;
  background-color: white;
  margin-left: 0;
  margin-right: 0;
`

const HiddenFilter = styled.svg`
  width: 0;
  height: 0;
`

// const GooeySvg = (opts) => {
//   const id = opts.id || 'gooey'
//   const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
//   svg.setAttribute('version', '1.1')
//   svg.id = id
//   svg.innerHTML = `
//   <defs>
//     <filter id="goo">
//       <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
//       <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -3" result="goo" />
//     </filter>
//   </defs>
//   `
//   return svg
// }

class Pagination extends Component {
  constructor() {
    super()
    this.pointRefs = []
    this.state = { distance: 5, last: false }
  }

  componentWillMount() {
    // if (document.querySelector('#gooey')) return
    // const domNode = GooeySvg({ id: 'gooey' })
    // document.body.appendChild(domNode)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.active === nextProps.total) && this.props.postId === nextProps.postId) {
      console.log('this is the last point in the pagination after it')
      this.setState({ last: true })
    } else if (this.props.postId !== nextProps.postId) {
      this.setState({ last: false })
    }

    if (nextProps.active !== this.props.active) {
      this.setState({ distance: this.pointRefs[nextProps.active].offsetLeft })
    }
  }

  // shouldComponentUpdate = nextProps => !(nextProps.active < this.props.active)
  shouldComponentUpdate = () => !this.state.last

  render() {
    const points = []

    for (let i = 0; i < this.props.total + 1; i += 1) {
      points.push(
        <Point
          key={`${this.props.postId}-${i}`}
          innerRef={(comp) => { this.pointRefs[i] = comp }}
          active={(i === this.props.active)}
        />
      )
    }

    return (
      <PaginationContainer>
        <HiddenFilter>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -3" result="goo" />
            </filter>
          </defs>
        </HiddenFilter>
        <PointContainer>
          <PointHighligter distance={this.state.distance} />
          {points}
        </PointContainer>
      </PaginationContainer>
    )
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  postId: PropTypes.string.isRequired,
}

export default Pagination
