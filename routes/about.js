const router = require('express').Router();

router.get('/', function(req, res, next) {
  console.log(res.data)
});

// router.post('/', function (req, res, next) { /* etc */});
// router.put('/:puppyId', function (req, res, next) { /* etc */});
// router.delete('/:puppyId', function (req, res, next) { /* etc */});

module.exports = router;
