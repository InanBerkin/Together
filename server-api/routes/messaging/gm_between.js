const db = require('../../db-config');

module.exports = server => {
    server.get('/api/messaging/gm/pages/:group/:start/:end/', (req, res) => {
        const group_id = req.params.group;
        const start_id = req.params.start;
        const end_id = req.params.end;

        db.query('SELECT message_id, time, message_text FROM `gmcard` WHERE group_id = ? AND (message_id BETWEEN ? AND ?)', [group_id, start_id, end_id])
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
