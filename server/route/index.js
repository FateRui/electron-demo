const KoaRouter = require("koa-router");
const userRoute = require('./user');
const router = new KoaRouter();

router.prefix('/api');

router.use(userRoute.routes());

module.exports = router;