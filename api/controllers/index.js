const express = require('express');
const router = express.Router();


// Load each controller
const pedalsController = require('./pedals.js');
const appConfigController = require('./appConfig.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/pedals', pedalsController);
router.use('/application-configuration', appConfigController);


module.exports = router;