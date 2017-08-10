import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { font } from 'styled-theme'
import { updatePlaylist, deletePlaylistItem, recievedPlaylistFromServer, showHideItem } from 'store/actions'
import { Icon } from 'components'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

// Maybe make this more like this?
// http://chenglou.github.io/react-motion/demos/demo8-draggable-list/

const List = styled.ul`
  display: block;
  align-items: center;
  padding: 0;
  margin: 15px 20px;
  font-family: ${font('primary')};
  max-width: 700px;
  max-height: calc(100vh - 12rem);
  overflow: scroll;
`
const ListItem = styled.li`
 height: 35px;
 background: linear-gradient(to right, #50b848 0%, #00928f 100%);
 padding: 2.5px;
 margin: 5px;
 border-radius: 5px;
 list-style: none;
 position: relative;
 &.hidden {
  background: linear-gradient(to right, #C4C1C1 0%, #706E6E 100%);
 }
`
const ListItemText = styled.span`
 height: 50%;
 width: calc(100% - 130px);
 text-overflow: ellipsis;
 color: white;
 display: block;
 font-size: 0.75rem;
 padding-left: 7.5px;
 font-weight: lighter;
 white-space: nowrap;
 overflow: hidden;

 &:first-child {
   font-weight: bold;
 }
`
const ListButton = styled.div`
position: absolute;
right: 0;
z-index: 2;
top: 5px;
`
const PreviewImg = styled.img`    
  position: absolute;
  z-index: 1;
  height: calc(100% - 10px);
  top: 5px;
  right: 68px;
`
const PreviewVid = styled(Icon)`    
  position: absolute;
  z-index: 1;
  height: calc(100% - 10px);
  top: 2.5px;
  right: 68px;
`

const SortableItem = SortableElement(({ value, deleteFunc, showHideFunc, playlist }) => {
  let isHidden
  let itemClass
  let btnColor
  if (value.hidden) {
    isHidden = 'show'
    itemClass = 'hidden'
    btnColor = 'grayscale'
  } else {
    isHidden = 'hide'
    itemClass = 'not-hidden'
    btnColor = 'primary'
  }
  return (
    <ListItem className={itemClass}>
      <ListItemText>{value.title}</ListItemText>
      <ListItemText>{value.type}</ListItemText>
      {value.type === 'Image' ?
        <PreviewImg alt={''} src={value.url} /> :
        <PreviewVid icon={'video'} fillColor="#000" height={25} />
      }
      <ListButton>
        <Icon
          icon={isHidden}
          fillColor="#fff"
          height={25}
          onClick={showHideFunc.bind(this, playlist, value)}
        />
        <Icon
          icon={'delete'}
          fillColor="#fff"
          height={25}
          onClick={deleteFunc.bind(this, playlist, value)}
        />
      </ListButton>
    </ListItem>
  )
})

const SortableList = SortableContainer(({ items, deleteFunc, showHideFunc }) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem
          playlist={items}
          deleteFunc={deleteFunc}
          showHideFunc={showHideFunc}
          key={`item-${index}`}
          index={index}
          value={value}
        />
      ))}
    </List>
  )
})

class SortableComponent extends Component {

  constructor(props) {
    super(props)
    if (this.props.playlist.length < 1) {
      fetch('/public/user-data/showcase-media.json').then((response) => {
        return response.json()
      }).then((j) => {
        this.props.recievedPlaylistFromServer(j.playlist)
        const playlistToStore = [...j.playlist.filter(item => item.hidden === false), ...j.playlist.filter(item => item.hidden === true)]
        localStorage.setItem('playList', JSON.stringify(playlistToStore))
      })
    }
  }

  onSortEnd({ oldIndex, newIndex }) {
    let savedState
    const reOrderdPlaylist = arrayMove(this.props.playlist, oldIndex, newIndex)

    if (localStorage.getItem('playList') !== JSON.stringify(reOrderdPlaylist)) {
      savedState = false
    } else {
      savedState = true
    }
    this.props.updateAdminPlaylist(reOrderdPlaylist, savedState)
  }

  render() {
    return (
      <SortableList
        deleteFunc={this.props.deletePlaylistItem}
        showHideFunc={this.props.showHideItem}
        items={this.props.playlist}
        pressDelay={200}
        onSortEnd={this.onSortEnd.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => ({
  saved: state.admin.saved,
  playlist: state.admin.playlist,
})

SortableComponent.defaultProps = {
  playlist: [{ id: '001', type: 'Default', title: 'Default Item', url: '', serviceId: '' }],
  saved: true,
}

SortableComponent.propTypes = {
  playlist: PropTypes.array,
  saved: PropTypes.bool,
  updateAdminPlaylist: PropTypes.func,
  deletePlaylistItem: PropTypes.func,
  showHideItem: PropTypes.func,
  recievedPlaylistFromServer: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  updateAdminPlaylist: (updatedPlaylist, savedState) => dispatch(updatePlaylist(updatedPlaylist, savedState)),
  deletePlaylistItem: (playlist, item) => dispatch(deletePlaylistItem(playlist, item)),
  showHideItem: (playlist, item) => dispatch(showHideItem(playlist, item)),
  recievedPlaylistFromServer: (playlistFromServer) => dispatch(recievedPlaylistFromServer(playlistFromServer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent)
