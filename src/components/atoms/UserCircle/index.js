import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getGoogleUsers } from 'store/actions'


const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  ${props => props.image && `background: url('${props.image}') center / cover;`}
`

const Initals = styled.abbr`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border-raidus: 50%;
`

class UserCircle extends Component {

  componentDidMount() {
    console.log('componentDidMount props', this.props)
    this.props.fetchGoogleInfo(this.props.email)
  }

  componentWillReceiveProps(nextProps) {
    console.log('UserCircle nextProps', nextProps)
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
  fetchGoogleInfo: (user) => dispatch(getGoogleUsers([user])),
})

UserCircle.propTypes = {
  fetchGoogleInfo: PropTypes.func,
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
    givenName: 'Rob',
    familyName: 'Clayton',
    fullName: 'Rob Clayton',
    initals: 'RC',
  },
  image: 'public/google-user-pics/105997391536096847724.jpg',
  email: 'rob.c@interstateteam.com',
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCircle)
