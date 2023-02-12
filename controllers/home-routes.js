const router = require('express').Router();
const { User } = require('../models');
const userAuth = require('../utils/auth');

// user can't view homepage w/o being logged in
router.get('/', userAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [[ 'name', 'ASC' ]],
        });

        const users = userData.map(( info ) => info.get({ plain: true })); 

        res.render('homepage', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500),json(err);
        console.log(err);
    }
});

router.get('/login', (req, res) => {
    // if there's already a session, send req to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;