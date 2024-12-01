const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  id: {type: String, required: true},
  subject: {type: String},
  msgText: {type: String, required: true},
  sender: {type: String, ref: "Contact"}
  // Check for type on sender. Might need to change if issues arise
})

module.exports = mongoose.model('Message', messageSchema);