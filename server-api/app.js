const restify = require('restify');
const plugins = restify.plugins;
const corsMiddleware = require('restify-cors-middleware');

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

server.listen(8888, '0.0.0.0', () => console.log('Listening on 8888...'));

require('./routes/event/search.js')(server);
require('./routes/event/near.js')(server);

require('./routes/city/all.js')(server);
require('./routes/city/search.js')(server);

require('./routes/group/create.js')(server);
require('./routes/group/search.js')(server);
require('./routes/group/member_in.js')(server);
require('./routes/group/admin_in.js')(server);

require('./routes/user/login.js')(server);
require('./routes/user/signup.js')(server);
require('./routes/user/myprofile.js')(server);
require('./routes/user/profile.js')(server);
require('./routes/user/info.js')(server);
require('./routes/user/friends.js')(server);

require('./routes/upload/upload.js')(server);
require('./routes/upload/images.js')(server);
