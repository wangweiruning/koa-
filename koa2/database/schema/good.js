const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型

//创建我们的用户Schema
const goodSchema = new Schema({
    goodId:Number,
    goodPrace:Number,
    goodMsg:String,
    Imgs:String,
    payId:Number
})
//发布模型
mongoose.model('Good',goodSchema)