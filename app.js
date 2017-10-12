const Koa = require('koa')
const app = new Koa()
const db = require('./mongodb/db.js')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

const cors = require('koa2-cors') // 跨域插件
const log4js = require('koa-log4')
const logger = log4js.getLogger('app')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors())
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.info('%s %s - %s', ctx.method, ctx.url, ms)
})


// app.use(loggers())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app
