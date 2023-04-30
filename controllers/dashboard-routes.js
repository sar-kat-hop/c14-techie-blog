const router = require('express').Router();
const { User, BlogPost } = require('../models');
const { userAuth } = require('../utils/auth');

router.get('/', userAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: BlogPost }],
        });

        if(!user) {
            return res.status(401).json({ message: '\n No user found. User must be logged in to continue. \n'});
        }

        res.status(200).json(user);
        res.render('dashboard', { user });

    } catch (err) {
        console.log('\n Error caught @ line 18, dashboard-routes: Error fetching user: Possibly problem with user authentication: ', err, '\n');

        return res.status(500).json({ message: '\n Error caught @ line 19, dashboard-routes. Server error fetching user. Could be problem with user authentication. \n'})
    }

});

router.get('/edit/:id', userAuth, async (req, res) => {
    try {
        const blogPost = await BlogPost.findOne({
            where: { id: req.params.id },
        });

        if(!blogPost) {
            console.log(`No blog post found by id ${blogPost.id}`);
            res.status(401).json({ message: 'No blog post exists with this id.'});
        }

        const postData = blogPost.get({ plain: true });

        res.render('edit-post', {
            loggedIn: req.session.loggedIn,
            postData,
        });
    } catch (err) {
        res.status(500).json({ message: '\n Error caught in dashboard-routes, ln41. Could not edit blog post. ', err})
    }
})

module.exports = router;