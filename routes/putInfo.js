const moment = require('moment');

const { getStatus, saveStatus } = require('../controllers/statusInfo');

const putInfo = async (ctx) => {
  const {
    request: {
      body: { status, host },
    },
  } = ctx;

  const thisHost = host === 'top' ? 'top' : 'bottom';
  const otherHost = thisHost === 'top' ? 'bottom' : 'top';

  await saveStatus(thisHost, status);
  const res = await getStatus(otherHost);
  return ctx.ok(res);
};

module.exports = { putInfo };
