const Router = require ('koa-router')
const mongoose = require('mongoose')


const router = new Router()


router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
/*注册的实践 */
router.post('/register',async(ctx)=>{
    //取得Model
    const User = mongoose.model('User')
    let userName= ctx.request.body.userName;
    const usemame= await User.findOne({"userName":userName});
    if (usemame) {
        ctx.body={
                        code:200,
                        message:'用户名已存在'
                    }
    } else {
         //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    let x = await newUser.save();
    console.log(x)
    ctx.body={
                code:200,
                message:'注册成功',
                x
            }
    }
   
})

/*登录的实践 */
// router.post('/login',async(ctx)=>{
//     //得到前端传递过来的数据
//     let loginUser = ctx.request.body
//     console.log(loginUser)
//     let userName = loginUser.userName  //用户输入姓名
//     let password = loginUser.password  //用户输入密码
//     //引入User的model
//     const User = mongoose.model('User')
//     //查找用户名是否存在，如果存在开始比对密码
//    await User.findOne({userName:userName}).exec().then(async(result)=>{
//         console.log(result)
//         if(result){//result.password数据库中用户密码
//             if (result.password===password) ctx.body={ code:200, message:'登录成功',loginUser}
//             else ctx.body={ code:200, message:'用户密码不匹配'}
//         }else{
//              ctx.body={ code:200, message:'用户不存在'}
//         }
        
//     }).catch(error=>{
//         console.log(error)
//         ctx.body={ code:500, message:error  }
//     })
// })
 
/*登录的实践 */
router.post('/login',async(ctx)=>{
    try {
        //得到前端传递过来的数据
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    //查找用户名是否存在，如果存在开始比对密码
    const result=  await User.findOne({userName:userName}).exec();
      if (result) {
            //当用户名存在时，开始比对密码
            let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
            const  match =   await newUser.comparePassword(password,result.password);
                    try {
                            //返回比对结果
                            if (match) {
                                ctx.body={
                                code:200, 
                                message:"登陆成功"
                                } 
                            } else {
                                ctx.body={
                                code:200, 
                                message:"密码不匹配"
                            }
                        }
                        } catch (error) {
                            //出现异常，返回异常
                            console.log(error)
                            ctx.body={ code:500, message:error}
                        }
                    } else {
                        ctx.body={
                            code:200, 
                            message:"用户不存在"
                        }  
                    }
                            
                } catch (error) {
                        //出现异常，返回异常
                        console.log(error)
                        ctx.body={ code:500, message:error}
                }      
})


/*修改密码的实践 */
router.post('/changepwd',async(ctx)=>{
    //取得Model
    const User = mongoose.model('User')
    let userName= ctx.request.body.userName;
    let password= ctx.request.body.password;
    console.log(ctx.request.body)
    const usemame= await User.findOne({"userName":userName});
    if(usemame){
        if (parseInt(usemame.password)===parseInt(password)) {
            ctx.body={
                            code:200,
                            message:'密码不能与原密码相同'
            }
        } else {
            let changpwd = await  User.findByIdAndUpdate(usemame._id,{"password":password}).exec()
            console.log(changpwd)
            if (changpwd) {
                ctx.body={
                    code:200,
                    message:'修改成功'
                }
                }
            }
        }else{
            ctx.body={
                code:1000,
                message:'用户不存在',
                
            }
        }
})

/*用户产品列表的实践 */
router.post('/usrGoodList',async(ctx)=>{
    //取得Model
    const User = mongoose.model('User')
    const dates=await User.aggregate([
                        {
                        $lookup:
                            {
                            from: "Categos",
                            localField: "_id",
                            foreignField: "ids",
                            as: "inventory_docs"
                            }
                    }
                ])
            ctx.body={
                    code:200,
                    message:dates
        }
   
})
module.exports=router;