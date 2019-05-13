const db = require('../../db-config');

module.exports = server => {
    server.get('/api/group/members/:id/', (req, res) => {
        let id = req.params.id;
        db.query('SELECT * FROM GroupMemberList group_id = ?', [id])
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
