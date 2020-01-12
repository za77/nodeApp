const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//   })

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
router.post('/create', product_controller.create);
router.get('/get', product_controller.get);

module.exports = router;