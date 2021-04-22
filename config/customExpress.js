const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = () => {
    const app = express();

    app.set('view engine', 'ejs')

    app.use(session({
        secret: '123 mudar',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    }))


    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())

    consign()
        .include('controllers')
        .into(app)

    return app;
}