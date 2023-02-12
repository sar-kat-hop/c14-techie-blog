const router = require('express').Router();

const apiRoutes = require('./api'); //user-routes is in /api folder
const homeRoutes = require ('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;