const express = require('express');
const router = express.Router();

const controller = require('./../controllers/author.controller');

router.get('/get',controller.get);
router.put('/create',controller.create);
module.exports = router;