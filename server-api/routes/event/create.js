const db = require('../../db-config');

module.exports = server => {
    server.post('/api/event/create/', (req, res) => {
        let name = req.body.name;
        let description = req.body.description;
        let start_time = req.body.starttime;
        let end_time = req.body.endtime;
        let location_lat = req.body.locationlat;
        let location_lng = req.body.locationlng;
        let quota = req.body.quota;
        let city = req.body.city;
        let organizers = eval('(' + req.body.organizers + ')');
        let group_id = req.body.groupid;

        db.query('START TRANSACTION').then(() => {
            db.query('INSERT INTO `Event` (name, description, location_lat, location_lng, quota, start_time, end_time, group_event, event_in) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, description, location_lat, location_lng, quota, start_time, end_time, group_id, city])
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
