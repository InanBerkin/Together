const db = require('./db-config');
const restify = require('restify');
const plugins = require('restify-plugins');
const mv = require('mv');

const server = restify.createServer();
server.use(plugins.multipartBodyParser());

server.listen(8888, '0.0.0.0', () => console.log('Listening on 8888...'));

server.get('/api/login/:username', async function respond(req, res, next) {
    let username = req.params.username;
    let result = await db.query('SELECT * FROM account WHERE username = ?', [username]);
    res.contentType = 'json';
    res.send(result);
});

server.get('/api/images/*', restify.plugins.serveStaticFiles('./uploads'));

server.post('/api/upload/', function respond(req, res, next) {
    let myImage = req.files.imgFile;
    let ext = myImage.name.split('.')[name.length - 1];
    let new_path = `uploads/${new Date().getTime()}.${ext}`;
    mv(myImage.path, new_path, { mkdirp: true });
});
