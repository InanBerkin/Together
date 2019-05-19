const db = require('../../db-config');

async function createLocation(country, city) {
    const country_exist = await db.query('SELECT * FROM `country` WHERE name = ?', [country]);

    if (country_exist.length !== 1) {
        await db.query('INSERT INTO `country` (name) VALUES (?)', [country]);
        await db.query('INSERT INTO `city` (name, in_country) VALUES (?, (SELECT country_id FROM `country` ORDER BY country_id DESC LIMIT 1))', [city]);
        const data = await db.query('(SELECT city_id FROM `city` ORDER BY city_id DESC LIMIT 1)');
        return data[0].city_id;
    } else {
        const country_id = country_exist[0].country_id;
        const city_exist = await db.query('SELECT * FROM `city` WHERE name = ? AND in_country = ?', [city, country_id]);

        if (city_exist.length !== 1) {
            await db.query('INSERT INTO `city` (name, in_country) VALUES (?, ?)', [city, country_id]);
            const data = await db.query('(SELECT city_id FROM `city` ORDER BY city_id DESC LIMIT 1)');
            return data[0].city_id;
        } else {
            return city_exist[0].city_id;
        }
    }
}

module.exports = server => {
    server.post('/api/event/create/', async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const start_time = req.body.starttime;
        const end_time = req.body.endtime;
        const location_lat = req.body.locationlat;
        const location_lng = req.body.locationlng;
        const quota = req.body.quota;
        const city = req.body.city;
        const country = req.body.country;
        const organizers = req.body.organizers;
        const group_id = req.body.groupid;
        const image = req.body.image;

        const city_id = await createLocation(country, city);

        db.query('START TRANSACTION').then(() => {
            db.query('INSERT INTO `Event` (name, description, location_lat, location_lng, quota, start_time, end_time, group_event, event_in, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, description, location_lat, location_lng, quota, start_time, end_time, group_id, city_id, image])
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
