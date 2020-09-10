const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const utils = require('../utils/utils');

// créer un compte
exports.signup = (req, res) => {
  // Vérification des paramètres de l'inscription
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
  const regexPassword = /((?=.*[a-z])(?=.*[A-Z]).{6,10})/;

  if (email === null || email === '' ||
    username === null || username === '' ||
    password === null || password === '') {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
  }

  if (regexEmail.test(email) === false) { return res.status(400).json({ error: 'L\'email est invalide' }); }
  if (regexPassword.test(password) === false) { return res.status(400).json({ error: 'Le mot de passe doit contenir entre 6 et 10 caratères et au moins une majuscule et une minuscule' }); }

  models.User.findOne({
    attributes: ['email'],
    where: { email: req.body.email }
  })
    .then(user => {
      if (user != null) {
        res.status(400).json({ message: 'Cette adresse mail existe déjà' });
      } else {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            models.User.create({
              username: req.body.username,
              email: req.body.email,
              password: hash,
            })
              .then(() => res.status(201).json({ message: 'Utilisateur enregistrée' }))
              .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
          })
          .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
      }
    })
    .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
};

// Connexion à son compte
exports.login = (req, res) => {
  models.User.findOne({
    attributes: ['id', 'email', 'username', 'isAdmin', 'password'],
    where: { email: req.body.email }
  })
    .then(user => {
      if (!user) {
        res.status(401).json({ error: 'L\'email ou le mot de passe n\'existe pas!' });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              res.status(401).json({ error: 'L\'email ou le mot de passe n\'existe pas!' });
            } else {
              res.status(200).json({
                userId: user.id,
                isAdmin: user.isAdmin,
                username: user.username,
                token: jwt.sign(
                  {
                    userId: user.id,
                  },
                  process.env.TOKEN,
                  { expiresIn: '24h' }
                )
              });
            }
          })
          .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
      }
    }).catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
}

// Supprimer un compte
exports.deleteUser = (req, res) => {
  const id = utils.getUserId(req.headers.authorization);
  models.User.findOne({
    attributes: ['id'],
    where: { id: id }
  }).then(user => {
    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé !' });
    } else {
      models.User.destroy({ where: { id: id } })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
    }
  })
    .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
};