module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    published: DataTypes.BOOLEAN
  }, {});
  // Lien entre un commentaire et un utilisateur
  Comment.associate = function (models) {
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};