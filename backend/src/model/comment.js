import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		autopopulate: { maxDepth: 1 },
	},
	article: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article',
		autopopulate: { maxDepth: 1 },
	},
	comment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		autopopulate: { maxDepth: 1 },
	},
	comments: [
		{
			type: String,
		},
	],
	upvotes: Number,
})

class Comment {}

commentSchema.loadClass(Comment)
export default mongoose.model('Comment', commentSchema)
