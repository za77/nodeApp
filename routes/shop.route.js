const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('../controllers/shop.controller');

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//   })

// a simple test url to check that all of our files are communicating correctly.
router.get('/get', controller.get);
router.post('/create', controller.create);

module.exports = router;