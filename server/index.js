const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'development') { require('dotenv').config() }

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const passport = require('passport');

// this session middleware is necessary for persisting a logged-in user
const session = require('express-session');
const sessionStore = require('sessionstore');

// const Sequelize = require('sequelize');
const { db, User } = require('./db');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 },
  store: sessionStore.createSessionStore(),
}));

app.use(passport.initialize());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => done(null, user))
    .catch(done);
});

app.use(passport.session());

app.use('/auth', require('./auth'));

app.get('/allUsers', (req, res, next) => {
    User.findAll({
      attributes: ['id', 'name', 'email']
    })
    .then(users => res.json(users))
    .catch(next)
})

// Need both of the calls below to set up paths for static resource routing.
// Without the static middleware, will see 'Unexpected token <' error when server runs when we try to serve static files
// The line below will allow us to serve files from a directory called 'public' - including, importantly, our bundle.js
app.use(express.static(path.join(__dirname, '..', '/public')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

db.sync()
  .then(() => {
    console.log('Postgres server is up and running!')
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Your server is listening on port ${PORT} in ${NODE_ENV} mode`);
    })
  })
  .catch(console.error)
