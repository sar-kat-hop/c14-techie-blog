const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blog-post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
