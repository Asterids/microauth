const path = require('path');
const express = require('express');
const carpoApp = express();

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
carpoApp.use(express.static(path.join(__dirname, './path')))

// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
carpoApp.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
