const db = require('../../db-config');

module.exports = server => {
    server.post('/api/group/create/', (req, res) => {
        let name = req.body.name;
        let description = req.body.description;
        let city = req.body.city;
        let categories = req.body.categories;
        let image_path = req.body.image;
        let user_id = req.user.id;

        console.log(categories);

        db.query('START TRANSACTION').then(() => {
            db.query('INSERT INTO `Group` (name, group_in, description, created_by, image_path) VALUES (?, (SELECT city_id FROM `City` WHERE name = ?), ?, ?, ?)', [name, city, description, user_id, image_path])
                .then(() => {
                    let q = 'INSERT INTO `GroupCategory` (group_id, category_id) VALUES ';

                    categories.forEach(element => {
                        q += `((SELECT group_id FROM \`Group\` ORDER BY group_id DESC LIMIT 1), (SELECT category_id FROM Category WHERE name = '${element}')),`;
                    });

                    q = q.substr(0, q.length - 1);

                    console.log(q);

                    db.query(q)
                        .then(() => {
                            db.query("INSERT INTO `member` (account_id, group_id, title, status) VALUES (?, (SELECT group_id FROM `Group` ORDER BY group_id DESC LIMIT 1), 'Group Admin', 3)", [user_id])
                                .then(() => {
                                    db.query('COMMIT').then(console.log('Transaction is committed.'));
                                    res.send({ status: 'success', message: 'Successful!' });
                                })
                                .catch(err => {
                                    console.log(err);
                                    db.query('ROLLBACK').then(console.log('Transaction is rollbacked.1'));
                                });
                        })
                        .catch(error => {
                            console.log(error);
                            db.query('ROLLBACK').then(console.log('Transaction is rollbacked.2'));
                        });
                })
                .catch(() => {
                    db.query('ROLLBACK').then(console.log('Transaction is rollbacked.3'));
                });
        });
    });
};
