const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('../models');

// créer un compte
exports.signup = (req, res, next) => {
  // Vérification des paramètres de l'inscription
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
  const regexPassword = /((?=.*[a-z])(?=.*[A-Z]).{6,10})/


  if (email == null || email == '' || 
      username == null || username == '' ||
      password == null || password == '') {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' })
  }
   
  if (regexEmail.test(email) == false) { return res.status(400).json({ error: 'L\'email est invalide'})}
  if (regexPassword.test(password) == false) { return res.status(400).json({ error: 'Le mot de passe doit contenir entre 6 et 10 caratères et au moins une majuscule et une minuscule'})}



  models.User.findOne({ 
    attributes: ['email'],
    where: { email: req.body.email }  
  })
  .then(user => { 
    if(user != null) return res.status(400).json({ message: 'Cette adresse mail existe déjà' });
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        models.User.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        })
        .then(() => res.status(201).json({ message: 'Utilisateur enregistrée' }))
        .catch(error => res.status(500).json({ message: error + 'Utilisateur non enregistrée' }));
      })
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
            token: jwt.sign(
              { 
                userId: user.id,
                isAdmin: user.isAdmin
              },
              process.env.TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Supprimer un compte
exports.deleteUser = (req, res, next) => {
  models.User.findOne({ where: { username: req.body.username, email: req.body.email } }) //recherche d'un user
      .then(user => {
          if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => { 
                  if (!valid) {
                      return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  }else {
                          models.User.destroy({ where: {email: req.body.email} }) 
                              .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                              .catch(error => res.status(400).json({ error }));
                  }
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};