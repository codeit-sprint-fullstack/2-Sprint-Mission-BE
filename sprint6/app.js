import express from "express";
// import mockTasks from './data/mock.js';
import mongoose from 'mongoose';
import { DATABASE_URL } from "./env.js";
import Task from "./models/Task.js";

mongoose.connect(DATABASE_URL).then(() => console.log("Connected to DB."))

const HttpStatus = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
	NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
});

const app = express();

app.use(express.json());

// useAsync hook
function asyncHandler(handler) {
	return (async function (req, res) {
		try {
			await handler(req, res);
		} catch (err) {
			console.log(err.name);
			console.log(err.message);
			if (err.name === "ValidationError") {
				res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
			}
			else if (err.name === "CastError") {
				res.status(HttpStatus.NOT_FOUND).send({ message: err.message });
			}
			else {
				res.status(HttpStatus.SERVER_ERROR).send({ message: err.message });
			}
		}
	});
}

app.post("/tasks", asyncHandler(async (req, res) => {
	const newTask = await Task.create(req.body);
	res.send(newTask);
}));

app.get("/tasks", asyncHandler(async (req, res) => {
	const sort = req.query.sort;
	const count = Number(req.query.count);
	const sortOption = { createdAt: sort === "oldest" ? "asc" : "desc" };

	const tasks = await Task.find().sort(sortOption).limit(count); // Full scan

	res.send(tasks);
}));

app.get("/tasks/:id", asyncHandler(async (req, res) => {
	const id = req.params.id;
	const task = await Task.findById(id);
	// console.log(id);
	if (task) {
		res.send(task);
	}
	else {
		res.status(HttpStatus.NOT_FOUND).send({message: "없습니다."});
	}
}));

// PUT 전체, PATCH 일부만
app.patch("/tasks/:id", asyncHandler((req, res) => {
	const id = Number(req.params.id);
	const task = mockTasks.find(task => task.id === id);
	if (task) {
		Object.keys(req.body).forEach(key => {
			task[key] = req.body[key];
		});
		res.send(task);
	}
	else {
		res.status(HttpStatus.NOT_FOUND).send({"message": "없습니다."});
	}
}));

app.delete("/tasks/:id", asyncHandler(async (req, res) => {
	const id = req.params.id;
	const task = await Task.findByIdAndDelete(id);
	if (task) {
		res.status(HttpStatus.NO_CONTENT).send(task);
	}
	else {
		res.status(HttpStatus.NOT_FOUND).send();
	}
}));

app.listen(3000, () => console.log("Server on"));
console.log("Hi!");
