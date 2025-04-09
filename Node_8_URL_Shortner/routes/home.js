const express = require('express');
const homeRouter = express.Router();
const redirectToOriginalUrl= require('../controllers/home')

homeRouter.get('/:ID',redirectToOriginalUrl);

module.exports = homeRouter;