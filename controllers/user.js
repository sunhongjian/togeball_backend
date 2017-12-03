const User = require('../models/user.model.js')
const createToken = require('../middleware/token/createToken')
// test api
module.exports = {
  get: async (ctx, next) => {
    const data = ctx.query
    const param = {
      _id: data.id,
    }
    try {
      const result = await User.findOne(param).populate('ground')
      console.log( result )
      ctx.success({ result })
    } catch (e) {
      ctx.error(e.message)
    }
  },
  // 注册新用户
  register: async (ctx, next) => {
    const data = ctx.request.body
    const param = {
      phoneNumber: data.phoneNumber,
      nickname: data.nickname,
      age: data.age,
      ground: data.groundId,
      token: createToken(this.phoneNumber)
    }

    try {
      // 判断手机号是否存在
      // const user = await User.findOne({ phoneNumber })
      // if (user) {
      //   throw new Error('该手机号已存在')
      // } else {
      const newUser = new User(param)
      const result = await newUser.save()
      console.log(result)
      ctx.success({ id: result.id })
      // }
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
