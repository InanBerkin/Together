const db = require('../../db-config');

module.exports = server => {
    server.post('/api/messaging/pm/send/', (req, res) => {
        const sender_id = req.user.id;
        const receiver_id = req.body.receiver;
        const message = req.body.message;

        db.query('START TRANSACTION').then(() => {
            db.query('INSERT INTO `message` (message_text, sender) VALUES (?, ?)', [message, sender_id])
                .then(() => {
                    db.query('INSERT INTO `messagereceiveaccount` (message_id, account_id) VALUES ((SELECT message_id FROM `message` ORDER BY message_id DESC LIMIT 1), ?)', [receiver_id])
                        .then(() => {
                            db.query('COMMIT').then(console.log('Transaction is committed.'));
                            res.send({ status: 'success', message: 'Successful!' });
                        })
                        .catch(error1 => {
                            console.log(error1);
                            db.query('ROLLBACK').then(console.log('Transaction is rollbacked. [1]'));
                        });
                })
                .catch(error2 => {
                    console.log(error2);
                    db.query('ROLLBACK').then(console.log('Transaction is rollbacked. [2]'));
                });
        });
    });
};
