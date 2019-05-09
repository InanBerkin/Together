const db = require('../../db-config');

module.exports = server => {
    server.get('/api/event/near/:time', (req, res) => {
        let time = req.params.time;
        db.query('SELECT * FROM `EventCard` WHERE time = ?', [time])
            .then(data => {
                console.log(data);
                res.send(data);
            })
            .catch(error => {
                console.log(error);
                res.send(400, []);
            });
    });
};
