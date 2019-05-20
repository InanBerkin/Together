const db = require('../../db-config');

module.exports = server => {
    server.get('/api/messaging/pm/pages/:sender/:start/:end/', (req, res) => {
        const receiver_id = req.user.id;
        const sender_id = req.params.sender;
        const start_id = req.params.start;
        const end_id = req.params.end;

        db.query('SELECT message_id, time, message_text FROM `pmcard` WHERE receiver_id IN (?, ?) AND sender_id IN (?, ?) AND (message_id BETWEEN ? AND ?)', [sender_id, receiver_id, sender_id, receiver_id, start_id, end_id])
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
