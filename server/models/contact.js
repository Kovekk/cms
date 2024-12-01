const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  imageUrl: {type: String, required: true},
  group: [{type: String, ref: "Contact"}]
  // Check for type on sender. Might need to change if issues arise
})

module.exports = mongoose.model('Contact', contactSchema);