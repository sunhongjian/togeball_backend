var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * 比赛结构
 */
var MatchSchema = new Schema({
  ground: {type: Schema.Types.ObjectId, ref: 'Ground'}, // 比赛场地
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

  MatchSchema.post('save', function (error, doc, next) {
    if (error.errors) {
      var msg = ''
      for (var key in error.errors) {
        msg += error.errors[key].message + ','
      }
      msg = msg.replace(/,$/gi, "");
      next(new Error(msg));
    }
  });
  var Match = mongoose.model('Match', MatchSchema)
  
  module.exports = Match