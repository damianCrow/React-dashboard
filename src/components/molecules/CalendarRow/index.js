import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Heading, TruncatedScroller } from 'components'

const Pulsate = keyframes`
  0% {
    color: #ffd200;
    opacity: 1;
  }
  100% {
    color: #ffd200;
    opacity: 0.4;
  }
`
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, ${props => props.opacity ? props.opacity : 1});
  box-sizing: border-box;
  overflow: hidden;
  font-family: Gotham,Helvetica Neue,Helvetica,Roboto,sans-serif;
  flex: 1 0 auto;
  min-height: 70px;
  align-items: stretch;

  &:first-child {
    .main_content {
      border-top: none;
    }
  }
  &.pulsate {
    .title, .content-on-right {
      animation: ${Pulsate} 0.75s ease-in-out alternate infinite;
    }
  }
`

const Day = styled(Heading)`
  color: ${props => props.color ? props.color : '#000'};
  margin: 0;
  text-align: left;
`
const LeftColumn = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  padding: .5rem 1rem;
`
// border-right: 1px solid #078074; removed from LeftColumn \\
const MainColumn = styled.div`
  position: relative;
  border-top: 1px solid rgba(38, 208, 124, 0.15);
  padding: .5rem 1rem;
  display: flex;
  flex: 8;
`

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  justify-content: center;
`

const Details = styled.div`
  flex: auto;
  margin-left: auto;
  text-align: right;
  color: #a4d0a2;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Title = styled(TruncatedScroller)`
  font-weight: 600;
  font-size: 1.25rem;
  color: #fff;
  top: 15px;
  // position: absolute;
`
const SubTitle = styled.span`
  font-weight: 100;
  top: 50px;
  // position: absolute;
  color: #71c3a8;
  font-size: 1rem;
`

// const Wink = styled(Icon)`
//   position: absolute;
//   right: -8px;
//   top: calc(50% - 10px);
// `

const CalendarRow = ({ colorCode, opacity, id, rowDay, rowTitle, rowSubTitle, children, styles }) => (
  <Wrapper opacity={opacity} style={styles} id={id} >
    <LeftColumn>
      <Day color={colorCode} level={4}>{rowDay}</Day>
      { /* <Wink fillColor={'#ffd200'} icon="interwink" height={20} /> */ }
    </LeftColumn>
    <MainColumn className={'main_content'}>
      <Titles>
        <Title className={'title'}>{rowTitle}</Title>
        <SubTitle>{rowSubTitle}</SubTitle>
      </Titles>
      <Details className={'content-on-right'}>
        {children}
      </Details>
    </MainColumn>
  </Wrapper>
)

CalendarRow.propTypes = {
  colorCode: PropTypes.string,
  opacity: PropTypes.number,
  id: PropTypes.string,
  rowDay: PropTypes.string,
  rowTitle: PropTypes.string,
  rowSubTitle: PropTypes.string,
  children: PropTypes.node,
  styles: PropTypes.object,
}

export default CalendarRow
