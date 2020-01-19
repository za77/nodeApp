const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const userController = require('../controllers/user.controller');

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//   })

// a simple test url to check that all of our files are communicating correctly.
router.post('/login', userController.login);
router.get('/list', userController.get);
router.put('/create', userController.create);
router.delete('/delete', userController.delete);


module.exports = router; 