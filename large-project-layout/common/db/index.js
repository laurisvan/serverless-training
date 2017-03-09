'use strict';

const Model = require('objection').Model;
const knex = require('knex');
const pg = require('pg'); // Explicit dependency for Webpack to work

// Knex handle
let knexInstance;

async function init() {
  const connection = {
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    database: process.env.POSTGRES_DB_NAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };
  const config = {
    debug: process.env.KNEX_DEBUG === 'true',
    client: 'pg',
    acquireConnectionTimeout: 10000,
    connection: connection,
    pool: {
      min: 1,
      max: 5,
    },
  };

  // Set the module scope handle
  knexInstance = knex(config);

  // Bind Objection models
  Model.knex(knexInstance);

  return knexInstance;
}

async function shutdown() {
  return knexInstance.destroy();
}

class Meetup extends Model {
  static get tableName() {
    return 'Meetups';
  }

  // Sample parsing routines to demonstrate data conversion back & forth
  $formatDatabaseJson(_json) {
    const json = super.$formatDatabaseJson(_json);

    if (_json.created) json.created = new Date(_json.created).toISOString();
    if (_json.time) json.time = new Date(_json.time).toISOString();

    return json;
  }

  $parseDatabaseJson(_json) {
    const json = super.$parseDatabaseJson(_json);

    json.created = Date.parse(_json.created).valueOf();
    json.time = Date.parse(_json.time).valueOf();
    return json;
  }
}

module.exports = {
  init,
  shutdown,
  getKnex: () => knexInstance,
  Meetup,
};
