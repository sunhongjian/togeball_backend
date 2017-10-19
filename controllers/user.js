const User = require('../models/user.model.js')
// test api
module.exports = {
  // 添加
  post: async (ctx, next) => {
    const data = ctx.request.body
    const param = {
      phoneNumber: data.phoneNumber,
      nickname: data.nickname,
      age: data.age
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
