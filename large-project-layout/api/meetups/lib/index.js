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

module.exports = {
  findMeetups,
  findMeetupById,
};
