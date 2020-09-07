module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {});
  // Lien entre une publication et un utilisateur
  Post.associate = function (models) {
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
};