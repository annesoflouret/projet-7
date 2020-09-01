const models = require('../models');
const utils = require('../utils/utils')

// Récupère tous les posts
exports.getAllPosts = (req, res) => {
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'isAdmin'],
        where: { id: id }
    }).then(user => {
        if (user == null) {
            return res.status(400).json({ error: "Utilisateur non trouvé" });
        } else {
            if (user.isAdmin) {
                param = {};
            } else {
                param = { published: 1 };
            }
            models.Post.findAll({
                where: param,
                include: [{
                    model: models.User,
                    attributes: ['username'],
                }
                ],
                order: [['createdAt', 'DESC']] // Classe par ordre décroissant
            })
                .then(posts => {
                    if (posts.length > null) {
                        res.status(200).json(posts)
                    } else {
                        res.status(404).json({ error: 'Aucune publication' })
                    }
                })
                .catch(err => console.log(err))
        }
    })
        .catch(error => res.status(500).json(console.log(error)));
}

exports.getOnePost = (req, res) => {
    models.Post.findOne({
        where: { id: req.params.id }
    })
        .then(post => {
            if (post == null) return res.status(400).json({ error: "Aucun post trouvé !" });
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(400).json(error);
        })
}

exports.createPosts = (req, res) => {
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id'],
        where: { id: id }
    })
        .then(user => {
            if (user == null) {
                return res.status(400).json({ error: "Utilisateur non trouvé" });
            } else {
                if (req.file != undefined) {
                    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                } else {
                    imageUrl = null;
                }
                post = models.Post.create({
                    UserId: id,
                    content: req.body.content,
                    imageUrl: imageUrl
                })
                    .then(() => res.status(201).json({ message: 'Article enregistrée' }))
                    .catch(error => res.status(500).json({ message: error + 'Article non enregistrée' }));
            }
        })
        .catch(error => res.status(500).json(console.log(error)));
};

exports.updatePostPublished = (req, res) => {
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            if (user == null) {
                return res.status(400).json({ error: "Utilisateur non trouvé" });
            } else {
                if (user.isAdmin == false) {
                    return res.status(400).json({ error: "Utilisateur n'est pas admin" });
                }
                models.Post.update({
                    published: req.body.published,
                }, { where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'Article mis a jour' }))
                    .catch(error => res.status(500).json({ message: error + 'Article non mis a jour' }))
            }
        })
        .catch(error => res.status(500).json(console.log(error)));
};