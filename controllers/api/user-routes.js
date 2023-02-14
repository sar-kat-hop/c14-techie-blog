const router = require("express").Router();
const { User, Comment } = require("../../models");

// Login
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
                },
            });

        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password. Please try again! 1" });
            return;
        }

        const passwordValid = await userData.checkPassword(req.body.password);

        if (!passwordValid) {
            res.status(400).json({ message: "Incorrect email or password. Please try again! 2" });
            return;
        }

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.userID = userData.id;
            console.log("login successful");
            res.json({ user: userData, message: "Logged in successfully" });
        });
        } catch (err) {
            res.status(500).json(err);
        }
});

// Logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
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

// Create new post
router.post("/comment", async (req, res) => {
    try {
        const commentData = await Comment.create({
            user_id: req.session.userID,
            title: req.body.title,
            body: req.body.body,
            date_created: req.session.date_created,
        });

        if (!req.session.logged_in) {
            res.status(400).json({ message: "Could not post comment." });
            console.log('Failed to post comment.');
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
