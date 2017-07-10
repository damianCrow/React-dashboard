import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styled from 'styled-components'
import { updatePlaylist, publishPlaylist } from 'store/actions'
import { AdminPortalTemplate, Button, ButtonWrapper, SortableComponent, Heading } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
class adminPortalHome extends Component {

  resetPlaylist() {
    this.props.updateAdminPlaylist(JSON.parse(localStorage.getItem('playList')), true)
  }
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
              <Button type="info" palette="primary">Add Video</Button>
            </AdminLink>
            <AdminLink to="admin-portal/add-image">
              <Button type="info" palette="primary">Add Image</Button>
            </AdminLink>
          </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <Button type="info" palette="secondary" onClick={this.resetPlaylist.bind(this)}>Cancel</Button>
              <Button type="info" palette="primary" onClick={this.props.publishPlaylist.bind(this)}>Publish</Button>
            </ButtonWrapper>
        )}

      </AdminPortalTemplate>
    )
  }
}

const mapStateToProps = state => ({
  saved: state.admin.saved,
  playlist: state.admin.playlist,
})

const mapDispatchToProps = (dispatch) => ({
  updateAdminPlaylist: (updatedPlaylist, savedState) => dispatch(updatePlaylist(updatedPlaylist, savedState)),
  publishPlaylist: () => dispatch(publishPlaylist()),
})

adminPortalHome.propTypes = {
  playlist: PropTypes.array,
  saved: PropTypes.bool,
  updateAdminPlaylist: PropTypes.func,
  publishPlaylist: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(adminPortalHome)
