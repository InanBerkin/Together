const db = require('../../db-config');

module.exports = server => {
    server.get('/api/city/search/:text/', (req, res) => {
        let text = `%${req.params.text}%`;
        db.query('SELECT name FROM `City` WHERE name LIKE ?', text)
            .then(data => {
                console.log(data);
                res.send(data);
            })
            .catch(error => {
                console.log(error);
                res.send([]);
            });
    });
};
