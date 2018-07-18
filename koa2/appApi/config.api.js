
const LOCALURL = "http://localhost:4444/"
const URL = {
    registerUser:LOCALURL+'user/register', //用户注册接口
    login:LOCALURL+'user/login',           //用户登陆接口
    changepwd:LOCALURL+'user/changepwd',   //修改密码

    good:LOCALURL+'goods/good',            //大产品添加接口----增加
    goodList:LOCALURL+'goods/goodList',    //产品查询接口--------查询
    insertAllCatego:LOCALURL+'goods/insertAllCatego',//批量导入数据-----批量增加
    goodRemove:LOCALURL+'goods/goodRemove',//删除一条数据--------删除
    goodUpdate:LOCALURL+'goods/goodUpdate', //跟新数据------修改数据
    product:LOCALURL+'product/product',//数据插入 所有子产品
    getProduct:LOCALURL+'product/getProduct'//联合查询 大商品---子产品
}
 
module.exports = URL