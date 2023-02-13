const router = require('express').Router();
const { User, Comment } = require('../../models');
// const userAuth = require('../utils/auth');

// very basic routing for testing
// router.get('/', async (req,res) => {
//     res.render('homepage');
// });

// router.get('/login', async(req,res) => {
//     res.render('login');
// });

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: { include: ['title', 'body', 'date_created']}, 
            order: [['date_created', 'DESC']], // order by newest to oldest
            include: [ // include poster's username
                {
                model: User,
                attributes: ['username'],
                },
            ],
        });

        const comments = commentData.map((comment) => 
            comment.get({ plain: true, nest: true })
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

// router.get('/login', (req, res) => {
//     // if there's already active session, send req to homepage
//     if (req.session.logged_in) {
//         res.redirect('/');
//         return;
//     }
//     // if not logged in, render login view
//     res.render('login');
// });

module.exports = router;