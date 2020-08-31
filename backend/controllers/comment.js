const models = require('../models');
const utils = require('../utils/utils')

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
    const id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id'],
        where: { id: id }
    })
        .then(user => {
            console.log(user);
            if (user == null) {
                return res.status(400).json({ error: "Utilisateur non trouvé" });
            } else {
                comment = models.Comment.create({
                    UserId: id,
                    content: req.body.content,
                    PostId: req.params.id
                })
                    .then(() => res.status(201).json({ message: 'Commentaire enregistrée' }))
                    .catch(error => res.status(500).json({ message: error + 'Commentaire non enregistrée' }));
            }
        })
        .catch(error => res.status(500).json(console.log(error)));
};