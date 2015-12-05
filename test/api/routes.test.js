'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Path = require( 'path' );
const Glue = require( 'glue' );
const Manifest = require('../resources/manifest');

const options = {
    relativeTo : Path.join( __dirname , '../../' )
};

const getServer = function (callback){

    Glue.compose( Manifest , options, (err, server) => {

        if (err){
            throw err;
        }
        return callback(server);
    });
};
const getAuth = function (username, password){

    return 'Basic ' + (new Buffer(username + ':' +  password)).toString('base64');
};

lab.experiment( 'Access' , () => {

    lab.test('Get access for Hobbes', (done) => {

        getServer((server) => {

            server.inject({
                method: 'GET',
                url: '/me',
                headers: {
                    authorization: getAuth('Hobbes', 'Leviathan')
                }
            }, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
    lab.test('Does not get access for Hobbes', (done) => {

        getServer((server) => {

            server.inject({
                method: 'GET',
                url: '/me',
                headers: {
                    authorization: getAuth('Hobbes', 'Leviatha')
                }
            }, (response) => {

                Code.expect(response.statusCode).to.equal(401);
                done();
            });
        });
    });

    lab.test('Plato is not a registered user', (done) => {

        getServer((server) => {

            server.inject({
                method: 'GET',
                url: '/me',
                headers: {
                    authorization: getAuth('Plato', 'Forms')
                }
            }, (response) => {

                Code.expect(response.statusCode).to.equal(401);
                done();
            });
        });
    });

});
