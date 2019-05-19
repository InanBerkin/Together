const db = require('../../db-config');

module.exports = server => {
    server.post('/api/event/create/', (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const start_time = req.body.starttime;
        const end_time = req.body.endtime;
        const location_lat = req.body.locationlat;
        const location_lng = req.body.locationlng;
        const quota = req.body.quota;
        const city = req.body.city;
        const organizers = req.body.organizers;
        const group_id = req.body.groupid;
        const image = req.body.image;

        db.query('START TRANSACTION').then(() => {
            db.query('INSERT INTO `Event` (name, description, location_lat, location_lng, quota, start_time, end_time, group_event, event_in, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, (SELECT city_id FROM `city` WHERE `name` = ?), ?)', [name, description, location_lat, location_lng, quota, start_time, end_time, group_id, city, image])
                .then(() => {
                    let q = 'INSERT INTO `attend` (account_id, event_id, status) VALUES ';

                    organizers.forEach(element => {
                        q += `(${element}, (SELECT event_id FROM Event ORDER BY event_id DESC LIMIT 1), 3),`;
                    });

                    q = q.substr(0, q.length - 1);

                    db.query(q)
                        .then(() => {
                            db.query('COMMIT').then(console.log('Transaction is committed.'));
                            res.send({ status: 'success', message: 'Successful!' });
                        })
                        .catch(error1 => {
                            console.log(error1);
                            db.query('ROLLBACK').then(console.log('Transaction is rollbacked. [1]'));
                            res.send(401);
                        });
                })
                .catch(error2 => {
                    console.log(error2);
                    db.query('ROLLBACK').then(console.log('Transaction is rollbacked. [2]'));
                    res.send(401);
                });
        });
    });
};
