const restify = require('restify');
const plugins = restify.plugins;
const corsMiddleware = require('restify-cors-middleware');
const rjwt = require('restify-jwt-community');
const secret = require('./secret');

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

server.use(rjwt(secret.jwt).unless({ path: ['/api/user/signup/', '/api/user/login/'] }));
server.listen(8888, '0.0.0.0', () => console.log('Listening on 8888...'));

require('./routes/event/search')(server);
require('./routes/event/near')(server);

require('./routes/city/all')(server);
require('./routes/city/search')(server);

require('./routes/group/create')(server);
require('./routes/group/search')(server);
require('./routes/group/member_in')(server);
require('./routes/group/admin_in')(server);

require('./routes/user/login')(server);
require('./routes/user/signup')(server);
require('./routes/user/myprofile')(server);
require('./routes/user/profile')(server);
require('./routes/user/info')(server);
require('./routes/user/friends')(server);

require('./routes/upload/upload')(server);
require('./routes/upload/images')(server);
