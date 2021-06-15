const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./html');

// Routes to API and HTML
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;
