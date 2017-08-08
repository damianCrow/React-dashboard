import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { Heading, Icon, TruncatedScroller } from 'components'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  padding: 0 15px;
  font-family: Gotham,Helvetica Neue,Helvetica,Roboto,sans-serif;
`
const Shade = styled.div`
  position: absolute;
  width: calc(100% + 30px);
  left: -15px;
  height: 100%;
  background-color: #000;
  opacity: ${props => props.opacity ? props.opacity : 0};
`
const Day = styled(Heading)`
  color: ${props => props.color ? props.color : '#000'};  
  text-align: left;
`
const LeftColumn = styled.div`
  position: relative;
  width: 10%;
  height: 100%;
`
// border-right: 1px solid #078074; removed from LeftColumn \\
const RightColumn = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  color: #a4d0a2;
  font-size: 1.25rem;
  display: flex;
  max-height: 50px;
`
const MainColumn = styled.div`
  position: relative;
  width: calc(90% - 30px);
  height: 100%;
  margin-left: 15px;
  border-top: 1px solid #078074;
`
const Title = styled(TruncatedScroller)`
  font-weight: 600;
  font-size: 1.25rem;
  color: #fff;
  top: 15px;
  position: absolute;
`
const SubTitle = styled(TruncatedScroller)`
  font-weight: 100;
  bottom: 15px;
  position: absolute;
  color: #71c3a8;
  font-size: 1rem;
`
const Wink = styled(Icon)`
  position: absolute;
  right: -8px;
  top: calc(50% - 10px);
`
class CalendarRow extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const rightColumnWidth = window.getComputedStyle(this.rightColumn, null).getPropertyValue('width')
    this.Title.scroller.style.width = `calc(100% - ${rightColumnWidth} - 30px)`
    this.SubTitle.scroller.style.width = `calc(100% - ${rightColumnWidth} - 30px)`
  }

  render() {
    return (
      <Wrapper innerRef={(wrapper) => { this.wrapper = wrapper }} >
        <Shade opacity={this.props.opacity} />
        <LeftColumn>
          <Day color={this.props.colorCode} level={4}>{this.props.rowDay}</Day>
          { /* <Wink fillColor={'#ffd200'} icon="interwink" height={20} />*/ }
        </LeftColumn>
        <MainColumn>
          <Title innerRef={Title => { this.Title = Title }}>{this.props.rowTitle}</Title>
          <SubTitle innerRef={SubTitle => { this.SubTitle = SubTitle }}>{this.props.rowSubTitle}</SubTitle>
          <RightColumn innerRef={rightColumn => { this.rightColumn = rightColumn }}>{this.props.children}</RightColumn>
        </MainColumn>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  // countDownDisplay: state.showcase.data.countDown,
})

CalendarRow.propTypes = {
  updateCalendarRow: PropTypes.func,
  countDownDisplay: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => ({
  // updateCalendarRow: (newTime) => dispatch(updateCalendarRow(newTime)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarRow)