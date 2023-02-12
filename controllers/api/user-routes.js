const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // look for user's email in db
        const userData = await User.findOne({ where: {email: req.body.email} });

        // if user's email not found...
        if(!userData) {
            res
                .status(400)
                .json({ message: 'Email not found. Please try again.' });
            return;
        }
    
        // verify password entered matches what's saved in db
        const passVerified = await userData.checkPassword(req.body.password);

        // if password can't be verified...
        if(!passVerified) {
            res .status(400).json({message: 'Password incorrect. Please try again.'});
            return;
        }

        // create session for logged-in user
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            req.json({ user: userData, message: 'Login successful.'});
        });

    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// logout
router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        // remove session vars
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
        console.log('Error logging out');
    }
});

// create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;