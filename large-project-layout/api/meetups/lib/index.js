const request = require('request-promise-lite');

const STUB_MEETUPS = [
  { id: 123, name: 'Node.js for Serverless developers' }
];

function findMeetups() {
  console.info(`[Meetups] findMeetups()`);
  return Promise.resolve(STUB_MEETUPS);
}

function findMeetupById(meetupId) {
  console.info(`[Meetups] findMeetupsById() called with ${meetupId}`);
  const meetup = STUB_MEETUPS.find(meetup => meetup.id === meetupId);

  if (!meetup) {
    return Promise.reject(new Error(`[404] Meetup ${meetupId} not found`));
  }

  return Promise.resolve(meetup);
}

module.exports = {
  findMeetups,
  findMeetupById,
};
