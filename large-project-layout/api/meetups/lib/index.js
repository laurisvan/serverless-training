const request = require('request-promise-lite');
const db = require('../../../common/db'); // Webpack permits referring from outside the function

// HelNode meetup group
const GROUP_ID = 'Helsinki-Node-js';
const URL_BASE = `https://api.meetup.com/${GROUP_ID}`;

function findMeetups() {
  console.info(`[Meetups] findMeetups()`);
  const query = {
    status: 'cancelled,upcoming,past,proposed,suggested,draft'
  }
  const url = `${URL_BASE}/events`;

  return request.get(url, { qs: query, json: true });
}

function findMeetupById(meetupId) {
  console.info(`[Meetups] findMeetupsById() called with ${meetupId}`);
  const query = {
    status: 'cancelled,upcoming,past,proposed,suggested,draft',
  }
  const url = `${URL_BASE}/events/${meetupId}`;

  return request.get(url, { qs: query, json: true });
}

async function createMeetup(name, description, time, duration) {
  console.info(`[Meetups] createMeetup(${name}, ${description}, ${time}, ${duration})`);
  const query = {
    sign: true,
    key: process.env.MEETUP_API_KEY,
  };
  const body = {
    announce: false,
    description: description,
    duration: duration,
    name: name,
    publish_status: 'draft',
    time: time,
  };
  const url = `${URL_BASE}/events/`;

  //return request.post(url, { form: body, qs: query, verbose: true})
  //  .then(response => JSON.parse(response.toString()));

  // Demonstrate the DB handling here, even if it is not needed here by code
  // Initialising and shutting down on every endpoint call is safer than leaving
  // the DB open for undefined time. At the same time, it is slow. :()
  await db.init();
  const meetup = await db.Meetup.query().insert({ name, description, duration, time });
  await db.shutdown();

  return meetup;
}

module.exports = {
  findMeetups,
  findMeetupById,
  createMeetup,
};
