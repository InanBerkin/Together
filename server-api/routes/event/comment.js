const db = require('../../db-config');

module.exports = server => {
    server.get('/api/event/comment/:id/', async (req, res) => {
        let event_id = req.params.id;

        db.query('SELECT * FROM `CommentCard` WHERE comment_at = ?', [event_id])
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
