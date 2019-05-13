const db = require('../../db-config');

module.exports = server => {
    server.post('/api/event/comment/remove/', (req, res) => {
        const comment_id = req.body.comment_id;

        db.query('DELETE FROM `Comment` WHERE comment_id = ?', [comment_id])
            .then(() => {
                const msg = `Comment '${message}' is deleted.`;
                console.log(msg);
                res.send({ success: msg });
            })
            .catch(error => {
                console.log(error);
                res.send(401);
            });
    });
};
