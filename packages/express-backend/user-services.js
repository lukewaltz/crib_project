import mongoose from "mongoose";
import userModel from "./user.js";

import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB in user-services"))
    .catch((error) => console.error("MongoDB Connection Error:", error));

async function addToGroup(username, group) {
    const promise = userModel
        .findOneAndUpdate({ username: username }, { $push: { group: group } })
        .catch((error) => {
            return 500;
        });

    return promise;
}

async function findUserByUsername(username) {
    return userModel.findOne({ username: username }).then((user) => {
        return user;
    });
}

async function findUserByEmail(email) {
    return userModel.findOne({ email: email }).then((user) => {
        return user;
    });
}

function getUsers(username, email, name) {
    let promise;
    if (username) {
        promise = findUserByUsername(username);
    } else if (email) {
        promise = findUserByEmail(email);
    } else {
        promise = userModel.find();
    }
    return promise;
}

async function randomUser() {
    let promise = await userModel.aggregate([{ $sample: { size: 1 } }]);
    return promise;
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save().catch((e) => {
        if (e) {
            return 500;
        }
    });
    return promise;
}

function addTask(username, newTask) {
    const promise = userModel
        .findOneAndUpdate(
            { username: username },
            { $push: { tasks: newTask } },
            { new: true }
        )
        .catch((error) => {
            return error;
        });

    return promise;
}

function removeTask(username, taskId) {
    const promise = userModel
        .findOneAndUpdate(
            { username: username },
            { $pull: { tasks: taskId } },
            { new: true }
        )
        .catch((error) => {
            return Promise.reject(error);
        });

    return promise;
}

async function deleteUser(id) {
    const promise = userModel
        .findByIdAndDelete(id)
        .exec()
        .catch((err) => {
            if (err) {
                return undefined;
            }
        });
    return promise;
}

export default {
    addUser,
    addTask,
    addToGroup,
    removeTask,
    randomUser,
    getUsers,
    deleteUser,
    findUserByUsername,
    findUserByEmail,
};
