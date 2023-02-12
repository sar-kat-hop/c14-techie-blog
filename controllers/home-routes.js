const router = require('express').Router();
const { User, Comment } = require('../models');
const userAuth = require('../utils/auth');

// get all comments on homepage for logged-in user only
router.get('/', userAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                model: User,
                attributes: ['user_name', 'date_created'],
                },
            ],
        });

        const comments = commentData.map((comment) => 
            comment.get({ plain: true })
            );
            res.render('homepage', {
                comments,
                logged_in: req.session.logged_in,
            });
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
});

router.get('/login', (req, res) => {
    // if there's already active session, send req to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;