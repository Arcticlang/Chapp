import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	created_at: {
		type: Number,
		default: () => Date.now(),
	},
});
export const UserModel = mongoose.model("User", userSchema);

export const directorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	created_at: {
		type: Number,
		default: () => Date.now(),
	},
});
export const DirectoryModel = mongoose.model("Directory", directorySchema);

export const chatSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: Number,
		required: true,
	},
	created_at: {
		type: Number,
		default: () => Date.now(),
	},
});
export const ChatModel = mongoose.model("Chat", directorySchema);

export const messageSchema = new mongoose.Schema({
	author_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	chat_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	content: String,
	created_at: {
		type: Number,
		default: () => Date.now(),
	},
	modified_at: Number,
});
export const MessageModel = mongoose.model("Message", messageSchema);
