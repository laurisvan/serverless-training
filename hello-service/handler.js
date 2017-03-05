'use strict';

module.exports.hello = (event, context, callback) => {
  console.info(`[Hello] Invoking with input ${JSON.stringify(event)}`);

  try {
    // Manual error handling
    if (typeof event !== 'object') {
      throw new TypeError(`Invalid input: Expected object, got ${JSON.stringify(event)}`);
    } else if (typeof event.pathParameters.proxy !== 'string') {
      throw new TypeError(`Invalid input: pathParameters.proxy should be a string`);
    }

    // Handle response
    const name = event.pathParameters.proxy.split('/').join(' ');
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        response: `Hello, ${name}!`,
        input: event,
      }),
    };

    callback(null, response);
  } catch(error) {
    console.warn(`[Hello] Caught an error: ${error.message}`);
    console.warn(`[Hello] Stack trace: ${error.stack}`);

    // Error defaults
    let statusCode = 500;
    let userMessage = 'Internal server error. Please try again later';

    if (error instanceof TypeError) {
      userMessage = 'Invalid input';
      statusCode = 400;
    }

    const response = {
      statusCode: statusCode,
      body: JSON.stringify({
        userMessage: userMessage,
        message: error.message,
        stackTrace: error.stack,
        input: event,
      }),
    };

    callback(null, response);
  }
};
