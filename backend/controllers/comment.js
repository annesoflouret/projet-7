const models = require('../models');

// Récupère tous les posts
exports.getAllComments = (req, res) => {
  console.log(req.params.id);
  models.Comment.findAll({
      include: [{
          model: models.User,
          attributes: ['username'],
      }],
      where: { postId: req.params.id },
      order: [['createdAt', 'DESC']] // Classe par ordre décroissant
  })
      .then(comments => {
          if (comments.length > null) {
              res.status(200).json(comments)
          } else {
              res.status(404).json({ error: 'Aucun commentaire' })
          }
      })
      .catch(err => console.log(err))
}

exports.createComments = (req, res) => {
    comment = models.Comment.create({
      UserId : req.body.userId,
      content : req.body.content,
      PostId: req.params.id
    })
    .then(() => res.status(201).json({ message: 'Article enregistrée' }))
    .catch(error => res.status(500).json({ message: error + 'Article non enregistrée' }));
  };