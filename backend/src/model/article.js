import mongoose from 'mongoose'
import Comment from './comment'
import User from './user'

const articleSchema = new mongoose.Schema({
	author: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: User,
			autopopulate: { maxDepth: 1 },
		},
	],
	title: {
		type: String,
		required: true,
	},
	content: [
		{
			type: String,
			required: true,
		},
	],
	link: {
		type: String,
		unique: true,
		required: true,
	},
	images: [
		{
			type: String,
		},
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: User,
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: Comment,
		},
	],
})

class Article {}

articleSchema.loadClass(Article)
export default mongoose.model('Article', articleSchema)
