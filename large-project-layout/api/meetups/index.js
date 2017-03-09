'use strict';

const meetups = require('./lib');

async function route(event, context, callback) {
  console.info(`[Meetups API] Handle request ${JSON.stringify(event)}`);

  // Placeholder for response that is sent back from Lambda
  let response;
  let statusCode;
  try {
    // TODO parse & validate input
    const route = `${event.httpMethod} ${event.resource}`;
    console.info(`[Meetups API] Invoke route ${route}`);

    let body;
    statusCode = 200;
    switch(route) {
      case 'GET /api/meetups':
        response = await meetups.findMeetups();
        break;
      case 'GET /api/meetups/{meetup}':
        response = await meetups.findMeetupById(event.pathParameters.meetup);
        break;
      case 'POST /api/meetups':
        body = JSON.parse(event.body);
        response = await meetups.createMeetup(body.name, body.description,
          body.time, body.duration);
        break;
      default:
        throw new Error(`[404] Resource not found ${route}`);
    }
  } catch(error) {
    // TODO Write proper error handling
    statusCode = /\[\d{3}\]/[0] || 500;
    response: { message: error.message };
  }

  console.info(`[Meetups API] Handle response ${statusCode}: ${JSON.stringify(response)}`);
  const envelope = {
    statusCode,
    body: JSON.stringify({
      response,
      input: event,
    }),
  };

  callback(null, envelope);
}

module.exports = {
  route
}
