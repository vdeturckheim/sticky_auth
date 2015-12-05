'use strict';
const Users = require('./users.json');

module.exports = function (request, username, password, callback){

    if (!Users[username]){
        return callback(null, false);
    }


    callback(null, Users[username] === password, { username: username });
};


