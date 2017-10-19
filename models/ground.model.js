var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GroundSchema = new Schema({
  name: {
    type: String,
    required: [true, '昵称不允许为空']
  },
  latitude: Number, // 纬度，浮点数，范围为-90~90，负数表示南纬
  longitude: Number, // 经度，浮点数，范围为-180~180，负数表示西经
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

  GroundSchema.post('save', function (error, doc, next) {
    if (error.errors) {
      var msg = ''
      for (var key in error.errors) {
        msg += error.errors[key].message + ','
      }
      msg = msg.replace(/,$/gi, "");
      next(new Error(msg));
    }
  });
  var Ground = mongoose.model('Ground', GroundSchema)
  
  module.exports = Ground