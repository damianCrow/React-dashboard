import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
  flex: 0 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`

const PointContainer = styled.nav`
  display: flex;
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const Point = styled.span`
  display: inline-block;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  width: 10px;
  background-color: purple;
`

const PointHighligter = styled(Point)`
  ${props => props.distance ? `translateX(${props.distance}px) scale(1.2)` : 'scale(0)'};
  position: absolute;
`

const HiddenFilter = styled.svg`
  width: 0;
  height: 0;
`

class Pagination extends PureComponent {
  constructor() {
    super()
    this.pointRefs = []
    this.state = { distance: 0 }
  }

  componentWillReceiveProps(nextProps) {
    console.log('this.pointRefs', this.pointRefs)
    this.setState({
      distance: this.pointRefs[nextProps.active].offsetLeft,
    })
  }

  render() {
    this.pointRefs = []
    const points = []

    for (let i = 0; i < this.props.total; i += 1) {
      points.push(
        <Point
          key={i}
          innerRef={(comp) => { this.pointRefs.push(comp) }}
          active={(i === this.props.active)}
        />
      )
    }

    return (
      <PaginationContainer>
        <PointContainer>
          <PointHighligter distance={this.state.distance} />
          {points}
        </PointContainer>
        <HiddenFilter>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            </filter>
          </defs>
        </HiddenFilter>
      </PaginationContainer>
    )
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
}

export default Pagination
