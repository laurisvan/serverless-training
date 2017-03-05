'use strict';

module.exports.hello = (event, context, callback) => {
  console.info(`[Hello] Invoking Lambda with input ${JSON.stringify(event)}`);

  const name = event.name;
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
      input: event,
    }),
  };
};
