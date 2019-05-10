const db = require('../../db-config');

module.exports = server => {
    server.get('/api/user/friends/requests/', (req, res) => {
        let id = req.user.id;
        db.query('SELECT * FROM FriendRequests WHERE self_id = ?', [id])
            .then(data => {
                console.log(data);
                res.send(data);
            })
            .catch(error => {
                console.log(error);
                res.send(400, []);
            });
    });
};
