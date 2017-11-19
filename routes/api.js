const router = require('koa-router')()
const user = require('../controllers/user')
const ground  = require('../controllers/ground')
const match = require('../controllers/match')
router.prefix('/api')

// 用户操作
router.post('/user', user.post)
router.put('/user', user.put)
router.get('/user', user.get)

// 运动场
router.post('/ground', ground.post)

// 比赛
router.post('/match', match.post)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
