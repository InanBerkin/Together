const db = require('../../db-config');

module.exports = server => {
    server.post('/api/user/friends/response/', function respond(req, res) {
        const id = req.user.id;
        const status = req.body.status;
        const friend = req.body.friendid;

        if (status === 1 || status === -1) {
            db.query('UPDATE Friends SET status = ? WHERE self_id = ? AND friend_id = ?', [status, id, friend])
                .then(() => {
                    console.log('Friend response: ' + id + ', ' + friend + ', ' + status);
                    res.send({ success: 'success' });
                })
                .catch(error => {
                    console.log(error);
                    res.send(401);
                });
        } else {
            console.log('Wrong status id!');
            res.send(401);
        }
    });
};
