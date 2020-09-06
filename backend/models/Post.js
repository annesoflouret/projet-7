module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {});
  Post.associate = function (models) {
    // associations can be defined here
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
};