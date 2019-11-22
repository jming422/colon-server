'use strict';
const crypto = require('crypto');

const getToken = (authorization) => {
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1];
  }
  return 'INVALID_TOKEN';
};

const checkToken = (provided, real) => {
  const bufSize = Math.max(Buffer.byteLength(provided, 'base64'), Buffer.byteLength(real, 'base64'));

  const theirs = Buffer.alloc(bufSize);
  const ours = Buffer.alloc(bufSize);

  theirs.write(provided, 'base64');
  ours.write(real, 'base64');

  return crypto.timingSafeEqual(theirs, ours);
};

const requireApiAuth = async (ctx, next) => {
  const {
    header: { authorization },
  } = ctx;

  const token = getToken(authorization);
  const realToken = process.env.API_TOKEN || 'fakesecret';

  const authenticated = checkToken(token, realToken);

  if (authenticated) {
    await next();
  } else {
    return ctx.send(401);
  }
};

module.exports = { requireApiAuth };
