import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		max: 50,
	},
	userName: {
		type: String,
		unique: true,
		required: true,
		min: 3,
		max: 10,
	},
	password: {
		type: String,
		required: true,
		min: 6,
	},
	isAdmin: {
		type: Boolean,
		required: true,
	},
	articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
			autopopulate: { maxDepth: 1 },
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
			autopopulate: { maxDepth: 1 },
		},
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
			autopopulate: { maxDepth: 1 },
		},
	],
	upvotes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
			autopopulate: { maxDepth: 1 },
		},
	],
})

class User {
  async upvoteArticle(article){
    article.upvotes += 1
    this.upvotes.push(article)

    await article.save()
    await this.save()
  }

  async addComment(article, text){
    article.comments.push({ 'user':this, 'text':text })
    this.comments.push(article)
    
    await article.save()
    await this.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
export default mongoose.model('User', userSchema)
