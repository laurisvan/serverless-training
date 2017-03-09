'use strict';

const fs = require('fs');
const path = require('path');
const URL = require('url');
const yaml = require('node-yaml');

/**
 * Loads the environment with a given stage
 * @param {string} stage the stage to use when loading env, defaults to 'dev'
 */
function loadEnvironment(stage) {
  // Default to dev
  stage = stage || 'dev';

  const filePath = path.join(__dirname, '..', `secrets.${stage}.yml`);
  const env = yaml.readSync(filePath);
  return env;
}

// FIXME Suppor stages through other means than env-variables
const stage = process.env.SERVERLESS_STAGE || 'dev';
const env = loadEnvironment(stage);
const connection = URL.format({
  protocol: 'postgres:',
  slashes: true,
  hostname: env.POSTGRES_DB_HOST,
  port: env.POSTGRES_DB_PORT,
  auth: `${env.POSTGRES_ROOT_USER}:${env.POSTGRES_ROOT_PASSWORD}`,
  pathname: `/${env.POSTGRES_DB_NAME}`,
});

module.exports = {
  development: {
    client: 'postgresql',
    connection: connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
