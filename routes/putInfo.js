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

  await saveStatus(host, status);
  const res = await getStatus(otherHost);
  return ctx.ok(res);
};
