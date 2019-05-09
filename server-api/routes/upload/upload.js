const mv = require('mv');

module.exports = server => {
    server.post('/api/upload/', (req, res) => {
        let myImage = req.files.imgFile;
        let name = myImage.name.split('.');
        let ext = name[name.length - 1];
        let new_path = `uploads/${new Date().getTime()}.${ext}`;
        mv(myImage.path, new_path, { mkdirp: true }, (err, result) => {
            if (err) {
                throw err;
            } else {
                return result;
            }
        });
        res.end();
    });
};
