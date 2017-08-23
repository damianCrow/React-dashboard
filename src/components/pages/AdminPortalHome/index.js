import PropTypes from 'prop-types'
import React, { Component } from 'react'
import shortid from 'shortid'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { storeAllPlaylists, recievedPlaylistFromServer, addNewPlaylistToStore } from 'store/actions'
import { AdminPortalTemplate, AdminPortalPlaylistView, Field, Button, ButtonWrapper, Heading, Input } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
const EleError = styled.div`
 margin: 0 27.5px;
 width: calc(100% - 55px);
 display: none;
 font-family: Helvetica Neue, Helvetica, Roboto, sans-serif;
 color: darkred;
 font-size: 3.29vw;
 text-align: center;
`
const Dropdown = styled(Input)`
 margin: 0 27.5px;
 width: calc(100% - 55px);
 font-family: Helvetica Neue, Helvetica, Roboto, sans-serif;
 font-size: 1.125rem;
 height: 40px;
 margin-top: 20px;
`
class AdminPortalHome extends Component {

  constructor(props) {
    super(props)
    this.state = { goToPlaylist: '' }
    if (this.props.allAvailablePlaylists.length < 1) {
      fetch('/public/user-data/showcase-media.json').then((response) => {
        return response.json()
      }).then((j) => {
        this.props.storeAllPlaylists(j.playlists)
      })
    }
    this.onSelect = this.onSelect.bind(this)
    this.onCreate = this.onCreate.bind(this)
  }

  onSelect(e) {
    this.props.allAvailablePlaylists.filter(playlist => {
      if (playlist.id === e.target.value) {
        this.props.recievedPlaylistFromServer(playlist)
      }
    })
    this.setState({ goToPlaylist: e.target.value })
  }

  onCreate() {
    if (this.playlistTitle.value === '') {
      this.playlistTitleError.style.display = 'block'
      return null
    }
    const newPlaylist = {
      name: this.playlistTitle.value,
      id: shortid.generate(),
      data: [],
    }
    this.props.addNewPlaylistToStore(newPlaylist)
    this.setState({ goToPlaylist: newPlaylist.id })
  }

  render() {
    if (this.state.goToPlaylist) {
      return (<Redirect to={`/admin-portal/playlist/${this.state.goToPlaylist}`} component={AdminPortalPlaylistView} />)
    }
    return (
      <AdminPortalTemplate>
        <Heading level={6}>
          Select A Playlist To Edit
        </Heading>
        <Dropdown type={'select'} onChange={this.onSelect}>
          <option value="" disabled selected>Select A Playlist</option>
          {this.props.allAvailablePlaylists.map((playlistObj, idx) =>
            <option value={playlistObj.id} key={idx}>{playlistObj.name}</option>
          )}
        </Dropdown>
        <Heading level={6}>
          Or Create A Playlist
        </Heading>
        <form>
          <Field
            innerRef={(playlistTitle) => { this.playlistTitle = playlistTitle }}
            name="playlistTitle"
            label="New Playlist Title"
            type="text"
            placeholder="Enter New Playlist Title Here"
          />
          <EleError innerRef={(playlistTitleError) => { this.playlistTitleError = playlistTitleError }} className="error" id="playlistTitleError"> A Title for the new playlist is required!</EleError>
          <ButtonWrapper>
            <Button onClick={this.onCreate} palette="primary">Create New Playlist</Button>
          </ButtonWrapper>
        </form>
      </AdminPortalTemplate>
    )
  }
}

AdminPortalHome.propTypes = {
  publishPlaylist: PropTypes.func,
  overideQueue: PropTypes.func,
  storeAllPlaylists: PropTypes.func,
  recievedPlaylistFromServer: PropTypes.func,
  allAvailablePlaylists: PropTypes.array,
  addNewPlaylistToStore: PropTypes.func,
}

const mapStateToProps = state => ({
  allAvailablePlaylists: state.admin.allAvailablePlaylists,
})

const mapDispatchToProps = (dispatch) => ({
  addNewPlaylistToStore: (newPlaylistObj) => dispatch(addNewPlaylistToStore(newPlaylistObj)),
  storeAllPlaylists: (allPlaylists) => dispatch(storeAllPlaylists(allPlaylists)),
  recievedPlaylistFromServer: (playlistFromServer) => dispatch(recievedPlaylistFromServer(playlistFromServer)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPortalHome))

