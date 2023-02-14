const router = require("express").Router();
const { User, Comment } = require("../../models");

// const email = document.querySelector(('#login-email').value.trim());
// const password = document.querySelector(('#login-password').value.trim());

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
// router.post('/', async (req, res) => {
//     try {
//         const userData = await User.create(req.body);

//         req.session.save(() => {
//             req.session.user_id = userData.id;
//             req.session.logged_in = true;

//             res.status(200).json(userData);
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// user authentication
// router.post('/login', async (req, res) => {
//     try {
//         // look for user's email in db
//         const userData = await User.findOne({ where: {email: req.body.email} });

//         // if user's email not found...
//         if(!userData) {
//             res
//                 .status(400)
//                 .json({ message: 'Email not found. Please try again.' });
//             return;
//         }

//         // verify password entered matches what's saved in db
//         const passVerified = await userData.checkPassword(req.body.password);

//         // if password can't be verified...
//         if(!passVerified) {
//             res .status(400).json({message: 'Password incorrect. Please try again.'});
//             return;
//         }

//         // create session for logged-in user
//         req.session.save(() => {
//             req.session.user_id = userData.id;
//             req.session.logged_in = true;

//             req.json({ user: userData, message: 'Login successful.'});
//         });

//     } catch (err) {
//         res.status(400).json(err);
//         console.log(err);
//     }
// });

module.exports = router;

const router = require("express").Router();
const { User, Post } = require("../../models");

// Sign Up
router.post("/", async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new post
router.post("/post", async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.body,
            user_id: req.session.userID,
        });

        if (!req.session.loggedIn) {
            res.status(400).json({ message: "Could not log in." });
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
