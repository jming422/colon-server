const Router = require('koa-router');

const router = new Router();
const apiRouter = new Router();

const { requireAuth } = require('../auth');

const putInfo = require('./putInfo');
const colon = require('./colon');

apiRouter
  .prefix('/api')
  .post('/putInfo', requireAuth, putInfo)
  .get('/colon', colon);

router.use(apiRouter.routes());

module.exports = router;
