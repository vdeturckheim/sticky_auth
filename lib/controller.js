'use strict';
module.exports.me = {
    auth: 'simple',
    handler: function (request, reply){

        reply(request.auth.credentials);
    }
};
