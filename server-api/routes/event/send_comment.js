const db = require('../../db-config');

module.exports = server => {
    server.post('/api/event/comment/send/', (req, res) => {
        const message = req.body.message;
        const replied_to = req.body.replied_to;
        const comment_at = req.body.comment_at;
        const commented_by = req.user.id;

        db.query('INSERT INTO `Comment` (message, replied_to, commented_by, comment_at) VALUES (?, ?, ?, ?)', [message, replied_to, commented_by, comment_at])
            .then(() => {
                const msg = `Comment '${message}' is sent by account ${commented_by} as a reply to comment ${replied_to} at event ${comment_at}.`;
                console.log(msg);
                res.send({ success: msg });
            })
            .catch(error => {
                console.log(error);
                res.send(401);
            });
    });
};
