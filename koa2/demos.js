const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();
const staticPath = './static';

app.use(static(path.join(__dirname,staticPath)))

app.use(async (ctx)=>{
    ctx.body = 'fgfffffff';
})

app.listen(3333,()=>{

    console.log('static is runing at port 3333')
})