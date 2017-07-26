import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { socketDataRequest } from 'store/actions'


const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: solid 2px orange;
  ${props => props.image && `background: url('${props.image}') center / cover;`}
`

const Initals = styled.abbr`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  height: 25px;
  width: 25px;
  border-raidus: 50%;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
`

class UserCircle extends Component {

  componentDidMount() {
    // console.log('componentDidMount props', this.props)
    this.props.serviceRequest([this.props.email])
  }

  componentWillReceiveProps(nextProps) {
    // console.log('UserCircle nextProps', nextProps)
    // nextProps.fetchGoogleInfo(nextProps.email)
  }

  render() {
    const { image, name } = this.props
    return (
      <Circle image={image}>
        {image.length === 0 &&
          <Initals title={name.fullName}>
            {name.initals}
          </Initals>
        }
      </Circle>
    )
  }
}

// UserCircle.propTypes = {
//   image: PropTypes.string,
//   initals: PropTypes.string,
//   name: PropTypes.string,
// }

// UserCircle.defaultProps = {
//   palette: 'primary',
// }

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.google.users.filter(user => user.email === ownProps.email)[0],
  }
}

const mapDispatchToProps = (dispatch) => ({
  // fetchGoogleInfo: (user) => dispatch(getGoogleUsers([user])),
  serviceRequest: (user) => dispatch(socketDataRequest({ service: 'GOOGLE', serverAction: 'pull', request: 'getUsers', payload: user })),
})

UserCircle.propTypes = {
  serviceRequest: PropTypes.func,
  name: PropTypes.shape({
    givenName: PropTypes.string,
    familyName: PropTypes.string,
    fullName: PropTypes.string,
    initals: PropTypes.string,
  }),
  email: PropTypes.string,
  image: PropTypes.string,
}

UserCircle.defaultProps = {
  name: {
    givenName: '?',
    familyName: '?',
    fullName: '?',
    initals: '?',
  },
  image: '',
  email: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCircle)
