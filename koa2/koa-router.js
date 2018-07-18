
const Koa = require('koa');
const Router = require('koa-router');
 
const app = new Koa();
const router = new Router();
// const router = new Router({prefix:'/wangwei'});//设置前缀
router.get('/', function (ctx, next) {
    ctx.body=xtx.query;
})
.get('/todo',(ctx,next)=>{
    ctx.body="Todo page"
});
 
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000,()=>{
      console.log('starting at port 3000');
  });