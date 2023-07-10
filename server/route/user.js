const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get('/userinfo',async (ctx)=>{
	const data = await { a:100 };
	ctx.body = data;
})

module.exports = router;