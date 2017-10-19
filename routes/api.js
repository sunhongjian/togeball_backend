const router = require('koa-router')()
const controllers = require('../controllers/user')
const user = require('../controllers/user')
const ground  = require('../controllers/ground')
router.prefix('/api')

// 用户操作
router.post('/user', controllers.post)
router.put('/user', controllers.put)

// 运动场
router.post('/ground', ground.post)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
