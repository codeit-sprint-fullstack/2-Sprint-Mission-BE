import mongoose from "mongoose";

// MongoDB Collection tasks 의 구조.
const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxLength: 30,
	},
	description: {
		type: String,
	},
	isComplete: {
		type: Boolean,
		default: false,
	},
}, {
	timestamps: true, // createdAt, updatedAt 이 자동으로...
});

const Task = mongoose.model('Task', TaskSchema); // Task -> tasks 몽고 콜렉션

export default Task;
