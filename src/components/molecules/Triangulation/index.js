import React, { PropTypes, Component } from 'react'
// import ReactDOM from 'react-dom'
import styled from 'styled-components'

// import { TweenMax } from 'gsap'

const MediaWrapper = styled.div`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  position: absolute;
`

const Image = styled.img`
  filter: blur(8px);
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transform: scale(1.1)
  width: 100%;
`

const Video = styled.video`
  filter: blur(8px);
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transform: scale(1.1)
  width: 100%;
`

const Background = styled.svg`
  width: 100%;
  height: 100%;
`

class Triangulation extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired
  }

  constructor () {
    super()

    this.refreshDuration = 10000
    this.refreshTimeout
    this.numPointsX
    this.numPointsY
    this.unitWidth
    this.unitHeight
    this.points = []

    this.buildShapes()
  }

  buildShapes () {
    const unitSize = (window.innerWidth + window.innerHeight) / 20
    this.numPointsX = Math.ceil(window.innerWidth / unitSize) + 1
    this.numPointsY = Math.ceil(window.innerHeight / unitSize) + 1
    this.unitWidth = Math.ceil(window.innerWidth / (this.numPointsX - 1))
    this.unitHeight = Math.ceil(window.innerHeight / (this.numPointsY - 1))

    for (let y = 0; y < this.numPointsY; y++) {
      for (let x = 0; x < this.numPointsX; x++) {
        this.points.push({
          x: this.unitWidth * x,
          y: this.unitHeight * y,
          originX: this.unitWidth * x,
          originY: this.unitHeight * y
        })
      }
    }
  }

  formShapePoints () {
    for (var i = 0; i < points.length; i++) {
      if (points[i].originX !== unitWidth * (numPointsX-1) && points[i].originY != unitHeight*(numPointsY-1)) {
        var topLeftX = points[i].x;
        var topLeftY = points[i].y;
        var topRightX = points[i+1].x;
        var topRightY = points[i+1].y;
        var bottomLeftX = points[i+numPointsX].x;
        var bottomLeftY = points[i+numPointsX].y;
        var bottomRightX = points[i+numPointsX+1].x;
        var bottomRightY = points[i+numPointsX+1].y;

        var rando = Math.floor(Math.random()*2);

        for(var n = 0; n < 2; n++) {
          var polygon = document.createElementNS(svg.namespaceURI, 'polygon');

          if (rando === 0) {
            if (n === 0) {
              polygon.point1 = i
              polygon.point2 = i + numPointsX
              polygon.point3 = i + numPointsX + 1
              polygon.setAttribute('points', topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+bottomRightX+','+bottomRightY);
            } else if (n==1) {
              polygon.point1 = i
              polygon.point2 = i + 1
              polygon.point3 = i + numPointsX + 1
              polygon.setAttribute('points', topLeftX+','+topLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
            }
          } else if (rando === 1) {
            if (n === 0) {
              polygon.point1 = i
              polygon.point2 = i + numPointsX
              polygon.point3 = i + 1
              polygon.setAttribute('points', topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY);
            } else if (n === 1) {
              polygon.point1 = i+numPointsX
              polygon.point2 = i+1
              polygon.point3 = i+numPointsX+1
              polygon.setAttribute('points',bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
            }
          }
          polygon.setAttribute('fill','rgba(0,0,0,'+(Math.random()/3)+')');
          var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
          animate.setAttribute('fill','freeze');
          animate.setAttribute('attributeName','points');
          animate.setAttribute('dur',refreshDuration+'ms');
          animate.setAttribute('calcMode','linear');
          polygon.appendChild(animate);
          svg.appendChild(polygon);
        }
      }
    }
  }

  randomize () {
    const { points, numPointsY, numPointsX, unitWidth, unitHeight } = this

    for (var i = 0; i < points.length; i++) {
      if (points[i].originX !== 0 && points[i].originX !== unitWidth * (numPointsX - 1)) {
        this.points[i].x = points[i].originX + Math.random() * unitWidth - unitWidth / 2
      }

      if (points[i].originY !== 0 && points[i].originY !== unitHeight * (numPointsY - 1)) {
        this.points[i].y = points[i].originY + Math.random() * unitHeight - unitHeight / 2
      }
    }
  }

  componentDidMount () {

  }

  // componentWillEnter (callback) {
  //   const el = ReactDOM.findDOMNode(this)
  //   console.log('InstagramImage, componentWillEnter')
  //   // callback()
  //   TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
  // }

  // componentWillLeave (callback) {
  //   const el = ReactDOM.findDOMNode(this)
  //   console.log('InstagramImage, componentWillLeave')
  //   // callback()
  //   TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  // }

  render () {
    const { type, media } = this.props
    return (
      <MediaWrapper>
        {type === 'image' ? (
          <Image src={media} />
        ) : (
          <Video src={media} autoPlay="true" muted />
        )}
      </MediaWrapper>
    )
  }
}

export default Triangulation
