const models = require('../models');
const utils = require('../utils/utils');

// Récupère tous les commentaires liés à une publication
exports.getPostComments = (req, res) => {
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'isAdmin'], // Récupération des colones de la DB
        where: { id: id }
    })
        .then(user => {
            if (user === null) {
                res.status(400).json({ error: "Utilisateur non trouvé" });
            } else {
                if (user.isAdmin) { // Condition d'affichage en fonction du compte (admin/user)
                    const param = { postId: req.params.id };
                } else {
                    const param = { published: 1, postId: req.params.id }; // Récupère les commentaires modérés
                }
                models.Comment.findAll({
                    include: [{
                        model: models.User,
                        attributes: ['username'],
                    }],
                    where: param,
                    order: [['createdAt', 'DESC']] // Classe par ordre décroissant
                })
                    .then(comments => {
                        if (comments.length > null) {
                            res.status(200).json(comments)
                        } else {
                            res.status(404).json({ error: 'Aucun commentaire' })
                        }
                    })
                    .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
            }
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
}

// Création commentaire
exports.createComments = (req, res) => {
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id'],
        where: { id: id }
    })
        .then(user => {
            if (user === null) {
                res.status(400).json({ error: "Utilisateur non trouvé" });
            } else {
                comment = models.Comment.create({
                    UserId: id,
                    content: req.body.content,
                    PostId: req.params.id
                })
                    .then(() => res.status(201).json({ message: 'Commentaire enregistrée' }))
                    .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
            }
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
};

// Permet à l'admin de cacher ou d'afficher un commentaire
exports.updateCommentPublished = (req, res) => {
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
                    models.Comment.update({
                        published: req.body.published,
                    }, { where: { id: req.params.id } })
                        .then(() => res.status(201).json({ message: 'Commentaire mis a jour' }))
                        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
                }
            }
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }));
};