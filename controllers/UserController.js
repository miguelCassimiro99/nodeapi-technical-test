const users = require('../models/User');
const User = require('../models/User');

module.exports = (app) => {
    app.post('/cadastro', (req, res) => {

        const user = req.body;

        User.store(user, res);
    })
}