const Router = require ('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')

const router = new Router()

//添加数据
router.post('/good',async(ctx)=>{
    //取得Model
    const Good = mongoose.model('Good')
    //把从前端接收的POST数据封装成一个新的user对象
    let newGood = new Good(ctx.request.body)
    let x = await newGood.save();
    ctx.body={
                code:200,
                message:'添加成功',
                x
            }
})
//分页查询所有的产品列表
router.post('/goodList',async(ctx)=>{
    //取得Model
    const Good = mongoose.model('Catego')
    let GoodPages = ctx.request.body
    let pageNum=parseInt(GoodPages.pageNum);
    let pageSize=parseInt(GoodPages.pageSize);
        pageSize === undefined && (pageSize = 20);//数据量
        pageNum  === undefined && (pageNum = 1);//页码
    let num = parseInt(pageSize) * (parseInt(pageNum)-1);

    let goodList = await  Good.find({})
                   .limit(parseInt(pageSize)).skip(num).exec() 

    const totiles=(await  Good.find({}).exec()).length;
    ctx.body={
                code:200,
                message:'获取成功',
                goodList,
                totiles
            }
})

//插入所有数据  批量插入  
router.get('/insertAllCatego',async(ctx)=>{
    fs.readFile('./static/data_json/catego.json','utf8',(err,data)=>{
    //    if(err) {
    //     ctx.body={
    //         code:200,
    //         message:"数据有误"
    //     }
    //     return
    //    }
        data=JSON.parse(data)
        console.log(data)
        const Category = mongoose.model('Catego')

        data.data.map((value,index)=>{
             let newCategory = new Category(value)
        newCategory.save().then(()=>{
            console.log('成功插入')
        }).catch(error=>{
             console.log('失败：'+error)
        })
        })
       
    })
    ctx.body={
        code:200,
        message:"开始导入数据"
    }

})

//删除一条数据
router.post('/goodRemove',async(ctx)=>{
    //取得Model
    const Good = mongoose.model('Catego')
    let GoodPages = ctx.request.body
    let GoodId=GoodPages.GoodId;
    console.log(GoodId)
    let goodList = await  Good.findByIdAndRemove(GoodId).exec()

    ctx.body={
                code:200,
                message:'删除成功'
            }
})

//跟新数据  Model.findByIdAndUpdate(id, [update], [options], [callback])
router.post('/goodUpdate',async(ctx)=>{
    //取得Model
    const Good = mongoose.model('Catego')
    let GoodPages = ctx.request.body
    let {GoodId,goodPrace}={...GoodPages};
    let goodList = await  Good.findByIdAndUpdate(GoodId,{"goodPrace":goodPrace}).exec()
    if (goodList) {
        ctx.body={
            code:200,
            message:'修改成功',
            goodList
        }
    } else {
        ctx.body={
            code:200,
            message:'修改不成功，请重试',
            goodList
        }
    }
    
})
module.exports=router;