const { User } = require('../models/user.model.js')
// test api
module.exports = {
  // 添加
  get: async (ctx, next) => {
    const data = ctx.request.body
    const phoneNumber = data.phoneNumber
    const nickname = data.nickname
    try {
      if (!data || !phoneNumber || !nickname) {
        throw new Error('缺少必须参数')
      }
      // 判断手机号是否存在
      const user = await User.findOne({ phoneNumber })
      if (user) {
        throw new Error('该手机号已存在')
      } else {
        await User.create({ phoneNumber, nickname })
        ctx.body = {
          code: '0'
        }
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: '-1',
        msg: e.message,
      }
    }
  }
}
