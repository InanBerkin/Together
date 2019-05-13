const db = require('../../db-config');

module.exports = server => {
    server.post('/api/group/member/remove/', (req, res) => {
        const group_id = req.body.group_id;
        const member_id = req.body.member_id;

        db.query('UPDATE `Member` SET status = -1 WHERE group_id = ? AND account_id = ?', [group_id, member_id])
            .then(() => {
                const msg = `User ${member_id} is removed from group ${group_id}.`;
                console.log(msg);
                res.send({ success: msg });
            })
            .catch(error => {
                console.log(error);
                res.send(401);
            });
    });
};
