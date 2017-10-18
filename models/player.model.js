const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PlayerSchema = new Schema({
  position: {
    type: String
  },
  ability: {
    type: Number,
    min: 0,
    max: 100
  },
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player