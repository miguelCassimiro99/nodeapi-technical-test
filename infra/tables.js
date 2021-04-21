class Tables {
    init(connection) {
        this.connection = connection;
        this.createUsers();
        this.createComments();
    }
    createUsers() {
        const sql = "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, email varchar(30) NOT NULL, PRIMARY KEY (id))"

        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Users Table created/finded")
            }
        })
    }

    createComments() {
        const sql = "CREATE TABLE IF NOT EXISTS comments (id int NOT NULL AUTO_INCREMENT, comment_text text, user_id int, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id))"

        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Comments Table created/finded")
            }
        })
    }
}

module.exports = new Tables();