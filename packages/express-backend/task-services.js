import mongoose from "mongoose";
import taskModel from "./task.js";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

mongoose
    .connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB in task-services"))
        .catch((error) => console.error("MongoDB Connection Error:", error));

function findTask(id) {
    return taskModel.findById(id)
        .then((task) => {
            if (!task) {
                // Task not found
                return null;
            }
            return task; // Return the found task
        })
        .catch((error) => {
            console.error("Error finding task:", error);
            throw error; // Rethrow the error for proper handling
        });
}

async function getGroup(id) {
    return taskModel.findById(id)
        .then((task) => {
            if(!task) {
                return null;
            }
            return task.groupId;
        })
        .catch((error) => {
            console.error("error finding poll group: ", error);
            throw error;
        });
}

function getTasksInGroup(groupId){
    let promise = taskModel.find({groupId: groupId});
    return promise;
}

function getTasks() {
    let promise = taskModel.find();
    return promise;
}

function addTask(task) {
    const taskToAdd = new taskModel(task);
    const promise = taskToAdd.save().catch((e) =>{
        if(e){
            return 500;
        }
    });
    return promise;
}

async function deleteTask(id) {
    const promise = taskModel.findByIdAndRemove(id).catch((err) => {
        if(err) {
            return undefined;
        }
    });
    return promise;
}

export default {
    findTask,
    getTasks,
    getTasksInGroup,
    getGroup,
    addTask,
    deleteTask,
};