const models = require('../models');

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

exports.getOnePost = (req, res) => {
    models.Post.findOne({  
        where: { id: req.params.id }  
    })
        .then(post =>{
            if(post == null) return res.status(400).json({ error : "Aucun post trouvé !"});
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(400).json(error);
        })
}

exports.createPosts = (req, res) => {
    const postObject = JSON.parse(req.body.post); // on extrait l'objet JSON de notre req.body.article
    post = models.Post.create({   
      UserId : postObject.userId,
      content : postObject.content,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then(() => res.status(201).json({ message: 'Article enregistrée' }))
    .catch(error => res.status(500).json({ message: error + 'Article non enregistrée' }));
  };