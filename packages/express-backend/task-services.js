import mongoose from "mongoose";
import taskModel from "./task.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function findTask(id) {
    taskModel.findById(id).catch((err) => {
        if(err) {
            return undefined;
        }
    });
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
    addTask,
    deleteTask,
};