const Router = require('koa-router')                       //引入路由koa-router
const Koa = require('koa')                                 //引入koa
const app = new Koa()                                      //实例koa
const mongoose = require('mongoose')                       //引入mongoose
const cors = require('koa2-cors')                          //引入口koa2-cors 解决跨域问题
const {connect , initSchemas} = require('./database/init.js')//数据库连接等操作
const user = require('./appApi/User.js')                   //用户信息接口
const goods = require('./appApi/goods.js')                 //产品接口
const product = require('./appApi/product.js')             //获取产品
const bodyParser = require('koa-bodyparser')               //中间件，
/**
 * 
 * 使用中间件 
 * {enableTypes:['json', 'form', 'text']}
 * 加上这个可以解决post 请求 提交为 空值
 * 
 **/ 
app.use(bodyParser({enableTypes:['json', 'form', 'text']}));
let router = new Router();
router.use('/user',user.routes())
router.use('/goods',goods.routes())
router.use('/product',product.routes())
app.use(router.routes())
app.use(router.allowedMethods())

//使koa支持跨域
// app.use(cors())
app.use(cors({
    origin:['http://localhost:4444'],
    methods:['GET','POST'],
    alloweHeaders:['Conten-Type', 'Authorization']
  }));
//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // const Good = mongoose.model('Good')
    // let oneUser = new Good({goodPrace:34,
    //                         goodMsg:"532ccc",
    //                         Imgs:"String",
    //                         payId:3})
  
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
        
    // })
// let  Goodss = await  Good.find({}).exec()
 
// console.log('------------------')
// console.log(Goodss)
// console.log('------------------')  
})()

 
app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})
 
app.listen(4444,()=>{
    console.log('[Server] starting at port 4444')
})