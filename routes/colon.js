const { getStatus } = require('../controllers/statusInfo');

module.exports = async (ctx) => {
  try {
    const statuses = await Promise.all(['top', 'bottom'].map(getStatus));
    return ctx.ok({ top: statuses[0], bottom: statuses[1] });
  } catch (err) {
    console.error('Error getting statuses:');
    console.error(err);
    return ctx.internalServerError();
  }
};
