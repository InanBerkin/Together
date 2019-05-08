const db = require('../../db-config');

module.exports = server => {
    server.get('/api/user/myprofile/', (req, res, next) => {
        console.log(req);
        let id = req.user.id;

        db.query('SELECT * FROM `Account` WHERE account_id = ?', [id])
            .then(data => {
                console.log(data[0]);
                res.send(data[0]);
            })
            .catch(error => {
                console.log(error);
                res.send(400, {});
            });
    });
};
