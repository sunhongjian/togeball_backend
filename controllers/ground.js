const Ground = require('../models/ground.model.js')
module.exports = {
  post: async (ctx, next) => {
    const data = ctx.request.body
    const param = {
      name: data.name,
    }

    try {
      // 判断手机号是否存在
      // const user = await User.findOne({ phoneNumber })
      // if (user) {
      //   throw new Error('该手机号已存在')
      // } else {
      const newGround = new Ground(param)
      const result = await newGround.save()
      console.log(result)
      ctx.success({ id: result.id })
      // }
    } catch (e) {
      ctx.error(e.message)
    }
  },  
}