import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  name: String,
  upvotes: Number,
  comments: []
})

module.exports = mongoose.model('Article', articleSchema)