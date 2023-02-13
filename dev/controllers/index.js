const router = require('express').Router();

const homeRoutes = require ('./home-routes');
const apiRoutes = require('./api'); //user-routes and comment-routes are in /api folder

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;