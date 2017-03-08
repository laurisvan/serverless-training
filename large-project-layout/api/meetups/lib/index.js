const request = require('request-promise-lite');

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

function createMeetup(name, description, time, duration) {
  console.info(`[Meetups] findMeetups(${name}, ${description}, ${time}, ${duration})`);
  const query = {
    sign: true,
    key: 'HARDCODED_KEY', //process.env.MEETUP_API_KEY,
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

  return request.post(url, { form: body, qs: query, verbose: true})
    .then(response => JSON.parse(response.toString()));
}

module.exports = {
  findMeetups,
  findMeetupById,
  createMeetup,
};
