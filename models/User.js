const connection = require('../infra/connection')

class User {
    store(user, res) {
        const isUserNameValid = user.name.length >= 5
        const isUserEmailValid = user.email.length >= 5

        const validations = [{
            name: 'Name',
            valid: isUserNameValid,
            message: 'Users name must hav at least 5 chars'
        }, {
            name: 'Email',
            valid: isUserEmailValid,
            message: 'Users email must hav at least 5 chars'
        }]

        const errors = validations.filter(field => !field.valid)
        const existsErrors = errors.length

        if (existsErrors) {
            res.status(400).json(errors);
        } else {

            const sql = 'INSERT INTO users SET ?'

            connection.query(sql, user, (err, results) => {
                if (err) {
                    res.status(400).json(err);
                    console.log(err)
                } else {
                    let userId = results.insertId;
                    res.status(201).json(userId);
                }
            })
        }
    }
}

module.exports = new User();