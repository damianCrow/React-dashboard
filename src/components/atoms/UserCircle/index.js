import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts } from 'components/globals'
import { socketDataRequest } from 'store/actions'


const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  transform: translateY(30px);
  border-radius: 50%;
  border: solid 2px rgba(256, 256, 256, 0.35);
  ${props => props.image && `background: url('${props.image}') center / cover;`}
  background-clip: padding-box;
  padding: 2px;

  &.small {
    width: 42px;
    height: 42px;
    transform: translateY(0);
    margin-left: 15px;
  }
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
  color: white;
  font-family: ${fonts.primary};
  font-weight: lighter;
`

class UserCircle extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: {
        givenName: '',
        familyName: '',
        fullName: '',
        initals: '',
      },
      image: '',
      email: '',
      className: this.props.className,
    }
  }

  componentDidMount() {
    // TODO: Put these in the store, then check the store before making another fetch.
    fetch('public/none-google-users.json').then(response => {
      return response.json()
    }).then(noneGoogleUsersObj => {
      const releventUser = noneGoogleUsersObj.users.filter(user => user.email === this.props.email)
      if (releventUser.length > 0) {
        this.setState(...releventUser)
      } else {
        this.props.serviceRequest([this.props.email])
      }
    })
  }

  render() {
    const { className, image, name } = (this.state.email.length > 0) ? this.state : this.props

    return (
      <Circle className={className} image={image}>
        {image.length === 0 &&
          <Initals title={name.fullName}>
            {name.initals}
          </Initals>
        }
      </Circle>
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.users.users.filter(user => user.email === ownProps.email)[0],
  }
}

const mapDispatchToProps = dispatch => ({
  serviceRequest: user => dispatch(socketDataRequest({ service: 'GOOGLE', serverAction: 'pull', request: 'getUsers', payload: user })),
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
  className: PropTypes.string,
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
