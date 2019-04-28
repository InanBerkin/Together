const db = require('./db-config');
const secret = require('./secret');
const restify = require('restify');
const plugins = require('restify').plugins;
const rerrors = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware');
const mv = require('mv');

const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
const user = require('./user');

const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
});

const server = restify.createServer();
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

server.use(rjwt(secret.jwt).unless({ path: ['/api/signup/', '/api/login/'] }));

server.listen(8888, '0.0.0.0', () => console.log('Listening on 8888...'));

server.get('/api/images/*', restify.plugins.serveStaticFiles('./uploads'));

server.get('/api/friends/', (req, res, next) => {
    let id = req.user.id;
    db.query('SELECT * FROM FriendList WHERE self_id = ?', [id])
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => {
            console.log(error);
            res.send(400, []);
        });
});

server.get('/api/user/', (req, res, next) => {
    let id = req.user.id;
    db.query('SELECT * FROM `Account` WHERE account_id = ?', [id])
        .then(data => {
            console.log(data[0]);
            res.send(data[0]);
        })
        .catch(error => {
            console.log(error);
            res.send(400, {});
        });
});

server.get('/api/group/userin/member/:id/', (req, res, next) => {
    let id = req.params.id;
    db.query('SELECT * FROM `GroupCard` NATURAL JOIN `Member` WHERE status = 2 AND account_id = ?', [id])
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => {
            console.log(error);
            res.send(400, []);
        });
});

server.get('/api/group/userin/admin/:id/', (req, res, next) => {
    let id = req.params.id;
    db.query('SELECT * FROM `GroupCard` NATURAL JOIN `Member` WHERE status = 3 AND account_id = ?', [id])
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => {
            console.log(error);
            res.send(400, []);
        });
});

server.get('/api/user/:id/', (req, res, next) => {
    let id = req.params.id;
    db.query('SELECT first_name, middle_name, last_name, image_path, bio_text, gender, birthday, location, member_since FROM `Account` WHERE account_id = ?', [id])
        .then(data => {
            console.log(data[0]);
            res.send(data[0]);
        })
        .catch(error => {
            console.log(error);
            res.send(400, {});
        });
});

server.get('/api/group/search/:text/', (req, res, next) => {
    let text = `%${req.params.text}%`;
    db.query('SELECT * FROM `GroupCard` group_name LIKE ?', [text])
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => {
            console.log(error);
            res.send(400, []);
        });
});

server.get('/api/event/search/:text', (req, res, next) => {
    let text = `%${req.params.text}%`;
    db.query('SELECT * FROM `EventCard` WHERE event_name LIKE ?', [text])
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => {
            console.log(error);
            res.send(400, []);
        });
});

server.get('/api/event/near/:time', (req, res, next) => {
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

server.get('/api/user/info/', (req, res, next) => {
    let user_id = req.user.id;
    db.query('SELECT first_name, last_name, image_path FROM `Account` WHERE account_id = ?', [user_id])
        .then(data => {
            console.log(data);
            res.send(data[0]);
        })
        .catch(error => {
            console.log(error);
            res.send(400, {});
        });
});

server.get('/api/city/all/', (req, res, next) => {
    db.query('SELECT name FROM `City`')
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => {
            console.log(error);
            res.send([]);
        });
});

server.get('/api/city/search/:text/', (req, res, next) => {
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

server.post('/api/group/create/', (req, res, next) => {
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

server.post('/api/login/', (req, res, next) => {
    let { username, password } = req.body;

    user.authenticate(username, password)
        .then(data => {
            if (data.length !== 0) {
                let token = jwt.sign({ id: data[0].account_id, username: data[0].username, password: data[0].passwd, email: data[0].email }, secret.jwt.secret, { expiresIn: '24h' });
                res.send({ token });
            } else {
                res.send(new rerrors.UnauthorizedError());
            }
        })
        .catch(error => {
            console.log(error);
        });
});

server.post('/api/upload/', (req, res, next) => {
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

server.post('/api/signup/', function respond(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    console.log(username);
    console.log(password);
    console.log(email);

    db.query('INSERT INTO account (username, email, passwd) VALUES (?, ?, SHA2(?, 256))', [username, email, password])
        .then(data => {
            res.send({ status: 'success', message: 'Successful!' });
        })
        .catch(error => {
            res.send(401, { status: 'error', message: 'Error!' });
        });
});
