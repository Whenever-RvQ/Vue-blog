const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    default: "68bd3a6925b2727e604e6f11"
  },
  //关联用户
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    default: "68c7dc38ebf1663b04bd5a1b"
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  //文章 ids
  aids: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article"
  }],
  
})

module.exports = mongoose.model('Column', schema)