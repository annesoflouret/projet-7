let models = require('../models');

// Récupère tous les posts
exports.getAllPosts = (req, res) => {
  models.Post.findAll({
      include: [{
          model: models.User,
          attributes: ['username']
      }],
      order: [['createdAt', 'DESC']] // Classe par ordre décroissant
  })
      .then(posts => {
          if (posts.length > null) {
              res.status(200).json(posts)
          } else {
              res.status(404).json({ error: 'Aucune publication' })
          }
      })
      .catch(err => res.status(500).json(err))
}