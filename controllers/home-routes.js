const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const userAuth = require('../utils/auth');

//login route
// router.get('/login', (req, res) => {
//     try {
//         if (!req.session.loggedIn) {
//             res.render('login');
//             console.log('\n User not logged in. Rendering login view.');
            
//         } else {
//             console.log('\n User logged in. Rendering dashboard.');
//             res.redirect('/dashboard');  
//         }
//     } catch (err) {
//         console.log('\n Error with login route: ' + err + '\n')
//     }
// });

router.get('/', async (req, res) => {
    res.render('homepage');
    try {
        const postData = await BlogPost.findAll({
            include: User,
        });

        // if(!postData) {
        //     res.status(400).json({ message: 'No posts found.'});
        //     console.log('No posts found.');
        //     //still render homepage even if no posts found?
        //     res.render('homepage', {
        //         loggedIn: req.session.loggedIn,
        //     });
        // }

        const blogPosts = postData.map((blogPosts) => {
            blogPosts.get({ plain: true })
        });

        res.render('homepage', {
            blogPosts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json({ message: '\n Error fetching posts on home route: ', err});
        console.log('\n Could not fetch and map posts on home route: ' + err + '\n')
    }
});

module.exports = router;