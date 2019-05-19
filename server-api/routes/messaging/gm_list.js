const db = require('../../db-config');

module.exports = server => {
    server.get('/api/messaging/gm/list/', (req, res) => {
        const receiver_id = req.user.id;

        db.query('SELECT sender_id, sender_name, sender_image, last_mid, last_mtime, last_msg, is_self FROM `pmlist` WHERE receiver_id = ?', [receiver_id])
            .then(data => {
                console.log(data);
                res.send(data);
            })
            .catch(error => {
                console.log(error);
                res.send(401);
            });
    });
};
