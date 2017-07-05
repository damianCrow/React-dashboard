const Showcase = require('./Showcase.js')


// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
class AdminPortal {

  constructor(app, socket) {
    this.app = app
    this.socket = socket

    this.Showcase = new Showcase(app, socket)
  }

}

module.exports = AdminPortal
