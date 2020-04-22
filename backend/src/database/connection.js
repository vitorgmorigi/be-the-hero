const knex = require('knex');
const configuration = require('../../knexfile'); // volta duas pastas para chegar na raíz

const connection = knex(configuration.development);

module.exports = connection;

