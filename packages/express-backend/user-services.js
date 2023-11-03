import mongoose from "mongoose";
import userModel from "./user.js";

import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

mongoose
    .connect(
        /*  
            "mongodb+srv://" +
            process.env.MONGO_USER +
            ":" +
            process.env.MONGO_PWD +
            "@" +
            process.env.MONGO_CLUSTER +
            "/" +
            process.env.MONGO_DB +
            "?retryWrites=true&w=majority",
        */
        process.env.MONGO_URL,
        // "mongodb://localhost:27017/users",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .catch((error) => console.log(error));

async function findUserByUsername(username) {
    return await userModel.findOne({ username: username }).catch((err) => {
        if(err) {
            return undefined;
        }
    });
}


function getUsers(username, email, name) {
    let promise;
    if (username) {
        promise = findUserByUsername(username)
    } else if (email) {
        promise = findUserByEmail(email);
    } else if (name) {
        promise = findUserByName(name)
    } else {
        promise = userModel.find();
    }
    return promise;
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save().catch((e) =>{
        if(e){
            console.log(e);
            return 500;
        }
    });
    return promise;
}

function addTasks(username, newTask) {
    const promise = userModel.findOneAndUpdate(
        { username:username }, 
        { $push: { tasks: newTask } }, 
        { new: true },).catch((e) => {
            if(e) {
                return 500;
            }
        }
    );
    return promise;
}

async function deleteUser(id) {
    const promise = userModel.findByIdAndRemove(id).catch((err) => {
        if(err) {
            return undefined;
        }
    });
    return promise;
}

export default {
    addUser,
    addTasks,
    getUsers,
    deleteUser,
    findUserByUsername,
};