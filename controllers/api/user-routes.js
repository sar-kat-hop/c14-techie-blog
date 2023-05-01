const router = require("express").Router();
const { User } = require("../../models");
const { userAuth } = require('../../utils/auth');

// Login
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
                },
            });

        if (!userData) {
            res.status(400).json({ message: "Email invalid. Please check your spelling and try again." });
            return;
        }

        const passwordValid = await userData.checkPassword(req.body.password);

        if (!passwordValid) {
            res.status(400).json({ message: 'Password invalid. Please check your spelling and try again.' });
            return;
        }

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.id;

            res.json({ user: userData, message: "Logged in successfully." });

            console.log("Login successful.");
        });

        } catch (err) {
            res.status(500).json(err);

            console.log('\n Could not log in: ' + err + '\n');
        }
});

// Logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        console.log('\n Logging out. \n');

        req.session.destroy(() => {
            res.status(204).end();
        });

    } else {
        res.status(404).end();
    }
});

// create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

//delete user
// router.delete('/:id', userAuth, async (req, res) => {
//     const userId = req.params.id;

//     if(req.session.logged_in = true && userId == req.session.user_id) {
//         try {
//             const user = User.findOne(userId);
//             const deletedUser = await User.destroy({
//                 where: { id: userId },
//                 returning: true
//             });

//             res.status(200).json(deletedUser);

//             console.log('\n Deleted user: ' + deletedUser.username + '\n');

//         } catch (err) {
//             res.status(500).json({ error: 'Cannot delete user.'}, err);

//             console.log('\n Error deleting user: ' + err + '\n');
//         }
//     } else {
//         res.status(401).json({ message: 'You must be logged in to delete your account.'});
//         res.render('login');

//         console.log('\n User must be logged in to delete their account and can only delete their own account. \n');
//     }
// });

module.exports = router;
