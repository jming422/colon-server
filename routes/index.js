const Router = require('koa-router');

const router = new Router();
const apiRouter = new Router();

const { requireAuth } = require('../auth');

const putInfo = require('./putInfo');

apiRouter
  .prefix('/api')
  .use('/putInfo', requireAuth, putInfo);

router.use(apiRouter.routes());

module.exports = router;
