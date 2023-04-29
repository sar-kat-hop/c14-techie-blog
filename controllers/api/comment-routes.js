const router = require('express').Router();
const { Comment, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {model: User, attributes: ['username']},
            ]
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {model: User, attributes: ['username']},
            ]
        });

        if(!commentData) {
            res.status(404).json({message: 'No comments found for that user.'});
            console.log('No comments could be found for that user.');
            return;
        }

        res.status(200).commentData;
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// // delete comment
// router.delete('/:id', async (req, res) => {
//     try {
//         const commentData = await Comment.destroy({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id,
//             },
//         });

//         if(!commentData) {
//             res.status(404).json({message: 'Comment not found.'});
//             return;
//         }

//         res.status(200).json(commentData);
//     } catch (err) {
//         res.status(500).json(err);
//         console.log(err);
//     }
// });

module.exports = router;