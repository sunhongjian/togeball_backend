
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * 定义一个模式(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合，
 * 它定义（只是定义，不是实现）这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 除了定义结构外，还定义文档的实例方法，静态模型方法，复合索引，中间件等
 * @type {mongoose}
 */
var UserSchema = new Schema({
  phoneNumber: {
    unique: true,
    type: String,
    // required: [false, '手机号不允许为空'],
    validate: {
      validator: function (v) {
        return /^1[0-9]{10}$/.test(v);
      },
      message: '手机号格式错误!'
    },
  },
  // 用户名
  userName: {
    type: String,
    unique: true,
    required: [false, '用户名不允许为空']
  },
  // 密码,经过sha1加密后的
  password: {
    type: String,
    unique: true,
    required: [false, '密码不允许为空']
  },
  nickname: {
    type: String,
  },
  age: {
    type: String,
  },
  // 登录凭证
  token: {
    type: String,
  },
  ground: { type: Schema.Types.ObjectId, ref: 'Ground' },
  createTime: {
    type: Date,
    dafault: Date.now()
  },
  updateTime: {
    type: Date,
    dafault: Date.now()
  }
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  })

// Defines a pre hook for the document.
// UserSchema.pre('save', function(next) {
//   if (this.isNew) {
//     this.meta.createAt = this.meta.updateAt = Date.now()
//   }
//   else {
//     this.meta.updateAt = Date.now()
//   }
//   next()
// })


/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.

// 如果手机号重复,则返回错误
UserSchema.post('save', function (error, doc, next) {
  if (error.errors) {
    var msg = ''
    for (var key in error.errors) {
      msg += error.errors[key].message + ','
    }
    msg = msg.replace(/,$/gi, "");
    next(new Error(msg));
  }
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('用户已经存在'));
  } else {
    next(error);
  }
});
var User = mongoose.model('User', UserSchema)

module.exports = User
