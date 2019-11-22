const moment = require("moment");

const putInfo = async ctx => {
  const {
    request: {
      query: { carrier, startDate, endDate }
    }
  } = ctx;

  if (!carrier || !["fedex", "ups"].includes(carrier.toLowerCase())) {
    return ctx.badRequest("Bad carrier");
  }

  return ctx.ok();
};

module.exports = { putInfo };
