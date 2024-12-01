const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  url: {type: String, required: true},
  children: [{type: {"id": String, "name": String, "url": String}}]
  // Check for type on sender. Might need to change if issues arise
})

module.exports = mongoose.model('Document', documentSchema);