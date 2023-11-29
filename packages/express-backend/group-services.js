import mongoose from "mongoose";
import groupModel from "./group.js";

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
        .then(() => console.log("Connected to MongoDB in user-services"))
        .catch((error) => console.error("MongoDB Connection Error:", error));

async function findGroupByName(name) {
    return await groupModel.findOne({ name: username }).catch((err) => {
        if(err) {
            return undefined;
        }
    });
}

function addGroup(group) {
    const groupToAdd = new groupModel(group);
    const promise = groupToAdd.save().catch((e) =>{
        if(e){
            console.log(e);
            return 500;
        }
    });
    return promise;
}

// function addTask(username, newTask) {
//     const promise = userModel.findOneAndUpdate(
//         { username: username }, 
//         { $push: { tasks: newTask } }, 
//         { new: true }
//     ).catch((error) => {
//         console.error("Error adding task:", error);
//         return Promise.reject(error);
//     });

//     return promise;

function addUserToGroup(code, user){
    const promise = groupModel.findOneAndUpdate(
        { code:  code}, 
        { $push: { members: user } }, 
        { new: true }
    ).catch((error) => {
        console.error("Error adding user:", error);
        return 500;
    });

    return promise;
}

export default {
    findGroupByName,
    addGroup,
    addUserToGroup,
};