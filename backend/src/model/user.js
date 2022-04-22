import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: [true, 'Please add an email'],
			max: 50,
		},
		userName: {
			type: String,
			unique: true,
			required: [true, 'Please add a user name'],
			min: 3,
			max: 10,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
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
				// autopopulate: { maxDepth: 1 },
			},
		],
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Article',
			},
		],
		upvotes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

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
export default mongoose.model('User', userSchema)
