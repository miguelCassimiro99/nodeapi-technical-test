const connection = require('../infra/connection');

class Comment {
    store(comment, res) {

        const isCommentValid = comment.comment_text.length >= 5

        const getUserQuery = `SELECT id FROM users WHERE id = ${comment.user_id}`

        // verify if user exists
        connection.query(getUserQuery, (err, results) => {
            if (err) {
                res.status(400).json(err)
            } else {
                const userIdSearch = results[0]
                if (userIdSearch == null) {
                    res.status(422).json('User not found or allowed')
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

                        const sql = 'INSERT INTO comments SET ?'

                        connection.query(sql, comment, (err, results) => {
                            if (err) {
                                res.status(400).json(err)
                            } else {
                                res.status(201).json(comment)
                            }
                        })
                    }
                    //
                }
            }

        })

        // working

        // const validation = [{
        //     name: 'Comment valid',
        //     valid: isCommentValid,
        //     message: 'The comment must have at leat 5 chars'
        // }, ]

        // const errors = validation.filter(field => !field.valid)
        // const existsErrors = errors.length

        // if (existsErrors) {
        //     res.status(400).json(errors)
        // } else {

        //     const sql = 'INSERT INTO comments SET ?'

        //     connection.query(sql, comment, (err, results) => {
        //         if (err) {
        //             res.status(400).json(err)
        //         } else {
        //             res.status(201).json(comment)
        //         }
        //     })
        // }

        // working end

    }
}

module.exports = new Comment();