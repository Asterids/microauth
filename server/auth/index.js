const router = require('express').Router();

router.use('/google', require('./google'));

router.get('/user', (req, res, next) => {
  res.json(req.user);
})

router.delete('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(204);
});

router.use(function (req, res, next) {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

module.exports = router;
