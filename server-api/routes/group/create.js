const db = require('../../db-config');

module.exports = server => {
    server.post('/api/group/create/', (req, res) => {
        let name = req.body.name;
        let description = req.body.description;
        let city = req.body.city;
        let categories = eval('(' + req.body.categories + ')');
        let user_id = req.user.id;

        db.query('START TRANSACTION').then(() => {
            db.query('INSERT INTO `Group` (name, group_in, description) VALUES (?, (SELECT city_id FROM `City` WHERE name = ?), ?)', [name, city, description])
                .then(() => {
                    let q = 'INSERT INTO `GroupCategory` (group_id, category_id) VALUES ';

                    categories.forEach(element => {
                        q += `((SELECT group_id FROM \`Group\` ORDER BY group_id DESC LIMIT 1), (SELECT category_id FROM Category WHERE name = '${element}')),`;
                    });

                    q = q.substr(0, q.length - 1);

                    db.query(q)
                        .then(() => {
                            db.query("INSERT INTO `member` (account_id, group_id, title, status) VALUES (?, (SELECT group_id FROM `Group` ORDER BY group_id DESC LIMIT 1), 'Group Admin', 3)", [user_id])
                                .then(() => {
                                    db.query('COMMIT').then(console.log('Transaction is committed.'));
                                    res.send({ status: 'success', message: 'Successful!' });
                                })
                                .catch(() => {
                                    db.query('ROLLBACK').then(console.log('Transaction is rollbacked.'));
                                });
                        })
                        .catch(() => {
                            db.query('ROLLBACK').then(console.log('Transaction is rollbacked.'));
                        });
                })
                .catch(() => {
                    db.query('ROLLBACK').then(console.log('Transaction is rollbacked.'));
                });
        });
    });
};
