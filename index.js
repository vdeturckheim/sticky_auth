'use strict';
const Basic = require('hapi-auth-basic');
const Validate = require('./lib/validate');
const Controller = require('./lib/controller');


module.exports.register = (server, options, next) => {

    server.register( Basic , ( _ignore ) => {

        server.auth.strategy('simple', 'basic', { validateFunc: Validate });

        server.route({ method: 'GET', path: '/me', config: Controller.me });

        next();
    });
};

module.exports.register.attributes = {
    pkg: require('./package.json')
};
