'use strict';

const meetups = require('./lib');

const DEFAULT_RESPONSE = {
  statusCode: 500,
  response: { message: 'Internal server error' },
};

function route(event, context, callback) {
  console.info(`[Meetups API] Handle request ${JSON.stringify(event)}`);

  return new Promise((resolve, reject) => {
    // TODO parse & validate input
    const route = `${event.httpMethod} ${event.resource}`;
    console.info(`[Meetups API] Invoke route ${route}`);

    let body;
    switch(route) {
      case 'GET /api/meetups':
        return resolve(meetups.findMeetups());
      case 'GET /api/meetups/{meetup}':
        return resolve(meetups.findMeetupById(event.pathParameters.meetup));
      case 'POST /api/meetups':
        body = JSON.parse(event.body);
        return resolve(meetups.createMeetup(body.name, body.description,
          body.time, body.duration));
      default:
        return reject(new Error(`[404] Resource not found ${route}`));
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
