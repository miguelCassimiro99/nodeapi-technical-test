const customExpress = require('./config/customExpress.js');

//DATABASE
const connection = require('./infra/connection');
const Tables = require('./infra/tables');

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected with success');

        Tables.init(connection);

        const app = customExpress();

        // navigation
        app.get('', (req, res) => {
            res.render('index', { message: '' })
        })

        app.get('/register', (req, res) => {
            res.render('register')
        })

        app.get('/new_comment', (req, res) => {
            res.render('new_comment')
        })

        app.get('/comments_list', (req, res) => {
            res.render('comments_list', { comentarios: '' })
        })


        app.listen(3000, () => console.log('Server working on port 3000'));
    }
})