const Match = require('../models/match.model.js')
module.exports = {
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