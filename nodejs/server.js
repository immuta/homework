'use strict';

const Hapi = require('@hapi/hapi');

const server = new Hapi.Server({
    port: 3000,
    host: '0.0.0.0'
});

// TODO load the data from external APIs and figure out the top zip codes by amounts
// Expose that data for the UI
// Maryland Data URL: https://opendata.maryland.gov/resource/3ycv-rxy9.json

server.register([{ plugin: require('@hapi/inert') }]).then(() => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (_request, h) {
            return h.file('ui/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/app.js',
        handler: function (_request, h) {
            return h.file('ui/app.js');
        }
    });

    server.route({
        method: 'GET',
        path: '/node_modules/{param*}',
        handler: {
            directory: {
                path: 'node_modules',
                listing: false,
                index: true
            }
        }
    });


    return server.start();
}).then(() => {
    console.log('Server started');
});
