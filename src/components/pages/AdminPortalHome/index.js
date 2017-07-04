import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styled from 'styled-components'
import { getSaveState } from 'store/selectors'
// import { updatePlaylist, socialLoginRequest, modalHide } from 'store/actions'
import { AdminPortalTemplate, Button, ButtonWrapper, SortableComponent, Heading /* , FeatureList, Header, Intro*/ } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
class adminPortalHome extends Component {
  render() {
    return (
      <AdminPortalTemplate>
        <Heading level={3} >
          Playlist
        </Heading>
        <SortableComponent />     
        {this.props.saved ? (
          <ButtonWrapper>
            <AdminLink to="admin-portal/add-video">
              <Button type="info" palette="secondary">Add Video</Button>
            </AdminLink>
            <AdminLink to="admin-portal/add-image">
              <Button type="info" palette="primary">Add Image</Button>
            </AdminLink>
          </ButtonWrapper>
          ) : (
          <ButtonWrapper> 
            <Button type="info" palette="secondary">Cancel</Button>
            <Button type="info" palette="primary">Publish</Button>
          </ButtonWrapper>
        )}

      </AdminPortalTemplate>
    )
  }
}

const mapStateToProps = state => ({
  saved: state.admin.saved,
})

export default connect(mapStateToProps)(adminPortalHome)
