import { injectGlobal, keyframes, css } from 'styled-components'

const fontPath = '/public/fonts/'

injectGlobal`
  @font-face {
    font-family: 'Gotham';
    src: url('${fontPath}gotham/gothammedium-webfont.eot');
    src: url('${fontPath}gotham/gothammedium-webfont.eot?#iefix') format('embedded-opentype'),
         url('${fontPath}gotham/gothammedium-webfont.woff2') format('woff2'),
         url('${fontPath}gotham/gothammedium-webfont.woff') format('woff'),
         url('${fontPath}gotham/gothammedium-webfont.ttf') format('truetype'),
         url('${fontPath}gotham/gothammedium-webfont.svg#gothammediumregular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('${fontPath}gotham/gothamlight-webfont.eot');
    src: url('${fontPath}gotham/gothamlight-webfont.eot?#iefix') format('embedded-opentype'),
         url('${fontPath}gotham/gothamlight-webfont.woff2') format('woff2'),
         url('${fontPath}gotham/gothamlight-webfont.woff') format('woff'),
         url('${fontPath}gotham/gothamlight-webfont.ttf') format('truetype'),
         url('${fontPath}gotham/gothamlight-webfont.svg#gothamlightregular') format('svg');
    font-weight: lighter;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('${fontPath}gotham/gothambold-webfont.eot');
    src: url('${fontPath}gotham/gothambold-webfont.eot?#iefix') format('embedded-opentype'),
         url('${fontPath}gotham/gothambold-webfont.woff2') format('woff2'),
         url('${fontPath}gotham/gothambold-webfont.woff') format('woff'),
         url('${fontPath}gotham/gothambold-webfont.ttf') format('truetype'),
         url('${fontPath}gotham/gothambold-webfont.svg#gothamboldregular') format('svg');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'GothamBook';
    src: url('${fontPath}gotham/gothambook-webfont.eot');
    src: url('${fontPath}gotham/gothambook-webfont.eot?#iefix') format('embedded-opentype'),
         url('${fontPath}gotham/gothambook-webfont.woff2') format('woff2'),
         url('${fontPath}gotham/gothambook-webfont.woff') format('woff'),
         url('${fontPath}gotham/gothambook-webfont.ttf') format('truetype'),
         url('${fontPath}gotham/gothambook-webfont.svg#gothambookregular') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`
export const colors = {
  primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
  secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
  danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
  alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
  success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
  grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#eeeeee', '#ffffff'],
}

export const reverseColors = {}

Object.keys(colors).forEach((key) => {
  reverseColors[key] = [...colors[key]].reverse()
})

export const fonts = {
  primary: 'Gotham, Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
}

export const animations = {
  rotate360: keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `,
}

export const compHeader = css`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex: 0 0 3rem;
  align-items: center;
  margin-top: auto;
  flex-direction: row;
  z-index: 100;
  box-sizing: border-box;
  padding: 1rem;
`
