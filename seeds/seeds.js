const sequelize = require('../config/connection');
const { User, Comment } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Comment.bulkCreate(commentData, {
    });

    process.exit(0);
};

// const seedDatabase = async () => {
//     await sequelize.sync({force: true});
//     const users = await User.bulkCreate(userData, {
//         individualHooks: true,
//         returning: true,
//     });

//     for (const comment of commentData) {
//         await Comment.create({
//             ...comment,
//             user_id: users[Math.floor(Math.random() * users.length)].id, // not sure if this should be changed to ref user_name instead, since it would make more sense to display the poster's name, not their id #
//         });
//     }

//     process.exit(0);
    
// };

seedDatabase();
