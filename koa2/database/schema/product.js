const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema

//创建我们的用户Schema
const productSchema = new Schema({
    goodId:Number,
    goodPrace:Number,
    useId:Number,
    goodMsg:String,
    Imgs:String,
    seil:Number,
    NUM:Number
})
//发布模型
mongoose.model('Product',productSchema)