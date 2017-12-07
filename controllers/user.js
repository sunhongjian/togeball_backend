const User = require('../models/user.model.js')
const createToken = require('../middleware/token/createToken')
const sha1 = require('sha1');

// test api
module.exports = {
  get: async (ctx, next) => {
    const data = ctx.query
    const param = {
      _id: data.id,
    }
    try {
      const result = await User.findOne(param).populate('ground')
      console.log(result)
      ctx.success({ result })
    } catch (e) {
      ctx.error(e.message)
    }
  },
  /**
   * 注册新用户
   */
  register: async (ctx, next) => {
    const data = ctx.request.body
    const param = {
      userName: data.userName,
      password: sha1(data.password),
      // phoneNumber: data.phoneNumber,
      // nickname: data.nickname,
      // age: data.age,
      // ground: data.groundId,
      token: createToken(this.userName)
    }

    try {
      const newUser = new User(param)
      let result = await newUser.save()
      console.log(result)
      ctx.success({ id: result.id, token: result.token })
    } catch (e) {
      ctx.error(e.message)
    }
  },
  /**
   * 登录
   */
  login: async (ctx, next) => {
    const requestData = ctx.request.body;
    // 将从请求中拿到的明文密码进行sha1加密
    if (!requestData.password) {
      ctx.error('密码不能为空');
      return;
    }
    if (!requestData.userName) {
      ctx.error('用户名不能为空');
      return;
    }
    const password = sha1(requestData.password);
    const userName = requestData.userName;
    try {
      let result = await User.findOne({ userName });
      console.log(result)
      if(!result) {
        ctx.error('不存在该用户!')
      }else if(password === result.password) {
        console.log(`${result.userName} 登录成功`);
        // 生成一个新的token, 并存到数据库
        result.token = createToken(userName);
        let save = await result.save();
        ctx.success({ token: save.token })
        // ctx.success({ id: result.id, token: result.token })   
      } else {
        ctx.error('密码错误!')
      }
     
    } catch (e) {
      ctx.error(e.message)
    }
  },
  put: async (ctx, next) => {
    try {
      const data = ctx.request.body
      const result = await User.findOne({ nickname: data.nickname })
      result.age = data.age
      result.phoneNumber = data.phoneNumber
      const save = await result.save()
      // const result = User.update({nickname: data.nickname},{age: data.age})
      // const result = User.findByIdAndUpdate(data.id, param);
      console.log(save)
      ctx.success()
    } catch (e) {
      ctx.error(e.message)
    }
  }
}
