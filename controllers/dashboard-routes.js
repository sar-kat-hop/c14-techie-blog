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
            res.status(401).json({ message: '\n No user found. User must be logged in to continue. \n'});

            console.log('\n Error fetching user. \n');
        }

        res.status(200).json({ message: 'Fetched user. '}, user);
        res.render('dashboard', { user });

    } catch (err) {
        res.status(500).json({ message: 'Server error fetching user. Could be problem with user authentication.'})
        
        console.log('\n Error fetching user: Possibly problem with user authentication: ', err, '\n');
    }

});

router.get('/post', userAuth, async (req, res) => {
    try {
        res.render('post', {
            loggedIn: req.session.loggedIn,
        });
        
        console.log('\n User logged in. Rendering post view. \n');
        res.status(200).json();
        
    } catch (err) {
        res.status(500).json({ message: 'Error rendering post view: '}, err);

        console.log('\n Error rendering post view: ' + err + '\n');
    }
})

router.get('/edit/:id', userAuth, async (req, res) => {
    try {
        const blogPost = await BlogPost.findOne({
            where: { id: req.params.id },
            returning: true
        });

        if(!blogPost) {
            res.status(401).json({ message: 'No blog post exists with this id.'});

            console.log(`No blog post found with id ${blogPost.id}`);
        }

        const postData = blogPost.get({ plain: true });

        res.render('edit-post', {
            loggedIn: req.session.loggedIn,
            postData,
        });
    } catch (err) {
        res.status(500).json({ message: '\n Error caught in dashboard-routes, ln41. Could not edit blog post. ', err});

        console.log('\n Error editing blog post: ' + err + '\n');
    }
})

module.exports = router;