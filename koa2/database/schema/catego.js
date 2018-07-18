
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
const ObjectId = Schema.Types.ObjectId  
const categoSchema = new Schema({
    goodId:ObjectId,
    goodPrace:Number,
    goodMsg:String
})
 
mongoose.model('Catego',categoSchema)