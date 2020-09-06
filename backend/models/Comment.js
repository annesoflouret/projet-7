module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    published: DataTypes.BOOLEAN
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};