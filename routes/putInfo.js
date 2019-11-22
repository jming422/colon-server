const moment = require('moment');

const { getStatus, saveStatus } = require('../controllers/statusInfo');

module.exports = async (ctx) => {
  const {
    request: {
      body: { status, host },
    },
  } = ctx;

  if (!['top', 'bottom'].includes(host)) {
    return ctx.badRequest('Invalid host location');
  }

  const otherHost = host === 'top' ? 'bottom' : 'top';

  try {
    await saveStatus(host, status);
  } catch (err) {
    console.error('Error trying to save status to db:');
    console.error(err);
    console.log('Still trying to get other status and respond...');
  } finally {
    try {
      const res = await getStatus(otherHost);
      if (!res) {
        throw Error('Got back empty response from getStatus!');
      }
      return ctx.ok(res.status);
    } catch (err) {
      console.error('Error trying to get other status:');
      console.error(err);
      return ctx.internalServerError();
    }
  }
};
