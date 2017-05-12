/* eslint-disable */
const path = require('path');
// const historyApiFallback = require('connect-history-api-fallback')
const express = require('express');
const auth = require('http-auth');

const Sockets = require('./SocketServer.js')
const app = express();

// app.use(historyApiFallback({
//   verbose: false
// }));

app.use(express.static(path.join(process.cwd(), '/dist/')));

const server = app.listen(3000);
let socketServer = new Sockets(server)
socketServer.init();
