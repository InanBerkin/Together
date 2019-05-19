const db = require('../../db-config');

module.exports = server => {
    server.get('/api/user/profile/:id/', (req, res) => {
        let id = req.params.id;
        db.query('SELECT first_name, last_name, image_path, bio_text, gender, birthday, location, member_since FROM `Account` WHERE account_id = ?', [id])
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
