'use strict';

const lib = require('./lib');

const DEFAULT_RESPONSE = {
  statusCode: 500,
  response: { message: 'Internal server error' },
};

function route(event, context, callback) {
  console.info(`[Meetups API] Handle request ${JSON.stringify(event)}`);

  return new Promise((resolve, reject) => {
    // TODO parse & validate input
    switch(event.resource) {
      case '/api/meetups':
        return resolve(lib.findMeetups());
      case '/api/meetups/{meetup}':
        return resolve(lib.findMeetupById(event.pathParameters.meetup));
      default:
        return reject(new Error(`[404] Resource not found ${input.resource}`));
    }
  })
  .then(
    response => ({ statusCode: 200, response }),
    // TODO Write proper error handling
    error => ({ statusCode: /\[\d{3}\]/[0] || 500, response: { message: error.message }})
  )
  .then(responseTuple => {
    console.info(`[Meetups API] Handle response ${JSON.stringify(responseTuple)}`);

    // Defaults (in case of rejecting with abnormal errors)
    responseTuple = responseTuple || DEFAULT_RESPONSE;

    const envelope = {
      statusCode: responseTuple.statusCode,
      body: JSON.stringify({
        response: responseTuple.response,
        input: event,
      }),
    };

    callback(null, envelope);
  });
}

module.exports = {
  route
}
