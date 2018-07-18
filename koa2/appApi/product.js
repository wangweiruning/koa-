const Router = require ('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')

const router = new Router()

//添加数据
router.post('/product',async(ctx)=>{

   fs.readFile('./static/data_json/product.json','utf8',async (err,data)=>{
        data=JSON.parse(data)
           const Product = mongoose.model('Product')
        data.data.map((value,index)=>{
             //取得Model
            let newProduct = new Product(value)
            newProduct.save().then((result)=>{
            console.log('------成功插入-------')
                    }).catch(error=>{
             console.log('失败：'+error)
            })
        }) 
    })
    ctx.body={
        code:200,
        message:"数据插入成功"
    } 
})
//获取数据
router.get('/getProduct',async(ctx)=>{
    const useId=ctx.request.query.useId;
    const Product = mongoose.model('Product')
    const prodate=await Product.aggregate([
             {
                // from：需要关联的表【goods】
                // localField: 【Product】表需要关联的键。               
                // foreignField：【goods】的matching key。        
                // as：           对应的外键集合的数据，
               $lookup:
                 {
                   from: "goods",
                   localField: "useId",
                   foreignField:"payId",
                   as: "prodate_docs"
                 }
           },{ $match :{"useId":parseInt(useId)}}//匹配对应useId的东西
        ]);

    ctx.body={
        code:200,
        message:prodate
    }
})
module.exports=router;