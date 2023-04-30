const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');
const Sequelize = require('sequelize'); //for dateCreated sequelize.NOW
const { userAuth } = require ('../../utils/auth');

//fetch comments and map logged-in user's comments
//maybe add authentication requirement for all routes?
router.get('/my-comments', userAuth, async (req, res) => {
    try {

        if(!req.session.loggedIn) {
            // res.redirect('/homepage');
            res.status(401).json({ message: 'User must be logged in to continue.'});
            console.log('\n User must be logged in to continue. \n');
            res.render('login');
        } //testing without else statement

        const commentData = await Comment.findAll({
            include: [
                { model: User },
            ],
            returning: true
        });

        console.log('\n commentData: ' + commentData + '\n');

        const mappedComments = comments.map((comment) => ({
            id: comment.id,
            text: comment.text,
            user_id: req.session.user_id
            // username: comment.User.username,
        }));

        res.status(200).json(mappedComments);

    } catch (err) {
        res.status(500).json({ message: 'Error fetching and/or mapping comments: '}, err);

        console.log('\n Error fetching and/or mapping comments: ' + err + '\n');
    }
});

//update a comment
router.put('/:id', async (req, res) => {
    try {

        if(!req.session.loggedIn) {
            // res.redirect('/homepage');
            res.status(401).json({ message: 'User must be logged in to continue.'});
            console.log('\n User must be logged in to continue. \n');
            res.render('login');
        } else {

            const comment = await Comment.findOne(req.params.id);
            if(!comment) {
                res.status(400).json({ error: 'No comment found.'});

                console.log('\n Could not find comment. \n');
            }

            const updatedComment = await comment.save(req.body.text);
            res.status(200).json(updatedComment);

            console.log('\n Updated comment: ' + comment + '\n');
        };
    } catch (err) {
        res.status(500).json({ error: 'Could not update comment.'});

        console.log('\n Could not update comment: ' + err + '\n');
    }
});

//make a new comment
router.post('/', async (req, res) => {
    try {
        const userId = req.session.user_id;
        const { text, post_id } = req.body;
        
        const postId = await BlogPost.findOne(post_id);
        console.log(postId);

        if(!postId) {
            res.status(400).json({ error: 'Post id not found. Cannot add comment.'});

            console.log('\n Post id not found. \n');
        }

        const newComment = await Comment.create({
            text,
            post_id,
            user_id: userId,
            dateCreated: Sequelize.NOW,
            returning: true
        });

        res.status(200).json(newComment);

        console.log('Posted new comment: ' + newComment.text + '\n' + 'at ' + newComment.dateCreated);

    } catch (err) {
        res.status(500).json({ error: 'Could not post new comment.'}, err);

        console.log('\n Could not post new comment: ' + err + '\n');
    }
});

//delete a comment
router.delete('/:id', async (req, res) => {
    try {

        if(!req.session.loggedIn) {
            // res.redirect('/homepage');
            res.status(401).json({ message: 'User must be logged in to continue.'});
            console.log('\n User must be logged in to continue. \n');
            res.render('login');
        } //testing without else statement

        const comment = await findOne(req.params.id);
        if (!comment) {
            res.status(400).json({ error: 'Comment id not found.'});

            console.log('\n Comment id not found. \n');
        }

        const deletedComment = await comment.destroy();

        res.status(200).json();

        console.log('\n Deleted comment: ' + deletedComment.id + '\n');

    } catch (err) {
        res.status(500).json({ error: 'Could not delete comment.'}, err);

        console.log('\n Could not delete comment: ' + err + '\n');
    }
});

module.exports = router;