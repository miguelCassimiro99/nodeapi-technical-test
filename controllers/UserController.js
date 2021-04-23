const User = require('../models/User');

module.exports = (app) => {
    app.post('/cadastro', (req, res) => {

        const user = req.body;

        User.store(user, res);
    })

    app.post('/login', (req, res) => {
        const user = req.body;
        User.login(user, res, req);
    })
}