const router = require('express').Router();
const { BlogPost } = require('../../models');
const { userAuth } = require('../../utils/auth');
const Sequelize = require('sequelize'); //for Sequelize.NOW method

//fetch all blog posts
router.get('/', async (req, res) => {
    try {
        const postData = await BlogPost.findAll();
        res.status(200).json({ message: '\n Fetched posts: \n'}, postData);

        console.log('\n Fetched posts. \n');

    } catch (err) {
        res.status(500).json({ message: '\n Error getching posts: \n'}, err);

        console.log('\n Error fetching posts: ' + err + '\n');
    }
});

//fetch single blog post
// router.get('/:id', userAuth, async (req, res) => {
//     try {
//         const blogPost = await BlogPost.findOne({
//             where: { id: req.params.id },
//             include: [
//                 User, { model: Comment, include: [User] },
//             ],
//             returning: true
//         });

//         if(!blogPost) {
//             res.status(401).json({ message: '\n Blog post not found: ', err})

//             console.log('\n Post not found. Id may not exist or user is not logged in. \n');
//         }

//         const postData = blogPost.get({ plain: true });
//         res.render('blog-post', {
//             loggedIn: req.session.loggedIn,
//             postData,
//         });

//     } catch (err) {
//         res.status(500).json({ message: '\n Post data not found: ', err});

//         console.log('\n Error getting single blog post data: ' + err + '\n');
//     }
// });

//create blog post
router.post('/', userAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await BlogPost.create(req.body, {
            user_id: req.session.user_id,
            dateCreated: Sequelize.NOW,
            returning: true
        });

        res.status(200).json(newPost);

        console.log('\n Created new post: ' + newPost.title + 'at ' + newPost.dateCreated + '\n');

    } catch (err) {
        res.status(500).json({ message: '\n Error creating new blog post: '}, err);

        console.log('\n Error creating new blog post: ' + err + '\n');
    }
});

//edit a blog post
router.put('/:id', userAuth, async(req, res) => {
    try {
        const { title, content } = req.body;
        const editedPost = await BlogPost.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });

        res.send('/dashboard');
        res.status(200).json({ message: '\n Updated blog post. '}, editedPost.title);

        console.log('\n Successfully updated blog post: ' + editedPost.title + '\n');

    } catch (err) {
        res.status(500).json({ message: '\n Error editing blog post: '}, err);
    }
});

//delete a blog post
router.delete('/:id', userAuth, async (req, res) => {
    try {
        const deletedPost = await BlogPost.destroy({ where: { id: req.params.id }, returning: true });
        res.status(200).json({ message: 'Deleted post.'});
        res.send('/dashboard'); 

        console.log('\n Deleted blog post, ID: ' + deletedPost.id + ', title: ' + deletedPost.title);

    } catch (err) {
        res.status(500).json({ message: 'Error deleting blog post: '}, err);

        console.log('\n Error deleting blog post: ' + err + '\n');
    }
});

module.exports = router;