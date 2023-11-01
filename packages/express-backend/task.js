import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        dueDate: {
            type: String,
            required: true,
            trim: true,
        },
        weight: {
            type: Number,
            required: true,
            trim: true,
        },
    }, { collection: "task_list" }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;