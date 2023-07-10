const Koa = require("koa");
const Mount = require("koa-mount");
const Static = require("koa-static");
const path = require('path');
const route = require('./route');
const http = require('http');

const app = new Koa();
app.use(route.routes());

app.use(Mount('/',Static(path.join(__dirname,'../static'))));

function creatServer(port,resolve,reject) {
	const httpServer =  http.createServer(app.callback()).listen(port);

	httpServer.on('error',function(error) {
		if(error.code = 'EADDRINUSE') {
			creatServer(port + 1,resolve,reject);
		}
	});
	httpServer.on('listening',function() {
		resolve(port);
	});
}

function start (port) {
	return new Promise((resolve,reject)=>{
		creatServer(port,resolve,reject);
	})
}

exports.start = start;
