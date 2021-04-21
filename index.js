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
        app.listen(3000, () => console.log('Server working on port 3000'));
    }
})