const router = require('koa-router')()
const controllers = require('../controllers/user')
const user = require('../controllers/user')
router.prefix('/users')

router.post('/', controllers.get)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
