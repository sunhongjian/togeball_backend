const Match = require('../models/match.model.js')
module.exports = {
  /**
   * 查询比赛
   */
  get: async (ctx, next) => {
    const data = ctx.query
    const param = {
      _id: data.id,
    }
    try {
      const result = await Match.findOne(param).populate('ground')
      console.log( result )
      ctx.success({ result })
    } catch (e) {
      ctx.error(e.message)
    }
  },
  /**
   * 添加比赛
   */
  post: async (ctx, next) => {
    const data = ctx.request.body
    const param = {
      ground: data.groundId,
    }
    try {
      const newMatch = new Match(param)
      const result = await newMatch.save()
      console.log(result)
      ctx.success({ id: result.id })
    } catch (e) {
      ctx.error(e.message)
    }
  },
}