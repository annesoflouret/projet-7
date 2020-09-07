const models = require('../models');
const utils = require('../utils/utils');

// Récupère tous les posts
exports.getAllPosts = (req, res) => {
    console.log(req.headers.authorization);
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            if (user === null) {
                res.status(400).json({ error: "Utilisateur non trouvé" });
            } else {
                if (user.isAdmin) {
                    const param = {}; // Affichage posts admin
                } else {
                    const param = { published: 1 }; // Affichage posts user
                }
                models.Post.findAll({
                    where: param,
                    include: [{
                        model: models.User,
                        attributes: ['username'],
                    }],
                    order: [['createdAt', 'DESC']] // Classe par ordre décroissant
                })
                    .then(posts => {
                        if (posts.length > null) {
                            res.status(200).json(posts);
                        } else {
                            res.status(404).json({ error: 'Aucune publication' });
                        }
                    })
                    .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
            }
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
}

// Récupère d'un post
exports.getOnePost = (req, res) => {
    models.Post.findOne({
        where: { id: req.params.id }
    })
        .then(post => {
            if (post === null) {
                res.status(400).json({ error: "Aucun post trouvé !" });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));

}

// Création des posts
exports.createPosts = (req, res) => {
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id'],
        where: { id: id }
    })
        .then(user => {
            if (user === null) {
                res.status(400).json({ error: "Utilisateur non trouvé" });
            } else {
                if (req.file != undefined) {
                    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                } else {
                    const imageUrl = null;
                }
                models.Post.create({
                    UserId: id,
                    content: req.body.content,
                    imageUrl: imageUrl
                })
                    .then(() => res.status(201).json({ message: 'Publication enregistrée' }))
                    .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));

            }
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
};

// Permet à l'admin de cacher ou d'afficher un post
exports.updatePostPublished = (req, res) => {
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            if (user === null) {
                res.status(400).json({ error: "Utilisateur non trouvé" });
            } else {
                if (user.isAdmin === false) {
                    res.status(400).json({ error: "Utilisateur n'est pas admin" });
                } else {
                    models.Post.update({
                        published: req.body.published,
                    }, { where: { id: req.params.id } })
                        .then(() => res.status(201).json({ message: 'Publication mis a jour' }))
                        .catch(() => res.status(500).json({ error: 'Publication non mis a jour' }));
                }
            }
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
};