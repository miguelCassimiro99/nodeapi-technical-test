const Comment = require('../models/Comment');

module.exports = (app) => {
    app.post('/add_comentario', (req, res) => {
        const comment = req.body;

        Comment.store(comment, res);
    })
}