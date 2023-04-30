const userAuth = (req, res, next) => {
    // redirect user to login if not logged in
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

//bcrypt authentication alternative
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { User } = require('../models');

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ where: { id: decoded.id }});

//         if(!user) {
//             res.status(500).json({ message: 'Could not authenticate user.'});
//             console.log('\n Error authenticating user. \n');
//         }
//         req.user = user;
//         next(); 
//     } catch (err) {
//         console.log('\n Error caught in auth.js, ln28. Authorization unsuccessful: ', err, '\n');
//         return res.status(401).json({ message: 'Unauthorized. User must be logged in to continue.'})
//     }
// };

// module.exports = auth;
module.exports = userAuth;
