const db = require('../../db-config');
const moment = require('moment');

module.exports = server => {
    server.get('/api/event/near/:time/', (req, res) => {
        let time = req.params.time;
        time = time + '%';
        db.query('SELECT * FROM `EventCard` WHERE time LIKE ?', [time])
            .then(data => {
                data.forEach(element => {
                    let time = element.time;
                    element.date = moment(time).format('DD/MM/YYYY');
                    element.time = moment(time).format('HH:mm');
                });
                res.send(data);
            })
            .catch(error => {
                console.log(error);
                res.send(400, []);
            });
    });
};
