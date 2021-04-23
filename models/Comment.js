const connection = require('../infra/connection');

class Comment {
    store(comment, res) {

        const isCommentValid = comment.comment_text.length >= 5

        const getUserQuery = `SELECT id FROM users WHERE email = '${comment.email}'`

        const commentTrated = {
            user_id: null,
            comment_text: null,
            user_name: null
        }

        // verify if user exists
        connection.query(getUserQuery, (err, results) => {
            if (err) {
                res.status(400).json(err)
            } else {
                const userIdSearch = results[0]
                if (userIdSearch == null) {
                    let message = 'Email não encontrado! Falha ao enviar o comentário'
                    res.render('index', { message: message })
                } else {
                    // código que envia comentário
                    const validation = [{
                        name: 'Comment valid',
                        valid: isCommentValid,
                        message: 'The comment must have at leat 5 chars'
                    }, ]

                    const errors = validation.filter(field => !field.valid)
                    const existsErrors = errors.length

                    if (existsErrors) {
                        res.status(400).json(errors)
                    } else {

                        commentTrated.user_id = results[0].id;
                        commentTrated.comment_text = comment.comment_text;


                        const sql = 'INSERT INTO comments SET ?'

                        connection.query(sql, commentTrated, (err, results) => {
                            if (err) {
                                res.status(400).json(err)
                            } else {
                                let message = 'Comentário adicionado com sucesso'
                                    // res.status(201).json(comment)
                                res.render('', { message: message })
                            }
                        })
                    }
                    //
                }
            }

        })

    }

    commentsList(res) {
        const sql = 'SELECT comments.id, comments.comment_text, users.name FROM comments LEFT JOIN users ON comments.user_id = users.id ORDER BY comments.id DESC'



        connection.query(sql, (err, results) => {

            if (err) {
                res.status(400).json(err)
            } else {

                let comentarios = []


                for (let i = 0; i < results.length; i++) {

                    let comentario = {
                        text: null,
                        user: null,
                    }


                    comentario.text = results[i].comment_text
                    comentario.user = results[i].name
                    comentarios.push(comentario)
                }

                res.render('comments_list', { comentarios: comentarios })
            }

        })
    }
}

module.exports = new Comment();