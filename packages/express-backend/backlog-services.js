import mongoose from "mongoose";
import backlogModel from "./backlog.js";

import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

mongoose
    .connect(
        process.env.MONGO_URL,
        // "mongodb://localhost:27017/users",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .catch((error) => console.log(error));

function findTask(id) {
    return backlogModel
        .findById(id)
        .exec()
        .then((task) => {
            if (!task) {
                return null;
            }
            return task;
        })
        .catch((error) => {
            throw error;
        });
}

function getTasks() {
    let promise = backlogModel.find();
    return promise;
}

async function addTask(username, task) {
    try {
        let currentdate = new Date();
        let datetime =
            currentdate.getMonth() +
            1 +
            "/" +
            currentdate.getDate() +
            "/" +
            currentdate.getFullYear() +
            " " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();

        const taskToAdd = new backlogModel({
            task: task.task,
            completionDate: datetime,
            completedBy: username,
        });

        await taskToAdd.save();
    } catch (error) {
        throw error;
    }
    /*
    let currentdate = new Date();
    let datetime =
        currentdate.getMonth() +
        1 +
        "/" +
        currentdate.getDate() +
        "/" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

    return;*/
}

async function deleteTask(id) {
    const promise = backlogModel
        .findByIdAndDelete(id)
        .exec()
        .catch((err) => {
            throw err;
        });
    return promise;
}

export default {
    findTask,
    getTasks,
    addTask,
    deleteTask,
};
