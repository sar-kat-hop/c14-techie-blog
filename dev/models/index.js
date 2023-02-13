const User = require('./User');
const Comment = require('./Comment');
// const Poster = require('./Poster');

User.hasMany(Comment);
Comment.belongsTo(User);
// Comment.hasOne(Poster);
// Poster.belongsTo(Comment, { }); // not sure this is needed... goal is just to pull a comment's username

module.exports = { User, Comment };
