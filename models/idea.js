const mongoose = require('mongoose')

const IdeaSchema  = new mongoose.Schema({
 text: {
    type: String,
    required: [true, 'Please add a text field']
 },
 username: String, 
 tag: {
    type: String
 },
 date: {
    type: String,
    default: new Date().toISOString().slice(0, 10)
 }
})

module.exports = mongoose.model('Idea', IdeaSchema)