const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('../models');

// créer un compte
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      models.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        //isAdmin: 0
    });

      return res.status(200).json({ success: 'Utilisateur enregistré !' });

    })
    .catch(error => console.log(error));
};

// Connexion à son compte
exports.login = (req, res, next) => {
  models.User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN,
              { expiresIn: '24h' }
            )
            //isAdmin : user.isAdmin // L'information à propos du status de modérateur de cet utilisateur (pour les fonctionnalités associées)
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Supprimer un compte
exports.deleteUser = (req, res, next) => {
  //const User = UserModelBuilder(sequelize);
  //const Posts = ArticleModelBuilder(sequelize);
  models.User.findOne({ where: { username: req.body.username, email: req.body.email } }) //on recherche le seul utilisateur de la bdd (celui dont l'email correspond à l'email envoyé dans la requête)
      .then(user => {// on doit vérifier si on a récupéré un user ou non
          if (!user) { // si non :
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, user.password) // si oui, on utilise la méthode compare de bcrypt pour comparer le mdp envoyé et le hash de la bdd
              .then(valid => { // on recoit un boolean 
                  if (!valid) {
                      return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  }else {
                          /*///// On supprime les articles de cet utilisateur
                          Posts.findAll({ where:{ idUSERS: req.body.userId } }) // on recherche les objets 
                          .then(posts => { // 
                              //console.log(articles);
                               for (let a in posts){
                                  //console.log(articles[a]);//TEST
                                  const post = posts[a];
                                  //console.log(art.dataValues.file);//TEST
                                  const filename = post.dataValues.file.split('/images/')[1]; //
                                  //console.log(filename); 
                                  fs.unlink(`images/${filename}`, () => { // suppression de l'image ET de l'article
                                      Posts.destroy({ where:{ id: post.dataValues.id } }) // 
                                      .then(() => res.status(200).json({ message: 'Article supprimé !' }))
                                      .catch(error => res.status(400).json({ error : 'articledestroy' }));
                                  });
                              };
                          })
                          .catch(error => res.status(500).json({ error : "pas d'article trouvé articlefindall" }));
                          // On supprime l'utilisateur
                          */
                          models.User.destroy({ where: {email: req.body.email} }) 
                              .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                              .catch(error => res.status(400).json({ error }));
                  }
              })
              .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
};