const db = require('../../db-config');

module.exports = server => {
    server.post('/api/messaging/pm/send/', async (req, res) => {
        const sender_id = req.user.id;
        const receiver_id = req.body.receiver;
        const message = req.body.message;

        await db.query('START TRANSACTION');

        try {
            await db.query('INSERT INTO `message` (message_text, sender) VALUES (?, ?)', [message, sender_id]);
        } catch (error) {
            console.log(error);
            await db.query('ROLLBACK');
            console.log('Transaction is rollbacked. [1]');
            res.send(401);
            return;
        }
        console.log('after1');

        try {
            console.log('BEN REC: ' + receiver_id);
            await db.query('INSERT INTO `messagereceiveaccount` (message_id, account_id) VALUES ((SELECT message_id FROM `message` ORDER BY message_id DESC LIMIT 1), ?)', [receiver_id]);
        } catch (error) {
            console.log(error);
            await db.query('ROLLBACK');
            console.log('Transaction is rollbacked. [2]');
            res.send(401);
            return;
        }
        console.log('after2');

        await db.query('COMMIT');
        console.log('Transaction is committed.');
        res.send({ status: 'success', message: 'Successful!' });
    });
};
