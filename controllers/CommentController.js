const Comment = require('../models/Comment');

module.exports = (app) => {

    app.get('/busca_comentarios', (req, res) => {

        Comment.commentsList(res)
    })


    app.post('/add_comentario', (req, res) => {
        const comment = req.body;

        Comment.store(comment, res);
    })
}