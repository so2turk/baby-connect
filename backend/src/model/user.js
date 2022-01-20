import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  comments: [],
  upvotes: []
})

class User {
  async upvoteArticle(article){
    article.upvotes += 1
    this.upvotes.push(article.name)

    await article.save()
    await this.save()
  }

  async addComment(article, text){
    article.comments.push({ user:this, text })
    this.comments.push(article.name)
    
    await article.save()
    await this.save()
  }
}

userSchema.loadClass(User)

module.exports = mongoose.model('User', userSchema)
