const router = require('express').Router();

router.use('/google', require('./google'));
// router.use('/github', require('./github'));

router.get('/user', (req, res, next) => {
  res.json(req.user);
})

router.use(function (req, res, next) {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

module.exports = router;
