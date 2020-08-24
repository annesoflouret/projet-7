let models = require('../models');

// Récupère tous les posts
exports.getAllPosts = (req, res) => {
    //const Posts = ArticleModelBuilder(sequelize);
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

/*  // Récupère un post
exports.getOnePost = (req, res) => {
    models.post.findOne({

    })
}*/

exports.createPosts = (req, res, next) => {
    //const Posts  = ArticleModelBuilder(sequelize);
    //const articleObject = JSON.parse(req.body.article); // on extrait l'objet JSON de notre req.body.article
    const posts = new Posts({ // on crée une instance de notre classe Sauce
      userId : articleObject.userId,
      title : articleObject.title,
      text : articleObject.text,
      file : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    article.save()
      .then(() => res.status(201).json({ message: 'Article enregistrée' }))
      .catch(error => res.status(400).json({ error : "erreur createArticle" }));
  };