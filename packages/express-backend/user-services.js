import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function findUserByUsernameAndEmail(username, email) {
    userModel.find({ username:username }, { email:email }).catch((err) => {
        if(err) {
            return undefined;
        }
    });
}

function findUserByUsername(username) {
    userModel.find({ username:username }).catch((err) => {
        if(err) {
            return undefined;
        }
    });
}

function findUserByEmail(email) {
    userModel.find({ email:email }).catch((err) => {
        if(err) {
            return undefined;
        }
    });
}

function findUserByName(name) {
    userModel.find({ name:name }).catch((err) => {
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
            return 500;
        }
    });
    return promise;
}

/* add error handling */ 
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
    findUserByUsernameAndEmail,
    findUserByUsername,
    findUserByEmail,
    findUserByName,
};