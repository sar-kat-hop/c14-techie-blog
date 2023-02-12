const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Comment, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_name'
});

module.exports = { User };
