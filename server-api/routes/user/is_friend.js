const db = require('../../db-config');

module.exports = server => {
    server.get('/api/user/friends/check/:friend_id/', (req, res) => {
        const id = req.user.id;
        const friend_id = req.params.friend_id;

        const smaller = Math.min(id, friend_id);
        const bigger = Math.max(id, friend_id);

        db.query('SELECT * FROM `FriendList` WHERE `friend_id1` = ? AND `friend_id2` = ?', [smaller, bigger])
            .then(data => {
                const result = { is_friend: data.length !== 0 };
                console.log(result);
                res.send(result);
            })
            .catch(error => {
                console.log(error);
                res.send(401);
            });
    });
};
