const db = require('../../db-config');

module.exports = server => {
    server.post('/api/signup/', function respond(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;

        console.log(username);
        console.log(password);
        console.log(email);

        db.query('INSERT INTO account (username, email, passwd) VALUES (?, ?, SHA2(?, 256))', [username, email, password])
            .then(data => {
                res.send({ status: 'success', message: 'Successful!' });
            })
            .catch(error => {
                res.send(401, { status: 'error', message: 'Error!' });
            });
    });
};
