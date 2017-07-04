import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { font } from 'styled-theme'
import { updatePlaylist } from 'store/actions'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

const List = styled.ul`
  display: block;
  align-items: center;
  padding: 0;
  margin: 15px 20px;
  font-family: ${font('primary')};
  max-width: 700px;
  max-height: calc(100vh - 150px);
  overflow: scroll;
`
const ListItem = styled.li`
 height: 35px;
 background: linear-gradient(to right, #50b848 0%, #00928f 100%);
 padding: 2.5px;
 margin: 5px;
 border-radius: 5px;
 list-style: none;
`
const ListItemText = styled.span`
 height: 50%;
 width: 100%;
 color: white;
 display: block;
`

const SortableItem = SortableElement(({ value }) => {
  return (
    <ListItem>
      <ListItemText>{value.title}</ListItemText>
      <ListItemText>{value.type}</ListItemText>
    </ListItem>
  )
})

const SortableList = SortableContainer(({ items }) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </List>
  )
})

class SortableComponent extends Component {

  componentDidMount() {
    localStorage.setItem('playList', JSON.stringify(this.props.playlist))
  }

  onSortEnd({ oldIndex, newIndex }) {
    let savedState

    if(localStorage.getItem('playList') !== JSON.stringify(this.props.playlist)) {

      savedState = false
    }
    else {
      savedState = true
    }
    this.props.updateAdminPlaylist(
      arrayMove(this.props.playlist, oldIndex, newIndex), savedState
    )
  }

  render() {
    return (
      <SortableList items={this.props.playlist} onSortEnd={this.onSortEnd.bind(this)} />
    )
  }
}

const mapStateToProps = state => ({
  saved: state.admin.saved,
  playlist: state.admin.playlist,
})

SortableComponent.propTypes = {
  playlist: PropTypes.array,
  saved: PropTypes.bool,
  updateAdminPlaylist: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  updateAdminPlaylist: (updatedPlaylist, savedState) => dispatch(updatePlaylist(updatedPlaylist, savedState)),
})

SortableComponent.defaultProps = {
  palette: 'primary',
}

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent)
