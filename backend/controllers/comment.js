const models = require('../models');
const utils = require('../utils/utils');

// Récupère tous les commentaires liés à une publication
exports.getPostComments = (req, res) => {
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
                    param = { postId: req.params.id };
                } else {
                    param = { published: 1, postId: req.params.id };
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