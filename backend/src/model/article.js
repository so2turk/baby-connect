import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  upvotes: Number,
  comments: []
})

class Article { }

articleSchema.loadClass(Article)
export default mongoose.model('Article', articleSchema)
