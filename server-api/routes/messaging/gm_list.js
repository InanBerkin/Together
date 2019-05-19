const db = require('../../db-config');

module.exports = server => {
    server.get('/api/messaging/gm/list/:group/', (req, res) => {
        const group_id = req.params.group;

        db.query('SELECT * FROM `gmlist` WHERE group_id = ?', [group_id])
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
