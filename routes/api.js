const router = require('koa-router')()
const user = require('../controllers/user')
const ground  = require('../controllers/ground')
const match = require('../controllers/match')
const checkToken = require('../middleware/token/checkToken.js');
router.prefix('/api')

// 用户操作
router.post('/register', user.register)
router.post('/login', user.login)
router.put('/user', user.put)
router.get('/user', user.get)

// 运动场
router.post('/ground', checkToken, ground.post)

// 比赛
router.get('/match', match.get)
router.post('/match', match.post)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
