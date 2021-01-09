'use strict';

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');

const BASE_API_PATH = 'http://countries-proxy/rest/v2';

const getAllCountries = async apiBasPath => {
  // TODO: implement
  const edge = 'all?fields=alpha2Code'
  console.log(`Requesting alpha 2 ISO code of all countries from ${apiBasPath}/${edge}`);
  return Promise.resolve([]);
};

const staticAssetsRoute = {
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: {
      path: 'ui/dist/countries-web-ui/',
      listing: false
    }
  }
};

const routes = [{
  method: 'GET',
  path: '/most-neighbors',
  handler: async (request, h) => {
    // TODO: implement
    return Promise.resolve([]);
  }
}, {
  method: 'GET',
  path: '/most-populated',
  handler: async (request, h) => {
    // TODO: implement
    return Promise.resolve([]);
  }
}, staticAssetsRoute];

const createServer = async (options) => {
  const server = Hapi.server(options);
  await server.register(inert);
  server.route(routes);
  return server;
};

const init = async () => {

  const server = await createServer({
    port: process.env.API_PORT || 5000,
    host: process.env.API_HOST || '0.0.0.0',
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
