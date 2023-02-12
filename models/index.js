const User = require('./User');
const Comment = require('./Comment');

Comment.belongsTo(User),
User.hasMany(Comment);

module.exports = { User, Comment };
